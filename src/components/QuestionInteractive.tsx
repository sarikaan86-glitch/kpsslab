import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ArrowUp, ArrowDown, Shuffle, Link2 } from 'lucide-react';
import { Question } from '../types/exam';

interface QuestionInteractiveProps {
  question: Question;
  selectedOption: number | null;
  instantFeedbackEnabled?: boolean;
  onSelectOption: (optionIndex: number) => void;
  textSizeClasses: {
    stem: string;
    option: string;
  };
}

export const QuestionInteractive: React.FC<QuestionInteractiveProps> = ({
  question,
  selectedOption,
  instantFeedbackEnabled = true,
  onSelectOption,
  textSizeClasses,
}) => {
  // 1. DOĞRU - YANLIŞ SORU TİPİ
  if (question.questionType === 'true_false') {
    const isTrue = selectedOption === 0;
    const isFalse = selectedOption === 1;

    return (
      <div className="flex flex-col gap-4 my-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* DOĞRU BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => onSelectOption(0)}
            className={`p-6 rounded-3xl border-2 transition-all flex items-center justify-between cursor-pointer relative overflow-hidden ${
              isTrue
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 ring-4 ring-emerald-500/20 shadow-md'
                : 'border-[#E5E5EA] dark:border-white/10 bg-white dark:bg-[#161618] hover:border-emerald-400/60 text-[#1D1D1F] dark:text-[#F5F5F7]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-xs ${
                  isTrue
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <div className="text-left">
                <span className="text-lg font-extrabold block">DOĞRU</span>
                <span className="text-xs text-[#86868B] dark:text-[#A1A1A6]">Kısayol: 1 veya D</span>
              </div>
            </div>
            {isTrue && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">
                Seçildi
              </span>
            )}
          </motion.button>

          {/* YANLIŞ BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => onSelectOption(1)}
            className={`p-6 rounded-3xl border-2 transition-all flex items-center justify-between cursor-pointer relative overflow-hidden ${
              isFalse
                ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 ring-4 ring-rose-500/20 shadow-md'
                : 'border-[#E5E5EA] dark:border-white/10 bg-white dark:bg-[#161618] hover:border-rose-400/60 text-[#1D1D1F] dark:text-[#F5F5F7]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-xs ${
                  isFalse
                    ? 'bg-rose-500 text-white'
                    : 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300'
                }`}
              >
                <X className="w-6 h-6 stroke-[3]" />
              </div>
              <div className="text-left">
                <span className="text-lg font-extrabold block">YANLIŞ</span>
                <span className="text-xs text-[#86868B] dark:text-[#A1A1A6]">Kısayol: 2 veya Y</span>
              </div>
            </div>
            {isFalse && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white">
                Seçildi
              </span>
            )}
          </motion.button>
        </div>
      </div>
    );
  }

  // 2. SIRALAMA (ORDERING) SORU TİPİ
  if (question.questionType === 'ordering' && question.orderingItems) {
    return (
      <div className="flex flex-col gap-3 my-2">
        <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-xs text-[#0071E3] dark:text-blue-300 font-medium">
          💡 <strong>Sıralama Sorusu:</strong> Aşağıdaki seçenekler arasından doğru kronolojik / mantıksal sıralamayı içeren seçeneği işaretleyin.
        </div>

        {/* Display Item List to be ordered */}
        <div className="p-4 bg-white dark:bg-[#161618] rounded-2xl border border-[#E5E5EA] dark:border-white/10 space-y-2 mb-3">
          <span className="text-xs font-bold text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-wider block mb-2">
            Sıralanacak Maddeler:
          </span>
          {question.orderingItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FBFBFD] dark:bg-[#1C1C1F] border border-[#E5E5EA] dark:border-white/5 text-xs sm:text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]"
            >
              <span className="w-6 h-6 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-[#1D1D1F] dark:text-white">
                {idx + 1}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Standard Options representing combinations */}
        <div className="space-y-2.5">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const letters = ['A', 'B', 'C', 'D', 'E'];
            return (
              <motion.button
                key={idx}
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelectOption(idx)}
                className={`w-full flex items-center p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'border-[#0071E3] bg-[#0071E3]/8 dark:bg-[#0071E3]/20 ring-2 ring-[#0071E3]/25 font-bold text-[#0071E3] dark:text-[#2997FF]'
                    : 'border-[#E5E5EA] dark:border-white/10 bg-white dark:bg-[#161618] hover:border-[#C7C7CC] dark:hover:border-white/20 text-[#1D1D1F] dark:text-[#F5F5F7]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-3 shrink-0 ${
                    isSelected
                      ? 'bg-[#0071E3] text-white'
                      : 'border border-[#D2D2D7] dark:border-white/20 text-[#86868B] dark:text-[#A1A1A6]'
                  }`}
                >
                  {letters[idx]}
                </div>
                <span className="text-sm">{opt}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. EŞLEŞTİRME (MATCHING) SORU TİPİ
  if (question.questionType === 'matching' && question.matchingPairs) {
    return (
      <div className="flex flex-col gap-3 my-2">
        <div className="p-3 bg-purple-50/60 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-900/50 text-xs text-purple-700 dark:text-purple-300 font-medium">
          🔗 <strong>Eşleştirme Sorusu:</strong> Verilen iki grup arasındaki doğru bağıntıyı içeren seçeneği işaretleyin.
        </div>

        {/* Visual Matching Columns Preview */}
        <div className="p-4 bg-white dark:bg-[#161618] rounded-2xl border border-[#E5E5EA] dark:border-white/10 mb-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#86868B] uppercase block">I. Grup</span>
              {question.matchingPairs.map((pair, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-[#F5F5F7] dark:bg-[#1C1C1F] text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E5EA] dark:border-white/5"
                >
                  <span className="font-bold text-[#0071E3] mr-1">{idx + 1}.</span> {pair.left}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#86868B] uppercase block">II. Grup</span>
              {question.matchingPairs.map((pair, idx) => {
                const roman = ['a', 'b', 'c', 'd', 'e'][idx];
                return (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-[#F5F5F7] dark:bg-[#1C1C1F] text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E5EA] dark:border-white/5"
                  >
                    <span className="font-bold text-purple-600 mr-1">{roman})</span> {pair.right}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Matching Answer Options */}
        <div className="space-y-2">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const letters = ['A', 'B', 'C', 'D', 'E'];
            return (
              <motion.button
                key={idx}
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelectOption(idx)}
                className={`w-full flex items-center p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'border-[#0071E3] bg-[#0071E3]/8 dark:bg-[#0071E3]/20 ring-2 ring-[#0071E3]/25 font-bold text-[#0071E3] dark:text-[#2997FF]'
                    : 'border-[#E5E5EA] dark:border-white/10 bg-white dark:bg-[#161618] hover:border-[#C7C7CC] dark:hover:border-white/20 text-[#1D1D1F] dark:text-[#F5F5F7]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-3 shrink-0 ${
                    isSelected
                      ? 'bg-[#0071E3] text-white'
                      : 'border border-[#D2D2D7] dark:border-white/20 text-[#86868B] dark:text-[#A1A1A6]'
                  }`}
                >
                  {letters[idx]}
                </div>
                <span className="text-sm">{opt}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};
