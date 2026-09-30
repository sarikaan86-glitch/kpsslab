import React, { useState, useRef, useEffect } from 'react';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Edit3,
  XCircle,
  Check,
  Sparkles,
  Volume2,
  VolumeX,
  CheckCircle2,
  Highlighter,
  Slash,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types/exam';
import { LatexRenderer } from './LatexRenderer';
import { QuestionMedia } from './QuestionMedia';
import { QuestionInteractive } from './QuestionInteractive';
import { soundFx } from '../utils/soundEffects';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: number | null;
  isMarked: boolean;
  direction: number;
  instantFeedbackEnabled?: boolean;
  onToggleInstantFeedback?: () => void;
  onSelectOption: (optionIndex: number) => void;
  onClearOption: () => void;
  onToggleMark: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenScratchpad: () => void;
}

const subjectStyles: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  TURKCE: { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-[#0071E3] dark:text-[#2997FF]', border: 'border-blue-200 dark:border-blue-800/50', icon: '📚' },
  MATEMATIK: { bg: 'bg-indigo-50 dark:bg-indigo-950/40', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-800/50', icon: '📐' },
  TARIH: { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800/50', icon: '🏛️' },
  COGRAFYA: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800/50', icon: '🌍' },
  VATANDASLIK: { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800/50', icon: '⚖️' },
  GUNCEL: { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-800/50', icon: '⚡' },
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  isMarked,
  direction,
  instantFeedbackEnabled = true,
  onToggleInstantFeedback,
  onSelectOption,
  onClearOption,
  onToggleMark,
  onPrev,
  onNext,
  onOpenScratchpad,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highlightKeywords, setHighlightKeywords] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<number, boolean>>({});
  const [questionSeconds, setQuestionSeconds] = useState(0);

  // Reset per-question state on index switch
  useEffect(() => {
    setEliminatedOptions({});
    setQuestionSeconds(0);
  }, [question.id]);

  // Track time spent on current question
  useEffect(() => {
    const t = setInterval(() => {
      setQuestionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [question.id]);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 55;

    if (diff > threshold) {
      onNext();
    } else if (diff < -threshold) {
      onPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Option selection with tactile audio feedback
  const handleOptionClick = (idx: number) => {
    if (eliminatedOptions[idx]) {
      // Un-eliminate if clicked directly
      setEliminatedOptions((p) => ({ ...p, [idx]: false }));
    }

    soundFx.playSelectClick();
    onSelectOption(idx);

    if (instantFeedbackEnabled && idx === question.correctAnswer) {
      soundFx.playSuccessChime();
    }
  };

  // Toggle option strikethrough elimination
  const handleToggleEliminate = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    soundFx.playSelectClick();
    setEliminatedOptions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Text to speech (Apple Voice Assistant simulation in Turkish)
  const handleToggleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${question.context ? question.context + '. ' : ''} ${question.question}`;
    const cleanText = textToRead.replace(/[\\$#*_{}[\]]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'tr-TR';
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const currentSubjectStyle = subjectStyles[question.subjectId] || subjectStyles.TURKCE;
  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  // Font size classes
  const textSizeClasses = {
    normal: { context: 'text-sm sm:text-base', stem: 'text-base sm:text-lg', option: 'text-sm sm:text-base' },
    large: { context: 'text-base sm:text-lg', stem: 'text-lg sm:text-xl', option: 'text-base sm:text-lg' },
    xlarge: { context: 'text-lg sm:text-xl', stem: 'text-xl sm:text-2xl', option: 'text-lg sm:text-xl' },
  }[fontSize];

  const isInteractiveSpecialType =
    question.questionType === 'true_false' ||
    question.questionType === 'matching' ||
    question.questionType === 'ordering';

  // Pace indicator calculation (<60s green, 60-90s amber, >90s red)
  const paceColor =
    questionSeconds < 55
      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
      : questionSeconds < 90
      ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
      : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 animate-pulse';

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="flex flex-col gap-4 select-none"
    >
      {/* Main Question Surface (Apple Card Style) */}
      <div className="bg-white dark:bg-[#161618] rounded-3xl p-6 sm:p-8 border border-[#E5E5EA] dark:border-white/10 shadow-xs transition-colors duration-200">
        {/* Card Header: Subject, Pace, & Quick Tools */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[#F0F0F2] dark:border-white/10">
          {/* Subject Badge & Question Counter */}
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${currentSubjectStyle.bg} ${currentSubjectStyle.text} ${currentSubjectStyle.border}`}
            >
              <span>{currentSubjectStyle.icon}</span>
              <span>{question.topic}</span>
            </span>

            <div className="flex items-center text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-numbers ml-1">
              <span>Soru {currentIndex + 1}</span>
              <span className="text-[#86868B] dark:text-[#A1A1A6] font-normal ml-1">/ {totalQuestions}</span>
            </div>

            {/* Time spent on current question */}
            <div
              className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border tabular-numbers ${paceColor}`}
              title="Bu soruda harcanan süre"
            >
              <Clock className="w-3 h-3" />
              <span>{Math.floor(questionSeconds / 60)}:{(questionSeconds % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>

          {/* Quick Tools Bar */}
          <div className="flex items-center gap-2">
            {/* Instant Answer Feedback Toggle */}
            {onToggleInstantFeedback && (
              <button
                type="button"
                onClick={onToggleInstantFeedback}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  instantFeedbackEnabled
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 shadow-xs'
                    : 'text-[#86868B] dark:text-[#A1A1A6] border-[#E5E5EA] dark:border-white/10 hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1F]'
                }`}
                title="Her cevaptan sonra doğru cevabı ve çözümü anında göster"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Anında Çözüm: {instantFeedbackEnabled ? 'Açık' : 'Kapalı'}</span>
              </button>
            )}

            {/* Keyword Highlighter Toggle */}
            <button
              type="button"
              onClick={() => setHighlightKeywords(!highlightKeywords)}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                highlightKeywords
                  ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700 shadow-2xs'
                  : 'text-[#86868B] dark:text-[#A1A1A6] border-[#E5E5EA] dark:border-white/10 hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1F]'
              }`}
              title="ÖSYM Kritik İpuçlarını ve Olumsuz Soru Köklerini Vurgula"
            >
              <Highlighter className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden md:inline">Vurgula</span>
            </button>

            {/* Read Aloud (Speech Synthesis) */}
            <button
              type="button"
              onClick={handleToggleSpeak}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                isSpeaking
                  ? 'bg-[#0071E3] text-white border-[#0071E3]'
                  : 'text-[#86868B] dark:text-[#A1A1A6] border-[#E5E5EA] dark:border-white/10 hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1F]'
              }`}
              title="Soruyu Sesli Dinle"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#2997FF]" />}
              <span className="hidden md:inline">{isSpeaking ? 'Durdur' : 'Sesli'}</span>
            </button>

            {/* Font size toggle */}
            <div className="flex items-center bg-[#F5F5F7] dark:bg-[#1C1C1F] rounded-xl p-0.5 border border-[#E5E5EA] dark:border-white/10">
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  fontSize === 'normal'
                    ? 'bg-white dark:bg-[#2C2C30] text-[#1D1D1F] dark:text-[#F5F5F7] shadow-xs'
                    : 'text-[#86868B] dark:text-[#A1A1A6] hover:text-[#1D1D1F]'
                }`}
                title="Normal Yazı Boyutu"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  fontSize === 'large'
                    ? 'bg-white dark:bg-[#2C2C30] text-[#1D1D1F] dark:text-[#F5F5F7] shadow-xs'
                    : 'text-[#86868B] dark:text-[#A1A1A6] hover:text-[#1D1D1F]'
                }`}
                title="Büyük Yazı Boyutu"
              >
                A+
              </button>
            </div>

            {/* Scratchpad */}
            <button
              type="button"
              onClick={onOpenScratchpad}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#86868B] dark:text-[#A1A1A6] hover:text-[#0071E3] dark:hover:text-[#2997FF] rounded-xl hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1F] border border-transparent hover:border-[#E5E5EA] dark:border-white/10 transition-all cursor-pointer"
              title="Karalama Tahtası"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Karalama</span>
            </button>

            {/* Mark / Flag Toggle */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={onToggleMark}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isMarked
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-[#FF9500] border-amber-300 dark:border-amber-700 shadow-xs'
                  : 'text-[#86868B] dark:text-[#A1A1A6] border-[#E5E5EA] dark:border-white/10 hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1F] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]'
              }`}
              title="İşaretle"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isMarked ? 'fill-current text-[#FF9500]' : ''}`} />
              <span className="hidden sm:inline">{isMarked ? 'İşaretli' : 'İşaretle'}</span>
            </motion.button>
          </div>
        </div>

        {/* Question Body */}
        <div className="flex flex-col min-h-[280px]">
          {/* Reading Passage / Context (if present) */}
          {question.context && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="mb-6 p-4 sm:p-5 bg-[#FBFBFD] dark:bg-[#1A1A1E] border-l-3 border-[#0071E3] dark:border-[#2997FF] rounded-r-2xl border-y border-r border-[#E5E5EA] dark:border-white/10"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0071E3] dark:text-[#2997FF] uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3 h-3" />
                Metin / Parça
              </div>
              <p className={`${textSizeClasses.context} text-[#3A3A3C] dark:text-[#D1D1D6] font-normal leading-relaxed whitespace-pre-line`}>
                <LatexRenderer content={question.context} />
              </p>
            </motion.div>
          )}

          {/* Media Attachments: Table, Map, Chart, Video, Image */}
          {question.media && <QuestionMedia media={question.media} />}

          {/* Question Stem */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.08 }}
            className="mb-7"
          >
            <div className={`${textSizeClasses.stem} font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] whitespace-pre-line leading-relaxed`}>
              <LatexRenderer content={question.question} isBlock={true} />
            </div>

            {/* Keyword Alert Pill if Highlighter is active */}
            {highlightKeywords && (
              <div className="mt-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <Highlighter className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  <strong>Dikkat:</strong> Soru kökündeki olumsuz ifadelere ("değildir", "yoktur", "en az", "kesinlikle") odaklanarak çeldiricilere dikkat ediniz.
                </span>
              </div>
            )}
          </motion.div>

          {/* Special Question Types: True/False, Matching, Ordering */}
          {isInteractiveSpecialType ? (
            <QuestionInteractive
              question={question}
              selectedOption={selectedOption}
              instantFeedbackEnabled={instantFeedbackEnabled}
              onSelectOption={handleOptionClick}
              textSizeClasses={textSizeClasses}
            />
          ) : (
            /* Standard Multiple Choice Options (A-E) */
            <div className="flex flex-col gap-3 mt-auto">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === question.correctAnswer;
                const isChosenWrong = isSelected && !isCorrect;
                const isEliminated = !!eliminatedOptions[idx];

                // Determine option border and background
                let containerStyle = '';
                let circleStyle = '';

                if (instantFeedbackEnabled && selectedOption !== null) {
                  if (isCorrect) {
                    containerStyle =
                      'border-emerald-500 bg-emerald-50/85 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/40 shadow-xs';
                    circleStyle = 'bg-emerald-500 text-white shadow-xs';
                  } else if (isChosenWrong) {
                    containerStyle =
                      'border-rose-500 bg-rose-50/85 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/40 shadow-xs';
                    circleStyle = 'bg-rose-500 text-white shadow-xs';
                  } else {
                    containerStyle =
                      'border-[#E5E5EA] dark:border-white/10 bg-white dark:bg-[#1A1A1E] opacity-50';
                    circleStyle =
                      'border border-[#D2D2D7] dark:border-white/20 text-[#86868B] dark:text-[#A1A1A6] bg-white dark:bg-[#161618]';
                  }
                } else if (isEliminated) {
                  containerStyle =
                    'border-neutral-200 dark:border-white/5 bg-neutral-100/60 dark:bg-neutral-900/60 opacity-35 line-through';
                  circleStyle = 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500';
                } else if (isSelected) {
                  containerStyle =
                    'border-[#0071E3] dark:border-[#2997FF] bg-[#0071E3]/8 dark:bg-[#0071E3]/20 ring-2 ring-[#0071E3]/25 dark:ring-[#2997FF]/30 shadow-xs';
                  circleStyle = 'bg-[#0071E3] dark:bg-[#2997FF] text-white shadow-xs scale-105';
                } else {
                  containerStyle =
                    'border-[#E5E5EA] dark:border-white/10 bg-white dark:bg-[#1A1A1E] hover:border-[#C7C7CC] dark:hover:border-white/20 hover:bg-[#FAFAFC] dark:hover:bg-[#222226]';
                  circleStyle =
                    'border border-[#D2D2D7] dark:border-white/20 text-[#86868B] dark:text-[#A1A1A6] bg-white dark:bg-[#161618] group-hover:border-[#0071E3] dark:group-hover:border-[#2997FF] group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF]';
                }

                return (
                  <motion.div
                    key={`${question.id}-${idx}`}
                    role="button"
                    tabIndex={0}
                    initial={{ opacity: 0, y: 10, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.22,
                      delay: 0.06 + idx * 0.025,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ scale: isEliminated ? 1 : 1.006, x: isEliminated ? 0 : 2 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleOptionClick(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleOptionClick(idx);
                      }
                    }}
                    className={`group w-full flex items-start text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden select-none ${containerStyle}`}
                  >
                    {/* Option Letter Circle */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-3.5 shrink-0 transition-all ${circleStyle}`}
                    >
                      {instantFeedbackEnabled && selectedOption !== null ? (
                        isCorrect ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : isChosenWrong ? (
                          <span className="text-xs font-black">✕</span>
                        ) : (
                          optionLetters[idx]
                        )
                      ) : isSelected ? (
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        optionLetters[idx]
                      )}
                    </div>

                    <div className="flex-1 flex items-center justify-between flex-wrap gap-2">
                      <span className={`${textSizeClasses.option} text-[#1D1D1F] dark:text-[#F5F5F7] pt-0.5 leading-snug`}>
                        <LatexRenderer content={opt} />
                      </span>

                      {/* Correct / Wrong Pill Badge on instant feedback */}
                      {instantFeedbackEnabled && selectedOption !== null && isCorrect && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white shrink-0 shadow-xs">
                          DOĞRU CEVAP ✓
                        </span>
                      )}
                      {instantFeedbackEnabled && selectedOption !== null && isChosenWrong && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white shrink-0 shadow-xs">
                          YANLIŞ SEÇİM ✕
                        </span>
                      )}
                    </div>

                    {/* Strikethrough Eliminate Action Button (Hover tool) */}
                    {selectedOption === null && (
                      <button
                        type="button"
                        onClick={(e) => handleToggleEliminate(e, idx)}
                        className={`ml-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#86868B] transition-opacity cursor-pointer ${
                          isEliminated ? 'opacity-100 text-rose-500' : ''
                        }`}
                        title={isEliminated ? 'Şıkkı geri al' : 'Bu şıkkı ele (üstünü çiz)'}
                      >
                        <Slash className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Instant Solution & Feedback Card (Directly Answers User Request) */}
          {instantFeedbackEnabled && selectedOption !== null && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className={`mt-6 p-5 sm:p-6 rounded-3xl border ${
                selectedOption === question.correctAnswer
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 shadow-xs'
                  : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/60 shadow-xs'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3.5 pb-3 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-base shadow-xs ${
                      selectedOption === question.correctAnswer
                        ? 'bg-emerald-500 text-white'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {selectedOption === question.correctAnswer ? '✓' : '✕'}
                  </div>
                  <div>
                    <h4
                      className={`text-sm sm:text-base font-black tracking-tight ${
                        selectedOption === question.correctAnswer
                          ? 'text-emerald-900 dark:text-emerald-200'
                          : 'text-rose-900 dark:text-rose-200'
                      }`}
                    >
                      {selectedOption === question.correctAnswer
                        ? 'Tebrikler! Doğru Yanıt (+1.00 Net)'
                        : `Yanlış Seçim. Doğru Cevap: (${optionLetters[question.correctAnswer]}) (-0.25 Net)`}
                    </h4>
                    <p className="text-xs text-[#86868B] dark:text-[#A1A1A6]">
                      {question.topic} · ÖSYM Detaylı Çözüm Açıklaması
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedOption === question.correctAnswer
                      ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200'
                      : 'bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200'
                  }`}
                >
                  {selectedOption === question.correctAnswer ? 'Kusursuz' : 'Telafi Notu'}
                </span>
              </div>

              {/* Solution Text */}
              <div className="text-sm text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed">
                <span className="text-xs font-bold uppercase tracking-wider text-[#86868B] dark:text-[#A1A1A6] block mb-1.5">
                  💡 ÖSYM Çözüm ve Analiz Açıklaması:
                </span>
                <div className="bg-white/90 dark:bg-[#161618] p-4 rounded-2xl border border-black/5 dark:border-white/10">
                  <LatexRenderer content={question.explanation} isBlock={true} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation Controls Bar */}
      <div className="flex items-center justify-between gap-3 bg-white dark:bg-[#161618] p-3.5 sm:p-4 rounded-2xl border border-[#E5E5EA] dark:border-white/10 shadow-xs">
        <motion.button
          whileHover={currentIndex > 0 ? { scale: 1.02 } : {}}
          whileTap={currentIndex > 0 ? { scale: 0.96 } : {}}
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
            currentIndex === 0
              ? 'opacity-35 cursor-not-allowed border-[#E5E5EA] dark:border-white/10 text-[#86868B]'
              : 'border-[#D2D2D7] dark:border-white/20 text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#222226]'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Önceki Soru</span>
        </motion.button>

        <div className="flex items-center gap-2">
          {selectedOption !== null && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onClearOption}
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-[#86868B] dark:text-[#A1A1A6] hover:text-red-600 dark:hover:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-all cursor-pointer border border-transparent hover:border-red-200 dark:hover:border-red-800"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cevabı Temizle</span>
            </motion.button>
          )}
        </div>

        <motion.button
          whileHover={currentIndex < totalQuestions - 1 ? { scale: 1.02 } : {}}
          whileTap={currentIndex < totalQuestions - 1 ? { scale: 0.96 } : {}}
          type="button"
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
            currentIndex === totalQuestions - 1
              ? 'opacity-35 cursor-not-allowed border-[#E5E5EA] dark:border-white/10 text-[#86868B]'
              : 'border-[#D2D2D7] dark:border-white/20 text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#222226]'
          }`}
        >
          <span>Sonraki Soru</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};
