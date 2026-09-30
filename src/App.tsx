import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { KPSS_EXAM_QUESTIONS } from './data/kpssQuestions';
import { Question, ExamResult, ActiveExamSnapshot } from './types/exam';
import { calculateExamResult, getExamHistory, saveExamResult } from './utils/kpssScoring';
import { generateFreshExam } from './utils/questionGenerator';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ExamView } from './components/ExamView';
import { ResultView } from './components/ResultView';
import { OpticalSheetModal } from './components/OpticalSheetModal';
import { ScratchpadModal } from './components/ScratchpadModal';
import { FinishModal } from './components/FinishModal';
import { GroundedNewsModal } from './components/GroundedNewsModal';
import { KPSSFlashcardsModal } from './components/KPSSFlashcardsModal';
import { SubjectPracticeView } from './components/SubjectPracticeView';
import { DailyStreakModal } from './components/DailyStreakModal';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider, useAchievementToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { saveExamToFirestore, fetchUserExamsFromFirestore } from './firebase';
import { recordDailyActivity, StreakData } from './utils/streakManager';

const TOTAL_EXAM_SECONDS = 130 * 60; // 7800 seconds (130 minutes)

export function AppContent() {
  const { triggerToast } = useAchievementToast();
  const { currentUser } = useAuth();

  const [streakData, setStreakData] = useState<StreakData>(() => recordDailyActivity());
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);

  const [currentView, setCurrentView] = useState<'home' | 'exam' | 'results' | 'subject_bank'>('home');
  const [currentExamTitle, setCurrentExamTitle] = useState<string>('2026 KPSS Türkiye Geneli Deneme #1');
  const [questions, setQuestions] = useState<Question[]>(() => {
    const pkg = generateFreshExam();
    return pkg.questions;
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(TOTAL_EXAM_SECONDS);
  const [examHistory, setExamHistory] = useState<ExamResult[]>([]);
  const [currentResult, setCurrentResult] = useState<ExamResult | null>(null);

  // Auto-saved ongoing exam snapshot from localStorage
  const [activeSnapshot, setActiveSnapshot] = useState<ActiveExamSnapshot | null>(() => {
    try {
      const raw = localStorage.getItem('kpss_active_exam_snapshot');
      if (!raw) return null;
      const parsed = JSON.parse(raw) as ActiveExamSnapshot;
      if (parsed && parsed.timeRemainingSeconds > 30) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  // Global modals controlled from Navbar
  const [isOpticalModalOpen, setIsOpticalModalOpen] = useState(false);
  const [isScratchpadModalOpen, setIsScratchpadModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isGroundedNewsOpen, setIsGroundedNewsOpen] = useState(false);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Load past exams on mount and sync with Firestore if logged in
  useEffect(() => {
    const localHistory = getExamHistory();
    setExamHistory(localHistory);

    if (currentUser) {
      fetchUserExamsFromFirestore(currentUser.uid).then((cloudExams) => {
        if (cloudExams && cloudExams.length > 0) {
          // Merge unique exams by id
          const ids = new Set(localHistory.map((e) => e.id));
          const merged = [...localHistory];
          cloudExams.forEach((ce) => {
            if (!ids.has(ce.id)) {
              merged.push(ce);
              ids.add(ce.id);
            }
          });
          setExamHistory(merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        }
      });
    }
  }, [currentUser]);

  // Timer runner
  useEffect(() => {
    if (currentView === 'exam') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Auto finish on time out
            clearInterval(timerRef.current!);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentView]);

  // Renew and regenerate questions
  const handleRenewQuestions = () => {
    const pkg = generateFreshExam();
    setQuestions(pkg.questions);
    setCurrentExamTitle(pkg.examTitle);
    setAnswers({});
    setMarked({});
    setCurrentIndex(0);

    triggerToast({
      badgeTag: 'SORULAR YENİLENDİ',
      title: pkg.examTitle,
      subtitle: '120 özgün soru, şıklar ve sayısal parametreler başarıyla yeniden derlendi.',
      icon: '✨',
      durationMs: 4000,
    });
  };

  // Resume unfinished exam from snapshot
  const handleResumeExam = () => {
    if (!activeSnapshot) return;
    setCurrentIndex(activeSnapshot.currentIndex || 0);
    setAnswers(activeSnapshot.answers || {});
    setMarked(activeSnapshot.marked || {});
    setTimeRemaining(activeSnapshot.timeRemainingSeconds || TOTAL_EXAM_SECONDS);
    startTimeRef.current = Date.now();
    setCurrentView('exam');
    window.scrollTo(0, 0);
  };

  const handleDismissSnapshot = () => {
    try {
      localStorage.removeItem('kpss_active_exam_snapshot');
    } catch {}
    setActiveSnapshot(null);
  };

  // Start new full exam with freshly generated questions
  const handleStartExam = () => {
    try {
      localStorage.removeItem('kpss_active_exam_snapshot');
    } catch {}
    setActiveSnapshot(null);

    // Generate fresh questions package so every exam is unique
    const pkg = generateFreshExam();
    setQuestions(pkg.questions);
    setCurrentExamTitle(pkg.examTitle);

    setCurrentIndex(0);
    setAnswers({});
    setMarked({});
    setTimeRemaining(TOTAL_EXAM_SECONDS);
    startTimeRef.current = Date.now();
    setCurrentView('exam');
    window.scrollTo(0, 0);
  };

  // Retake only mistakes
  const handleRetakeMistakes = (wrongQuestionIds: number[]) => {
    const wrongQuestions = questions.filter((q) => wrongQuestionIds.includes(q.id));
    if (wrongQuestions.length === 0) return;

    try {
      localStorage.removeItem('kpss_active_exam_snapshot');
    } catch {}
    setActiveSnapshot(null);

    setQuestions(wrongQuestions);
    setCurrentIndex(0);
    setAnswers({});
    setMarked({});
    // Give proportional time: 1.1 minutes per question
    setTimeRemaining(Math.round(wrongQuestions.length * 65));
    startTimeRef.current = Date.now();
    setCurrentView('exam');
    window.scrollTo(0, 0);
  };

  // Answer selection
  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Clear answer
  const handleClearOption = (questionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: null,
    }));
  };

  // Toggle flag / mark
  const handleToggleMark = (questionId: number) => {
    setMarked((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Finish exam
  const handleFinishExam = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    try {
      localStorage.removeItem('kpss_active_exam_snapshot');
    } catch {}
    setActiveSnapshot(null);

    const elapsedSeconds = TOTAL_EXAM_SECONDS - timeRemaining;
    const result = calculateExamResult(questions, answers, Math.max(1, elapsedSeconds));

    // Save full exams to local history and Firestore
    if (questions.length >= 100) {
      saveExamResult(result);
      setExamHistory((prev) => [result, ...prev].slice(0, 25));

      // Persist to Firebase Firestore if user is authenticated
      if (currentUser) {
        saveExamToFirestore(currentUser.uid, result);
      }
    }

    setCurrentResult(result);
    setCurrentView('results');
    window.scrollTo(0, 0);

    // Trigger Apple-Style Dynamic Achievement Toast
    const totalExamsCount = examHistory.length + 1;
    const hour = new Date().getHours();
    const isNight = hour >= 23 || hour < 5;

    if (totalExamsCount === 10) {
      triggerToast({
        badgeTag: 'EFSANEVİ BAŞARIM KAZANILDI',
        title: '10 Deneme Efsanesi Rozeti!',
        subtitle: '10 tam KPSS denemesini başarıyla tamamladınız.',
        icon: '🔟',
        xp: 150,
        durationMs: 6500,
      });
    } else if (isNight) {
      triggerToast({
        badgeTag: 'ÖZEL ROZET KAZANILDI',
        title: 'Gece Kuşu Rozeti!',
        subtitle: 'Gece yarısı seansını tamamlayarak azminizi gösterdiniz.',
        icon: '🦉',
        xp: 75,
        durationMs: 6000,
      });
    } else if (result.estimatedP3Score >= 85) {
      triggerToast({
        badgeTag: 'KPSS DERECE EŞİĞİ AŞILDI',
        title: `Tebrikler! ${result.estimatedP3Score} P3 Puanı`,
        subtitle: '85.00+ puan barajını aşarak en üst derece grubuna ulaştınız!',
        icon: '🏆',
        xp: 100,
        durationMs: 6000,
      });
    } else {
      triggerToast({
        badgeTag: 'DENEME TAMAMLANDI',
        title: `${result.totalNet} Toplam Net Hesaplandı`,
        subtitle: `Tahmini P3: ${result.estimatedP3Score} · ${result.totalCorrect} Doğru, ${result.totalWrong} Yanlış`,
        icon: '🎖️',
        xp: 50,
        durationMs: 5000,
      });
    }
  };

  // View past exam from history
  const handleViewPastResult = (result: ExamResult) => {
    setCurrentResult(result);
    setCurrentView('results');
    window.scrollTo(0, 0);
  };

  const answeredCount = Object.values(answers).filter((v) => v !== null && v !== undefined).length;
  const markedCount = Object.values(marked).filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-200">
      {/* Top Bar Contract (3 zones) */}
      <Navbar
        currentView={currentView}
        onNavigateHome={() => setCurrentView('home')}
        timeRemaining={timeRemaining}
        totalAnswered={answeredCount}
        totalMarked={markedCount}
        totalQuestions={questions.length}
        examTitle={currentExamTitle}
        onOpenOpticalSheet={() => setIsOpticalModalOpen(true)}
        onOpenScratchpad={() => setIsScratchpadModalOpen(true)}
        onFinishExamPrompt={() => setIsFinishModalOpen(true)}
        onNewExam={handleStartExam}
        onRenewQuestions={handleRenewQuestions}
        onOpenGroundedNews={() => setIsGroundedNewsOpen(true)}
        onOpenFlashcards={() => setIsFlashcardsOpen(true)}
        onNavigateSubjectBank={() => setCurrentView('subject_bank')}
        onOpenStreakModal={() => setIsStreakModalOpen(true)}
        streakCount={streakData.currentStreak}
      />

      {/* Auto-save Restore Banner on Home Screen */}
      {currentView === 'home' && activeSnapshot && (
        <div className="bg-blue-50 dark:bg-blue-950/60 border-b border-blue-200/80 dark:border-blue-800/60 py-3 px-4 transition-colors">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-[#0071E3] dark:text-[#2997FF]">
              <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/60 font-bold">✓</div>
              <span className="font-semibold">
                Kaldığınız bir deneme sınavı bulundu: <strong>{Object.values(activeSnapshot.answers).filter((v) => v !== null).length}</strong>/120 soru cevaplandı, <strong>{Math.floor(activeSnapshot.timeRemainingSeconds / 60)}</strong> dk süre kaldı.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResumeExam}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0071E3] hover:bg-[#0077ED] text-white font-bold rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                <span>Kaldığım Yerden Devam Et</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleDismissSnapshot}
                className="p-1.5 text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white cursor-pointer"
                title="Yoksay ve Sil"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Views Container */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onStartExam={handleStartExam}
            examHistory={examHistory}
            onViewPastResult={handleViewPastResult}
            examTitle={currentExamTitle}
            onRenewQuestions={handleRenewQuestions}
            onOpenSubjectBank={() => setCurrentView('subject_bank')}
          />
        )}

        {currentView === 'subject_bank' && (
          <SubjectPracticeView onBackToHome={() => setCurrentView('home')} />
        )}

        {currentView === 'exam' && (
          <ExamView
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            marked={marked}
            timeRemainingSeconds={timeRemaining}
            onSelectOption={handleSelectOption}
            onClearOption={handleClearOption}
            onToggleMark={handleToggleMark}
            onJumpToQuestion={(idx) => setCurrentIndex(idx)}
            onFinishExam={handleFinishExam}
          />
        )}

        {currentView === 'results' && currentResult && (
          <ResultView
            result={currentResult}
            questions={questions}
            history={examHistory}
            onRestartExam={handleStartExam}
            onRetakeMistakes={handleRetakeMistakes}
          />
        )}
      </main>

      {/* Optical Sheet Modal Triggered From Navbar */}
      <OpticalSheetModal
        isOpen={isOpticalModalOpen}
        onClose={() => setIsOpticalModalOpen(false)}
        questions={questions}
        answers={answers}
        onSelectOption={handleSelectOption}
        onJumpToQuestion={(idx) => setCurrentIndex(idx)}
      />

      {/* Scratchpad Modal Triggered From Navbar */}
      <ScratchpadModal
        isOpen={isScratchpadModalOpen}
        onClose={() => setIsScratchpadModalOpen(false)}
        questionNumber={currentIndex + 1}
      />

      {/* Finish Confirmation Modal Triggered From Navbar */}
      <FinishModal
        isOpen={isFinishModalOpen}
        onClose={() => setIsFinishModalOpen(false)}
        onConfirmFinish={() => {
          setIsFinishModalOpen(false);
          handleFinishExam();
        }}
        answeredCount={answeredCount}
        emptyCount={questions.length - answeredCount}
        markedCount={markedCount}
        timeRemainingSeconds={timeRemaining}
      />

      {/* Google Search Grounded Current Affairs Modal */}
      <GroundedNewsModal
        isOpen={isGroundedNewsOpen}
        onClose={() => setIsGroundedNewsOpen(false)}
      />

      {/* Apple Wallet Style Flashcards Modal */}
      <KPSSFlashcardsModal
        isOpen={isFlashcardsOpen}
        onClose={() => setIsFlashcardsOpen(false)}
      />

      {/* Daily Study Streak Habit Modal */}
      <DailyStreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        streakData={streakData}
      />

      {/* Minimal Anti-Slop Footer */}
      <footer className="py-6 border-t border-[#E5E5EA] dark:border-white/10 bg-[#FBFBFD] dark:bg-[#000000] text-center text-xs text-[#86868B] dark:text-[#A1A1A6] no-print transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 KPSSLAB. ÖSYM formatında Genel Yetenek & Genel Kültür Deneme Simülatörü.</span>
          <div className="flex items-center gap-4 text-[#86868B] dark:text-[#A1A1A6]">
            <span>120 Soru</span>
            <span>·</span>
            <span>130 Dakika</span>
            <span>·</span>
            <span>4 Yanlış 1 Doğru</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
