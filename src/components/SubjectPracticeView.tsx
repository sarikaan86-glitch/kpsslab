import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Flame,
  HelpCircle,
  LayoutGrid,
  Filter,
  Check,
  ChevronRight,
  ChevronLeft,
  Award,
  Zap,
} from 'lucide-react';
import { Question, SubjectId } from '../types/exam';
import {
  SUBJECT_BANKS_CONFIG,
  SubjectBankMeta,
  generateSubject100Questions,
} from '../utils/subjectBankGenerator';
import { QuestionCard } from './QuestionCard';
import { ScratchpadModal } from './ScratchpadModal';
import { soundFx } from '../utils/soundEffects';

interface SubjectPracticeViewProps {
  onBackToHome: () => void;
}

interface SavedBankProgress {
  currentIndex: number;
  answers: Record<number, number | null>;
  marked: Record<number, boolean>;
  lastUpdated: number;
}

export const SubjectPracticeView: React.FC<SubjectPracticeViewProps> = ({ onBackToHome }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [filterMode, setFilterMode] = useState<'ALL' | 'WRONG' | 'CORRECT' | 'EMPTY'>('ALL');
  const [autoAdvance, setAutoAdvance] = useState(false);

  // Load progress stats for all subjects to show in lobby cards
  const [lobbyStats, setLobbyStats] = useState<Record<SubjectId, { solved: number; correct: number }>>({
    TURKCE: { solved: 0, correct: 0 },
    MATEMATIK: { solved: 0, correct: 0 },
    TARIH: { solved: 0, correct: 0 },
    COGRAFYA: { solved: 0, correct: 0 },
    VATANDASLIK: { solved: 0, correct: 0 },
    GUNCEL: { solved: 0, correct: 0 },
  });

  const refreshLobbyStats = () => {
    const stats: any = {};
    SUBJECT_BANKS_CONFIG.forEach((sub) => {
      try {
        const raw = localStorage.getItem(`kpss_bank_progress_${sub.id}`);
        if (raw) {
          const parsed: SavedBankProgress = JSON.parse(raw);
          const solvedCount = Object.values(parsed.answers || {}).filter((v) => v !== null && v !== undefined).length;
          stats[sub.id] = { solved: solvedCount, correct: 0 };
        } else {
          stats[sub.id] = { solved: 0, correct: 0 };
        }
      } catch {
        stats[sub.id] = { solved: 0, correct: 0 };
      }
    });
    setLobbyStats(stats);
  };

  useEffect(() => {
    refreshLobbyStats();
  }, []);

  // When a subject is selected, load questions & restore progress
  const handleSelectSubject = (subjectId: SubjectId) => {
    setSelectedSubject(subjectId);
    const generated = generateSubject100Questions(subjectId);
    setQuestions(generated);

    // Restore saved progress
    try {
      const raw = localStorage.getItem(`kpss_bank_progress_${subjectId}`);
      if (raw) {
        const parsed: SavedBankProgress = JSON.parse(raw);
        setAnswers(parsed.answers || {});
        setMarked(parsed.marked || {});
        setCurrentIndex(parsed.currentIndex || 0);
      } else {
        setAnswers({});
        setMarked({});
        setCurrentIndex(0);
      }
    } catch {
      setAnswers({});
      setMarked({});
      setCurrentIndex(0);
    }
  };

  // Save progress on changes
  useEffect(() => {
    if (!selectedSubject || questions.length === 0) return;

    try {
      const payload: SavedBankProgress = {
        currentIndex,
        answers,
        marked,
        lastUpdated: Date.now(),
      };
      localStorage.setItem(`kpss_bank_progress_${selectedSubject}`, JSON.stringify(payload));
    } catch {}
  }, [selectedSubject, currentIndex, answers, marked, questions.length]);

  // Handle answering question
  const handleSelectOption = (optIdx: number) => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));

    // Auto-advance to next question if enabled
    if (autoAdvance && currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex((p) => p + 1);
      }, 900);
    }
  };

  const handleClearOption = () => {
    if (!currentQuestion) return;
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const handleToggleMark = () => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    setMarked((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Reset subject bank progress
  const handleResetSubjectProgress = () => {
    if (!selectedSubject) return;
    if (window.confirm('Bu branş için çözdüğünüz tüm soruları sıfırlayıp baştan başlamak istediğinize emin misiniz?')) {
      localStorage.removeItem(`kpss_bank_progress_${selectedSubject}`);
      setAnswers({});
      setMarked({});
      setCurrentIndex(0);
      soundFx.playSelectClick();
    }
  };

  // Active question
  const currentQuestion = questions.length > 0 ? (questions[currentIndex] || questions[0]) : null;

  // Calculated metrics
  const answeredList = useMemo(() => {
    return Object.entries(answers).filter(([_, opt]) => opt !== null && opt !== undefined);
  }, [answers]);

  const solvedCount = answeredList.length;

  const correctCount = useMemo(() => {
    if (!questions || questions.length === 0) return 0;
    return questions.filter((q) => q && answers[q.id] === q.correctAnswer).length;
  }, [questions, answers]);

  const wrongCount = useMemo(() => {
    if (!questions || questions.length === 0) return 0;
    return questions.filter(
      (q) => q && answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== q.correctAnswer
    ).length;
  }, [questions, answers]);

  const netScore = Math.max(0, correctCount - wrongCount * 0.25);

  // Consecutive correct streak
  const streak = useMemo(() => {
    if (!questions || questions.length === 0) return 0;
    let s = 0;
    for (let i = Math.min(currentIndex, questions.length - 1); i >= 0; i--) {
      const q = questions[i];
      if (q && answers[q.id] === q.correctAnswer) {
        s++;
      } else if (q && answers[q.id] !== undefined && answers[q.id] !== null) {
        break;
      }
    }
    return s;
  }, [currentIndex, questions, answers]);

  // Filtered question set for drawer
  const filteredIndices = useMemo(() => {
    if (!questions || questions.length === 0) return [];
    return questions
      .map((q, idx) => ({ q, idx }))
      .filter(({ q }) => {
        if (!q) return false;
        const isAns = answers[q.id] !== undefined && answers[q.id] !== null;
        if (filterMode === 'CORRECT') return isAns && answers[q.id] === q.correctAnswer;
        if (filterMode === 'WRONG') return isAns && answers[q.id] !== q.correctAnswer;
        if (filterMode === 'EMPTY') return !isAns;
        return true;
      });
  }, [questions, answers, filterMode]);

  const activeMeta = SUBJECT_BANKS_CONFIG.find((c) => c.id === selectedSubject);

  // ============================================================
  // RENDER 1: LOBBY VIEW (Select Subject to Solve 100 Questions)
  // ============================================================
  if (!selectedSubject) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Lobby Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white mb-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ana Sayfaya Dön</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#0071E3]/10 text-[#0071E3] dark:text-[#2997FF]">
                Branş Bazlı 100'lük Havuz
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200">
                Tek Tek Çözme Modu
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight mt-1">
              Ders Bazlı 100 Soruluk Soru Bankası
            </h2>
            <p className="text-sm text-[#86868B] dark:text-[#A1A1A6] mt-1 max-w-2xl">
              Her ders için özel hazırlanmış 100'er soruluk soru havuzundan dilediğiniz dersi seçin. Anında doğru/yanlış kontrolü ve detaylı çözümlerle adım adım kendinizi geliştirin.
            </p>
          </div>
        </div>

        {/* 6 Subject Bank Cards (Apple Aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUBJECT_BANKS_CONFIG.map((sub) => {
            const stats = lobbyStats[sub.id] || { solved: 0, correct: 0 };
            const percent = Math.round((stats.solved / sub.totalQuestions) * 100);

            return (
              <motion.div
                key={sub.id}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelectSubject(sub.id)}
                className="bg-white dark:bg-[#161618] rounded-3xl p-6 border border-[#E5E5EA] dark:border-white/10 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Decorative Linear Accent Glow */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r ${sub.gradient}`}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] dark:bg-[#222226] flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
                      {sub.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-[#F5F5F7] dark:bg-[#222226] text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {sub.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors">
                    {sub.title}
                  </h3>

                  <p className="text-xs text-[#86868B] dark:text-[#A1A1A6] mt-2 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>

                  {/* Target Topics Tags */}
                  <div className="flex flex-wrap gap-1 mt-4">
                    {sub.targetTopics.slice(0, 3).map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-[#F5F5F7] dark:bg-[#1E1E22] text-[#86868B] dark:text-[#A1A1A6]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Footer */}
                <div className="mt-6 pt-4 border-t border-[#F0F0F2] dark:border-white/10">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#86868B] font-semibold">İlerleme:</span>
                    <span className="font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-numbers">
                      {stats.solved} / 100 Soru (%{percent})
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#F0F0F2] dark:bg-white/10 overflow-hidden">
                    <motion.div
                      className={`h-full bg-linear-to-r ${sub.gradient}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs font-bold text-[#0071E3] dark:text-[#2997FF] group-hover:translate-x-1 transition-transform">
                    <span>{stats.solved > 0 ? 'Kaldığın Yerden Devam Et' : 'Çözmeye Başla'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER 2: ACTIVE 1-BY-1 SOLVER VIEW
  // ============================================================
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 select-none">
      {/* Top Navigation & Score Dashboard */}
      <div className="bg-white dark:bg-[#161618] rounded-3xl p-5 sm:p-6 border border-[#E5E5EA] dark:border-white/10 shadow-xs mb-6 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F0F0F2] dark:border-white/10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                refreshLobbyStats();
                setSelectedSubject(null);
              }}
              className="p-2 rounded-xl text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#222226] transition-colors cursor-pointer"
              title="Ders Listesine Geri Dön"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{activeMeta?.icon}</span>
                <h3 className="text-base sm:text-lg font-black text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {activeMeta?.title}
                </h3>
              </div>
              <span className="text-xs text-[#86868B] dark:text-[#A1A1A6]">
                Tek Tek Çözme & Anında ÖSYM Çözüm Modu
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            {/* Streak */}
            {streak >= 2 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800 text-xs font-black">
                <Flame className="w-4 h-4 fill-current animate-bounce" />
                <span>{streak} Seri!</span>
              </div>
            )}

            {/* Score Counts */}
            <div className="flex items-center gap-2 bg-[#F5F5F7] dark:bg-[#1E1E22] px-3 py-1.5 rounded-2xl border border-[#E5E5EA] dark:border-white/10 text-xs font-bold tabular-numbers">
              <span className="text-emerald-600 dark:text-emerald-400">✓ {correctCount}</span>
              <span className="text-neutral-300 dark:text-neutral-700">|</span>
              <span className="text-rose-600 dark:text-rose-400">✗ {wrongCount}</span>
              <span className="text-neutral-300 dark:text-neutral-700">|</span>
              <span className="text-[#0071E3] dark:text-[#2997FF]">{netScore.toFixed(2)} Net</span>
            </div>

            {/* 100 Question Grid Drawer Toggle */}
            <button
              type="button"
              onClick={() => setIsGridOpen(!isGridOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5F5F7] dark:bg-[#1E1E22] hover:bg-[#E5E5EA] text-[#1D1D1F] dark:text-[#F5F5F7] text-xs font-bold transition-colors cursor-pointer border border-[#E5E5EA] dark:border-white/10"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>Soru Listesi ({solvedCount}/100)</span>
            </button>

            {/* Reset Progress Button */}
            <button
              type="button"
              onClick={handleResetSubjectProgress}
              className="p-1.5 rounded-xl text-[#86868B] hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              title="Bu dersin ilerlemesini sıfırla"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar across 100 questions */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
              Soru {currentIndex + 1} / 100
            </span>
            <span className="font-semibold text-[#86868B] dark:text-[#A1A1A6] tabular-numbers">
              Çözülen: {solvedCount} (%{solvedCount})
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#F0F0F2] dark:bg-white/10 overflow-hidden">
            <div
              className={`h-full bg-linear-to-r ${activeMeta?.gradient || 'from-blue-600 to-indigo-600'}`}
              style={{ width: `${solvedCount}%` }}
            />
          </div>
        </div>
      </div>

      {/* 100-Question Quick Jump Drawer (Collapsible) */}
      <AnimatePresence>
        {isGridOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-[#161618] rounded-3xl p-5 sm:p-6 border border-[#E5E5EA] dark:border-white/10 shadow-sm mb-6 overflow-hidden"
          >
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0F0F2] dark:border-white/10">
              <span className="text-xs font-bold text-[#86868B] uppercase">Soru Haritası:</span>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'ALL', label: `Tümü (100)` },
                  { id: 'CORRECT', label: `Doğru (${correctCount})` },
                  { id: 'WRONG', label: `Yanlış (${wrongCount})` },
                  { id: 'EMPTY', label: `Boş (${100 - solvedCount})` },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilterMode(f.id as any)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      filterMode === f.id
                        ? 'bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F]'
                        : 'bg-[#F5F5F7] dark:bg-[#222226] text-[#86868B] hover:text-[#1D1D1F]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Matrix of 100 Questions */}
            <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-20 gap-1.5 max-h-56 overflow-y-auto pr-1">
              {filteredIndices.map(({ q, idx }) => {
                const isAns = answers[q.id] !== undefined && answers[q.id] !== null;
                const isCorr = isAns && answers[q.id] === q.correctAnswer;
                const isCurr = idx === currentIndex;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsGridOpen(false);
                    }}
                    className={`h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer tabular-numbers ${
                      isCurr ? 'ring-2 ring-[#0071E3] scale-105 z-10' : ''
                    } ${
                      isAns
                        ? isCorr
                          ? 'bg-emerald-500 text-white shadow-2xs'
                          : 'bg-rose-500 text-white shadow-2xs'
                        : 'bg-[#F5F5F7] dark:bg-[#222226] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E5EA] dark:border-white/5 hover:bg-[#E5E5EA]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Single Question Solver Surface */}
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          selectedOption={answers[currentQuestion.id] ?? null}
          isMarked={!!marked[currentQuestion.id]}
          direction={1}
          instantFeedbackEnabled={true}
          onSelectOption={handleSelectOption}
          onClearOption={handleClearOption}
          onToggleMark={handleToggleMark}
          onPrev={() => currentIndex > 0 && setCurrentIndex((p) => p - 1)}
          onNext={() => currentIndex < questions.length - 1 && setCurrentIndex((p) => p + 1)}
          onOpenScratchpad={() => setIsScratchpadOpen(true)}
        />
      )}

      {/* Scratchpad Modal */}
      <ScratchpadModal
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
        questionNumber={currentIndex + 1}
      />
    </div>
  );
};
