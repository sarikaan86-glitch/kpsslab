import React from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Question } from '../types/exam';

interface OpticalSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  answers: Record<number, number | null>;
  onSelectOption: (questionId: number, optionIndex: number) => void;
  onJumpToQuestion: (questionIndex: number) => void;
}

export const OpticalSheetModal: React.FC<OpticalSheetModalProps> = ({
  isOpen,
  onClose,
  questions,
  answers,
  onSelectOption,
  onJumpToQuestion,
}) => {
  if (!isOpen) return null;

  const options = ['A', 'B', 'C', 'D', 'E'];
  const answeredCount = Object.values(answers).filter((val) => val !== null).length;
  const emptyCount = 120 - answeredCount;

  // Split into 4 columns of 30 questions each:
  // Col 1: 1-30 (Türkçe)
  // Col 2: 31-60 (Matematik)
  // Col 3: 61-90 (Tarih & Coğrafya başlangıcı)
  // Col 4: 91-120 (Coğrafya devamı, Vatandaşlık, Güncel)
  const columns = [
    questions.slice(0, 30),
    questions.slice(30, 60),
    questions.slice(60, 90),
    questions.slice(90, 120),
  ];

  const colTitles = [
    'TÜRKÇE (1-30)',
    'MATEMATİK (31-60)',
    'TARİH & COĞRAFYA (61-90)',
    'COĞ / VAT / GÜNCEL (91-120)',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="flex flex-col w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-[#D2D2D7] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5EA] bg-[#FBFBFD]">
          <div>
            <h2 className="text-lg font-bold text-[#1D1D1F]">ÖSYM Tipi Optik Cevap Formu</h2>
            <div className="flex items-center gap-3 text-xs text-[#86868B] mt-0.5">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> {answeredCount} İşaretlendi
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[#86868B]">
                <AlertCircle className="w-3.5 h-3.5" /> {emptyCount} Boş
              </span>
              <span>·</span>
              <span>Hızlı cevaplamak veya soruya gitmek için numaraya veya şıkka tıklayın</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#86868B] hover:text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Optical Sheet Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAFAFA]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {columns.map((colQuestions, colIdx) => (
              <div
                key={colIdx}
                className="bg-white p-3 rounded-xl border border-[#E5E5EA] shadow-xs flex flex-col"
              >
                <div className="text-[11px] font-bold text-[#0071E3] tracking-wide mb-2.5 pb-1 border-b border-[#F0F0F2]">
                  {colTitles[colIdx]}
                </div>

                <div className="flex flex-col gap-1.5">
                  {colQuestions.map((q) => {
                    const currentAnswer = answers[q.id];
                    return (
                      <div
                        key={q.id}
                        className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-[#F5F5F7] group transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onJumpToQuestion(q.id - 1);
                            onClose();
                          }}
                          className="w-7 text-left text-xs font-semibold tabular-numbers text-[#1D1D1F] hover:text-[#0071E3]"
                          title="Bu soruya git"
                        >
                          {q.id.toString().padStart(2, '0')}.
                        </button>

                        <div className="flex items-center gap-1.5">
                          {options.map((opt, optIdx) => {
                            const isSelected = currentAnswer === optIdx;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => onSelectOption(q.id, optIdx)}
                                className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'bg-[#1D1D1F] text-white ring-2 ring-[#1D1D1F] ring-offset-1'
                                    : 'border border-[#D2D2D7] text-[#555] hover:border-[#86868B] hover:bg-slate-50'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#E5E5EA] bg-white text-xs text-[#86868B]">
          <span>Optik formda yapılan işaretlemeler anında sınava yansır.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0071E3] hover:bg-[#0077ED] rounded-lg transition-colors"
          >
            Sınava Dön
          </button>
        </div>
      </div>
    </div>
  );
};
