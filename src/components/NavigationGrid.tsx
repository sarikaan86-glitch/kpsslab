import React, { useState } from 'react';
import { Bookmark, Check, ChevronRight, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Question } from '../types/exam';
import { SUBJECTS } from '../utils/kpssScoring';

interface NavigationGridProps {
  questions: Question[];
  currentIndex: number;
  answers: Record<number, number | null>;
  marked: Record<number, boolean>;
  onJumpToQuestion: (index: number) => void;
}

export const NavigationGrid: React.FC<NavigationGridProps> = ({
  questions,
  currentIndex,
  answers,
  marked,
  onJumpToQuestion,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('ALL');

  // Filter questions based on selected subject tab
  const displayedQuestions = selectedSubjectId === 'ALL'
    ? questions
    : questions.filter((q) => q.subjectId === selectedSubjectId);

  // Quick jump helpers
  const handleJumpToNextEmpty = () => {
    for (let i = currentIndex + 1; i < questions.length; i++) {
      if (answers[questions[i].id] === null || answers[questions[i].id] === undefined) {
        onJumpToQuestion(i);
        return;
      }
    }
    for (let i = 0; i < currentIndex; i++) {
      if (answers[questions[i].id] === null || answers[questions[i].id] === undefined) {
        onJumpToQuestion(i);
        return;
      }
    }
  };

  const handleJumpToNextMarked = () => {
    for (let i = currentIndex + 1; i < questions.length; i++) {
      if (marked[questions[i].id]) {
        onJumpToQuestion(i);
        return;
      }
    }
    for (let i = 0; i < currentIndex; i++) {
      if (marked[questions[i].id]) {
        onJumpToQuestion(i);
        return;
      }
    }
  };

  return (
    <div className="bg-white dark:bg-[#161618] rounded-2xl p-5 border border-[#E5E5EA] dark:border-white/10 shadow-xs flex flex-col gap-4 transition-colors">
      {/* Subject Filter Tabs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-wider">
            Ders Seçimi
          </span>
          <span className="text-xs font-semibold text-[#0071E3] dark:text-[#2997FF] tabular-numbers">
            {displayedQuestions.length} Soru
          </span>
        </div>

        <div className="flex flex-wrap gap-1 p-1 bg-[#F5F5F7] dark:bg-[#1E1E22] rounded-xl border border-[#E5E5EA] dark:border-white/10">
          <button
            type="button"
            onClick={() => setSelectedSubjectId('ALL')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedSubjectId === 'ALL'
                ? 'bg-white dark:bg-[#2C2C30] text-[#1D1D1F] dark:text-[#F5F5F7] shadow-xs'
                : 'text-[#86868B] dark:text-[#A1A1A6] hover:text-[#1D1D1F]'
            }`}
          >
            Tümü
          </button>
          {SUBJECTS.map((sub) => (
            <button
              key={sub.id}
              type="button"
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedSubjectId === sub.id
                  ? 'bg-white dark:bg-[#2C2C30] text-[#1D1D1F] dark:text-[#F5F5F7] shadow-xs'
                  : 'text-[#86868B] dark:text-[#A1A1A6] hover:text-[#1D1D1F]'
              }`}
              title={sub.name}
            >
              {sub.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[11px] text-[#86868B] dark:text-[#A1A1A6] border-y border-[#F0F0F2] dark:border-white/10 py-2 px-1">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#1D1D1F] dark:bg-white" />
          Dolu
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm border border-[#D2D2D7] dark:border-white/20 bg-white dark:bg-[#161618]" />
          Boş
        </span>
        <span className="flex items-center gap-1 text-[#FF9500]">
          <Bookmark className="w-3 h-3 fill-current" />
          İşaretli
        </span>
        <span className="flex items-center gap-1 text-[#0071E3] dark:text-[#2997FF]">
          <span className="w-2.5 h-2.5 rounded-sm ring-2 ring-[#0071E3] dark:ring-[#2997FF] bg-white dark:bg-black" />
          Mevcut
        </span>
      </div>

      {/* Questions Matrix */}
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-[360px] overflow-y-auto pr-1 p-0.5">
        {displayedQuestions.map((q) => {
          const qIndex = questions.findIndex((item) => item.id === q.id);
          const isAnswered = answers[q.id] !== null && answers[q.id] !== undefined;
          const isCorrect = isAnswered && answers[q.id] === q.correctAnswer;
          const isQMarked = !!marked[q.id];
          const isActive = qIndex === currentIndex;

          return (
            <motion.button
              key={q.id}
              whileTap={{ scale: 0.92 }}
              animate={isActive ? { scale: 1.05 } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              type="button"
              onClick={() => onJumpToQuestion(qIndex >= 0 ? qIndex : 0)}
              className={`relative h-9 rounded-xl font-bold text-xs transition-colors flex items-center justify-center cursor-pointer tabular-numbers ${
                isActive
                  ? 'ring-2 ring-[#0071E3] dark:ring-[#2997FF] ring-offset-2 ring-offset-white dark:ring-offset-[#161618] shadow-sm z-10'
                  : ''
              } ${
                isAnswered
                  ? isCorrect
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-rose-500 text-white shadow-xs'
                  : 'bg-white dark:bg-[#1A1A1E] border border-[#D2D2D7] dark:border-white/10 text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#222226]'
              }`}
              title={`${q.id}. Soru (${q.subjectId} - ${q.topic})`}
            >
              <span>{q.id}</span>
              {isQMarked && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FF9500] text-white shadow-xs">
                  <span className="text-[8px] leading-none">★</span>
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Quick Jump Buttons */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-[#F0F0F2] dark:border-white/10">
        <button
          type="button"
          onClick={handleJumpToNextEmpty}
          className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-[#F5F5F7] dark:bg-[#1E1E22] hover:bg-[#E5E5EA] dark:hover:bg-[#26262B] rounded-xl transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#86868B] dark:text-[#A1A1A6]" />
            Sonraki Boş Soruya Git
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868B] dark:text-[#A1A1A6]" />
        </button>

        <button
          type="button"
          onClick={handleJumpToNextMarked}
          className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#FF9500] bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100/70 dark:hover:bg-amber-900/50 rounded-xl transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            Sonraki İşaretliye Git
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
