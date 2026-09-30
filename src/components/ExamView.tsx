import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, ChevronLeft, ChevronRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { Question } from '../types/exam';
import { QuestionCard } from './QuestionCard';
import { NavigationGrid } from './NavigationGrid';
import { OpticalSheetModal } from './OpticalSheetModal';
import { ScratchpadModal } from './ScratchpadModal';
import { FinishModal } from './FinishModal';
import { TimeAlertBanner } from './TimeAlertBanner';

interface ExamViewProps {
  questions: Question[];
  currentIndex: number;
  answers: Record<number, number | null>;
  marked: Record<number, boolean>;
  timeRemainingSeconds: number;
  onSelectOption: (questionId: number, optionIndex: number) => void;
  onClearOption: (questionId: number) => void;
  onToggleMark: (questionId: number) => void;
  onJumpToQuestion: (index: number) => void;
  onFinishExam: () => void;
}

// Horizontal slide-in/out transition variants for AnimatePresence
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.985,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 340, damping: 32 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.985,
    transition: {
      x: { type: 'spring' as const, stiffness: 340, damping: 32 },
      opacity: { duration: 0.16 },
      scale: { duration: 0.16 },
    },
  }),
};

export const ExamView: React.FC<ExamViewProps> = ({
  questions,
  currentIndex,
  answers,
  marked,
  timeRemainingSeconds,
  onSelectOption,
  onClearOption,
  onToggleMark,
  onJumpToQuestion,
  onFinishExam,
}) => {
  const [direction, setDirection] = useState<number>(1);
  const [instantFeedbackEnabled, setInstantFeedbackEnabled] = useState<boolean>(true);
  const [isOpticalOpen, setIsOpticalOpen] = useState(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

  const currentQuestion = questions.length > 0 ? (questions[currentIndex] || questions[0]) : null;
  const answeredCount = Object.values(answers).filter((val) => val !== null && val !== undefined).length;
  const markedCount = Object.values(marked).filter(Boolean).length;
  const emptyCount = questions.length - answeredCount;

  // Auto-save snapshot into localStorage on every state change
  useEffect(() => {
    try {
      const snapshot = {
        currentIndex,
        answers,
        marked,
        timeRemainingSeconds,
        lastSavedAt: Date.now(),
      };
      localStorage.setItem('kpss_active_exam_snapshot', JSON.stringify(snapshot));
    } catch (e) {
      console.error('Auto-save error', e);
    }
  }, [currentIndex, answers, marked, timeRemainingSeconds]);

  // Jump with directional awareness for slide animation
  const handleJump = useCallback(
    (targetIndex: number) => {
      setDirection(targetIndex >= currentIndex ? 1 : -1);
      onJumpToQuestion(targetIndex);
    },
    [currentIndex, onJumpToQuestion]
  );

  // Navigation handlers with horizontal slide direction
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      onJumpToQuestion(currentIndex - 1);
    }
  }, [currentIndex, onJumpToQuestion]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setDirection(1);
      onJumpToQuestion(currentIndex + 1);
    } else {
      setIsFinishModalOpen(true);
    }
  }, [currentIndex, questions.length, onJumpToQuestion]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing inside an input or when modal is open
      if (isOpticalOpen || isScratchpadOpen || isFinishModalOpen) {
        if (e.key === 'Escape') {
          setIsOpticalOpen(false);
          setIsScratchpadOpen(false);
          setIsFinishModalOpen(false);
        }
        return;
      }

      if (!currentQuestion) return;

      const key = e.key.toUpperCase();

      // Options A-E or 1-5
      const keyOptionMap: Record<string, number> = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        '1': 0,
        '2': 1,
        '3': 2,
        '4': 3,
        '5': 4,
      };

      if (key in keyOptionMap) {
        onSelectOption(currentQuestion.id, keyOptionMap[key]);
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (key === 'M' || key === 'F') {
        onToggleMark(currentQuestion.id);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        onClearOption(currentQuestion.id);
      } else if (key === 'S') {
        setIsScratchpadOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpticalOpen,
    isScratchpadOpen,
    isFinishModalOpen,
    currentQuestion,
    handleNext,
    handlePrev,
    onSelectOption,
    onToggleMark,
    onClearOption,
  ]);

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-7 pb-24 sm:pb-8">
      {/* Dynamic Time Alert Warning Banner */}
      <TimeAlertBanner timeRemainingSeconds={timeRemainingSeconds} />

      {/* 2-Zone Layout: Left Main Question Card, Right Navigation & Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center Zone with AnimatePresence Horizontal Slide Animation */}
        <div className="lg:col-span-8 overflow-hidden min-w-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col gap-4"
            >
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                selectedOption={answers[currentQuestion.id] ?? null}
                isMarked={!!marked[currentQuestion.id]}
                direction={direction}
                instantFeedbackEnabled={instantFeedbackEnabled}
                onToggleInstantFeedback={() => setInstantFeedbackEnabled((p) => !p)}
                onSelectOption={(optIdx) => onSelectOption(currentQuestion.id, optIdx)}
                onClearOption={() => onClearOption(currentQuestion.id)}
                onToggleMark={() => onToggleMark(currentQuestion.id)}
                onPrev={handlePrev}
                onNext={handleNext}
                onOpenScratchpad={() => setIsScratchpadOpen(true)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Zone (4 cols on desktop) */}
        <div className="lg:col-span-4 sticky top-20 flex flex-col gap-4">
          <NavigationGrid
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            marked={marked}
            onJumpToQuestion={handleJump}
          />
        </div>
      </div>

      {/* Mobile Sticky Bottom Floating Action Bar for Thumb-friendly Controls */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-[#161618]/90 backdrop-blur-xl border-t border-[#E5E5EA] dark:border-white/10 px-4 py-2.5 flex items-center justify-between shadow-lg">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
            currentIndex === 0
              ? 'opacity-30 border-transparent text-[#86868B]'
              : 'border-[#E5E5EA] dark:border-white/10 text-[#1D1D1F] dark:text-[#F5F5F7] bg-white dark:bg-[#1C1C1F]'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Önceki</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleMark(currentQuestion.id)}
            className={`p-2.5 rounded-xl border transition-colors ${
              marked[currentQuestion.id]
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-[#FF9500]'
                : 'border-[#E5E5EA] dark:border-white/10 text-[#86868B] dark:text-[#A1A1A6] bg-white dark:bg-[#1C1C1F]'
            }`}
            title="İşaretle"
          >
            <Bookmark className={`w-4 h-4 ${marked[currentQuestion.id] ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setIsOpticalOpen(true)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-[#F5F5F7] dark:bg-[#222226] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E5EA] dark:border-white/10"
          >
            Optik ({answeredCount}/120)
          </button>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-[#0071E3] hover:bg-[#0077ED] text-white shadow-xs transition-colors"
        >
          <span>{currentIndex === questions.length - 1 ? 'Bitir' : 'Sonraki'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Optical Sheet Modal */}
      <OpticalSheetModal
        isOpen={isOpticalOpen}
        onClose={() => setIsOpticalOpen(false)}
        questions={questions}
        answers={answers}
        onSelectOption={onSelectOption}
        onJumpToQuestion={handleJump}
      />

      {/* Scratchpad Canvas Modal */}
      <ScratchpadModal
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
        questionNumber={currentIndex + 1}
      />

      {/* Finish Confirmation Modal */}
      <FinishModal
        isOpen={isFinishModalOpen}
        onClose={() => setIsFinishModalOpen(false)}
        onConfirmFinish={() => {
          // Clear active snapshot on finish
          try {
            localStorage.removeItem('kpss_active_exam_snapshot');
          } catch (e) {}
          setIsFinishModalOpen(false);
          onFinishExam();
        }}
        answeredCount={answeredCount}
        emptyCount={emptyCount}
        markedCount={markedCount}
        timeRemainingSeconds={timeRemainingSeconds}
      />
    </div>
  );
};
