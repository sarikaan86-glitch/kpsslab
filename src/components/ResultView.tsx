import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  Filter,
  HelpCircle,
  Printer,
  RefreshCw,
  RotateCcw,
  Sparkles,
  TrendingUp,
  XCircle,
  Trophy,
  Flame,
  LayoutGrid,
  Search,
} from 'lucide-react';
import { ExamResult, Question, SubjectId } from '../types/exam';
import { formatDuration, formatTime, SUBJECTS } from '../utils/kpssScoring';
import { AppleActivityRings } from './AppleActivityRings';
import { GamificationBadges } from './GamificationBadges';
import { QuestionAnalytics } from './QuestionAnalytics';
import { NetAnalysisChart } from './NetAnalysisChart';
import { LatexRenderer } from './LatexRenderer';
import { useAchievementToast } from '../context/ToastContext';
import { StudyNotesSection } from './StudyNotesSection';
import { generateStudyGuide } from '../utils/studyGuideGenerator';
import { CareerCadreSimulator } from './CareerCadreSimulator';
import { BookOpen, Briefcase } from 'lucide-react';

interface ResultViewProps {
  result: ExamResult;
  questions: Question[];
  history?: ExamResult[];
  onRestartExam: () => void;
  onRetakeMistakes: (wrongQuestionIds: number[]) => void;
}

type ResultTab = 'overview' | 'study_notes' | 'cadre_sim' | 'net_chart' | 'analytics' | 'gamification' | 'solutions';

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  questions,
  history,
  onRestartExam,
  onRetakeMistakes,
}) => {
  const { triggerToast } = useAchievementToast();
  const [activeTab, setActiveTab] = useState<ResultTab>('overview');
  const [filterMode, setFilterMode] = useState<'ALL' | 'WRONG' | 'EMPTY' | 'CORRECT'>('ALL');
  const [subjectFilter, setSubjectFilter] = useState<string>('ALL');
  const [topicSearchQuery, setTopicSearchQuery] = useState<string>('');

  // Celebration confetti and Apple Achievement Toast on mount
  useEffect(() => {
    if (result.totalNet >= 50) {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#0071E3', '#34C759', '#FF9500', '#FA114F'],
        });
      } catch (e) {
        // Safe fallback
      }
    }

    if (result.totalNet >= 70) {
      triggerToast({
        badgeTag: 'BAŞARI EŞİĞİ AŞILDI',
        title: `${result.totalNet} Net ile 70 Barajı Geçildi!`,
        subtitle: `Tahmini KPSS P3 Puanı: ${result.estimatedP3Score} · Başarı Oranı: %${Math.round((result.totalNet / 120) * 100)}`,
        icon: '🎯',
        xp: 80,
        durationMs: 5500,
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [result, triggerToast]);

  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  // Wrong question IDs for retake mode
  const wrongQuestionIds = questions
    .filter((q) => {
      const u = result.answers[q.id];
      return u !== null && u !== undefined && u !== q.correctAnswer;
    })
    .map((q) => q.id);

  // Filter solutions
  const filteredQuestions = questions.filter((q) => {
    const u = result.answers[q.id];
    const isCorrect = u === q.correctAnswer;
    const isEmpty = u === null || u === undefined;
    const isWrong = !isEmpty && !isCorrect;

    // Subject filter
    if (subjectFilter !== 'ALL' && q.subjectId !== subjectFilter) {
      return false;
    }

    // Status filter
    if (filterMode === 'WRONG' && !isWrong) return false;
    if (filterMode === 'EMPTY' && !isEmpty) return false;
    if (filterMode === 'CORRECT' && !isCorrect) return false;

    // Topic search
    if (topicSearchQuery.trim() !== '') {
      const query = topicSearchQuery.toLowerCase();
      return (
        q.topic.toLowerCase().includes(query) ||
        q.question.toLowerCase().includes(query) ||
        q.explanation.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Calculate percentage of Doughnut chart
  const total = result.totalQuestions;
  const cPct = (result.totalCorrect / total) * 100;
  const wPct = (result.totalWrong / total) * 100;
  const accuracyRate =
    result.totalCorrect + result.totalWrong > 0
      ? (result.totalCorrect / (result.totalCorrect + result.totalWrong)) * 100
      : 0;

  // Pace time score (130 min / 7800s benchmark)
  const timeScore = Math.min(100, Math.max(20, Math.round(((7800 - result.elapsedSeconds * 0.4) / 7800) * 100)));

  // Determine performance message
  const getP3Assessment = (score: number) => {
    if (score >= 85) return { title: 'Mükemmel Derece', desc: 'Merkezi atamalarda ve A grubu kadrolarda çok avantajlı bir puandasınız.' };
    if (score >= 75) return { title: 'Başarılı Seviye', desc: 'Atama şansı yüksek. Eksik konuları tekrarlayarak 85+ seviyesine çıkabilirsiniz.' };
    if (score >= 65) return { title: 'Gelişime Açık', desc: 'Temel kavramlar oturmuş. Hatalı olduğunuz derslerde soru bankası taraması yapmalısınız.' };
    return { title: 'Yoğun Çalışma Gerekli', desc: 'Özellikle Genel Yetenek veya Tarih konularında konu tekrarları planlamalısınız.' };
  };

  const assessment = getP3Assessment(result.estimatedP3Score);
  const studyGuide = generateStudyGuide(result, questions);

  const tabs: { id: ResultTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Genel Karne', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'study_notes', label: 'Çalışma Notu & Telafi', icon: <BookOpen className="w-4 h-4 text-amber-500" /> },
    { id: 'cadre_sim', label: 'Hedef Kadro & Atama', icon: <Briefcase className="w-4 h-4 text-emerald-500" /> },
    { id: 'net_chart', label: 'Gelişim Grafiği', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'analytics', label: 'Konu Analizi', icon: <Search className="w-4 h-4" /> },
    { id: 'gamification', label: 'Rozetler & Seviye', icon: <Trophy className="w-4 h-4" /> },
    { id: 'solutions', label: 'Soru Çözümleri', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Header Banner (Apple Style) */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-[#0071E3] tracking-wider uppercase block mb-1">
          KPSSLAB ÖSYM PERFORMANS RAPORU
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1D1D1F] tracking-tight mb-2">
          Sınav Analiz ve Karnesi
        </h1>
        <p className="text-sm text-[#86868B]">
          {result.date} · Toplam Süre: {formatDuration(result.elapsedSeconds)} · 4 Yanlış 1 Doğru Esas Alınmıştır
        </p>
      </div>

      {/* Apple Style Floating Frosted Glass Segmented Control Tabs */}
      <div className="sticky top-16 z-30 mb-8 max-w-2xl mx-auto">
        <div className="flex items-center p-1.5 bg-white/85 backdrop-blur-xl border border-black/8 rounded-2xl shadow-sm">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer select-none ${
                  isActive ? 'text-[#1D1D1F]' : 'text-[#86868B] hover:text-[#1D1D1F]'
                }`}
              >
                {/* Active Sliding Capsule Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeResultTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-black/5"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content with AnimatePresence */}
      <AnimatePresence mode="wait">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div
            key="tab-overview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Primary Scoreboards (Apple Style Grid) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Estimated P3 Score */}
              <div className="bg-linear-to-br from-blue-50/70 via-white to-blue-50/30 p-5 rounded-3xl border border-blue-200/90 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#0071E3] uppercase tracking-wider block mb-1">
                    Tahmini KPSS P3
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-[#1D1D1F] tracking-tight tabular-numbers">
                    {result.estimatedP3Score.toFixed(2)}
                  </div>
                </div>
                <span className="text-[11px] text-[#0071E3] font-semibold mt-2">
                  {assessment.title}
                </span>
              </div>

              {/* Total Net */}
              <div className="bg-white p-5 rounded-3xl border border-[#E5E5EA] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-1">
                    Toplam Net
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-[#0071E3] tracking-tight tabular-numbers">
                    {result.totalNet.toFixed(2)}
                  </div>
                </div>
                <div className="text-[11px] text-[#86868B] mt-2 flex items-center justify-between">
                  <span>GY: <strong>{result.gyNet}</strong></span>
                  <span>GK: <strong>{result.gkNet}</strong></span>
                </div>
              </div>

              {/* Correct Answers */}
              <div className="bg-white p-5 rounded-3xl border border-[#E5E5EA] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                    Doğru Sayısı
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-emerald-600 tracking-tight tabular-numbers">
                    {result.totalCorrect}
                  </div>
                </div>
                <span className="text-[11px] text-[#86868B] mt-2">
                  120 soruda %{Math.round((result.totalCorrect / 120) * 100)} başarı
                </span>
              </div>

              {/* Wrong & Empty */}
              <div className="bg-white p-5 rounded-3xl border border-[#E5E5EA] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">
                    Yanlış / Boş
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-red-500 tracking-tight tabular-numbers">
                    {result.totalWrong}
                    <span className="text-2xl font-normal text-[#86868B]"> / {result.totalEmpty}</span>
                  </div>
                </div>
                <span className="text-[11px] text-[#86868B] mt-2">
                  Net Kaybı: -{(result.totalWrong * 0.25).toFixed(2)} Net
                </span>
              </div>
            </div>

            {/* Apple Style Study Notes Spotlight Card */}
            {studyGuide.weakTopics.length > 0 && (
              <div className="bg-linear-to-r from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-neutral-900 p-5 rounded-3xl border border-amber-200/80 dark:border-amber-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-400 dark:bg-amber-500 text-neutral-900 flex items-center justify-center font-bold text-xl shadow-xs shrink-0 ring-2 ring-white/30">
                    📝
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                        Apple Notlar Stili Telafi Rehberi
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-200/70 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200">
                        {studyGuide.weakTopics.length} Zayıf Konu
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight mt-0.5">
                      Yanlış Yapılan {wrongQuestionIds.length} Soru İçin Çalışma Notunuz Hazırlandı
                    </h4>
                    <p className="text-xs text-[#86868B] dark:text-[#A1A1A6] mt-0.5">
                      ÖSYM soru tuzakları, formül hatırlatmaları ve 7 günlük telafi programı oluşturuldu.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('study_notes')}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Çalışma Notlarını Aç</span>
                </button>
              </div>
            )}

            {/* Apple Activity Rings + Subject Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Apple Activity Rings Card (5 cols) */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#E5E5EA] shadow-xs flex flex-col items-center justify-between">
                <div className="w-full flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#1D1D1F] uppercase tracking-wider">
                    KPSS Aktivite Halkaları
                  </h3>
                  <span className="text-[11px] font-semibold text-[#86868B]">
                    Hedef: 85 Net
                  </span>
                </div>

                <AppleActivityRings
                  totalNet={result.totalNet}
                  targetNet={85}
                  accuracyRate={accuracyRate}
                  timeScore={timeScore}
                  size={210}
                />

                <div className="mt-4 pt-3 border-t border-[#F0F0F2] w-full text-center">
                  <p className="text-xs text-[#86868B]">
                    Halkaları kapatmak için net hedefinizi tutturun ve isabet oranınızı %80 üzerinde tutun.
                  </p>
                </div>
              </div>

              {/* Subject Breakdown Bars (7 cols) */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-[#E5E5EA] shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#1D1D1F] uppercase tracking-wider">
                    Ders Bazlı Net Karnesi
                  </h3>
                  <span className="text-xs text-[#86868B]">4 Yanlış 1 Doğru</span>
                </div>

                <div className="space-y-4 my-auto">
                  {SUBJECTS.map((sub) => {
                    const stat = result.subjectStats[sub.id];
                    if (!stat) return null;
                    const maxNet = stat.total;
                    const netPercent = Math.max(0, Math.min(100, (stat.net / maxNet) * 100));

                    return (
                      <div key={sub.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1D1D1F]">
                            {sub.name}
                            <span className="text-[#86868B] font-normal ml-1">
                              ({stat.total} Soru)
                            </span>
                          </span>
                          <span className="font-extrabold text-[#1D1D1F] tabular-numbers">
                            {stat.net.toFixed(2)} Net{' '}
                            <span className="text-[11px] font-normal text-[#86868B]">
                              ({stat.correct}D / {stat.wrong}Y / {stat.empty}B)
                            </span>
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2.5 w-full bg-[#F5F5F7] rounded-full overflow-hidden flex">
                          <div
                            className="h-full bg-emerald-500 rounded-l-full transition-all duration-500"
                            style={{ width: `${(stat.correct / stat.total) * 100}%` }}
                            title={`${stat.correct} Doğru`}
                          />
                          <div
                            className="h-full bg-red-400 transition-all duration-500"
                            style={{ width: `${(stat.wrong / stat.total) * 100}%` }}
                            title={`${stat.wrong} Yanlış`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Sub-Actions */}
                <div className="mt-6 pt-4 border-t border-[#F0F0F2] flex items-center justify-between text-xs text-[#86868B]">
                  <span>Genel Yetenek: <strong className="text-[#1D1D1F]">{result.gyNet} Net</strong></span>
                  <span>Genel Kültür: <strong className="text-[#1D1D1F]">{result.gkNet} Net</strong></span>
                </div>
              </div>
            </div>

            {/* Recharts Net Analysis & Comparative Line Chart */}
            <NetAnalysisChart currentResult={result} history={history} />

            {/* Action Bar (Retake Mistakes, Restart, Print) */}
            <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-4 rounded-3xl border border-[#E5E5EA] shadow-xs">
              {wrongQuestionIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => onRetakeMistakes(wrongQuestionIds)}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Yanlışlarımı Tekrar Çöz ({wrongQuestionIds.length} Soru)</span>
                </button>
              )}

              <button
                type="button"
                onClick={onRestartExam}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Yeni Deneme Başlat</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] font-semibold text-sm border border-[#E5E5EA] transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#86868B]" />
                <span className="hidden sm:inline">Raporu Yazdır / PDF</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB: STUDY NOTES & WEAK TOPIC REMEDIATION */}
        {activeTab === 'study_notes' && (
          <motion.div
            key="tab-study-notes"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <StudyNotesSection
              studyGuide={studyGuide}
              onRetakeMistakes={() => onRetakeMistakes(wrongQuestionIds)}
              wrongQuestionCount={wrongQuestionIds.length}
            />
          </motion.div>
        )}

        {/* TAB: CAREER CADRE & BASE SCORE SIMULATOR */}
        {activeTab === 'cadre_sim' && (
          <motion.div
            key="tab-cadre-sim"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <CareerCadreSimulator
              currentP3Score={result.estimatedP3Score}
              currentNet={result.totalNet}
            />
          </motion.div>
        )}

        {/* TAB: DEDICATED NET & PERFORMANCE CHART */}
        {activeTab === 'net_chart' && (
          <motion.div
            key="tab-net-chart"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <NetAnalysisChart currentResult={result} history={history} />
          </motion.div>
        )}

        {/* TAB 2: DETAILED QUESTION & TOPIC ANALYTICS */}
        {activeTab === 'analytics' && (
          <motion.div
            key="tab-analytics"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <QuestionAnalytics
              result={result}
              questions={questions}
              onFilterTopicQuestions={(topic) => {
                setTopicSearchQuery(topic);
                setActiveTab('solutions');
              }}
            />
          </motion.div>
        )}

        {/* TAB 3: GAMIFICATION & BADGES */}
        {activeTab === 'gamification' && (
          <motion.div
            key="tab-gamification"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <GamificationBadges result={result} questions={questions} history={history} />
          </motion.div>
        )}

        {/* TAB 4: DETAILED SOLUTIONS */}
        {activeTab === 'solutions' && (
          <motion.div
            key="tab-solutions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Filter Bar */}
            <div className="bg-white rounded-3xl p-5 border border-[#E5E5EA] shadow-xs flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D1F]">
                    Detaylı Çözümler ve Açıklamalar
                  </h3>
                  <p className="text-xs text-[#86868B]">
                    Listelenen: {filteredQuestions.length} / 120 Soru
                  </p>
                </div>

                {/* Status Tabs */}
                <div className="flex items-center gap-1 p-1 bg-[#F5F5F7] rounded-xl border border-[#E5E5EA]">
                  {(['ALL', 'WRONG', 'EMPTY', 'CORRECT'] as const).map((mode) => {
                    const labelMap = {
                      ALL: 'Tümü',
                      WRONG: `Yanlış (${result.totalWrong})`,
                      EMPTY: `Boş (${result.totalEmpty})`,
                      CORRECT: `Doğru (${result.totalCorrect})`,
                    };
                    const isSelected = filterMode === mode;
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setFilterMode(mode)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-white text-[#1D1D1F] shadow-xs'
                            : 'text-[#86868B] hover:text-[#1D1D1F]'
                        }`}
                      >
                        {labelMap[mode]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subject Selection Pills and Search */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F0F0F2]">
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => setSubjectFilter('ALL')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      subjectFilter === 'ALL'
                        ? 'bg-[#1D1D1F] text-white'
                        : 'bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F]'
                    }`}
                  >
                    Tüm Dersler
                  </button>
                  {SUBJECTS.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSubjectFilter(sub.id)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        subjectFilter === sub.id
                          ? 'bg-[#0071E3] text-white'
                          : 'bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F]'
                      }`}
                    >
                      {sub.shortName}
                    </button>
                  ))}
                </div>

                {/* Topic/Text Search Input */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-[#86868B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Konu veya soru ara..."
                    value={topicSearchQuery}
                    onChange={(e) => setTopicSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#E5E5EA] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
                  />
                  {topicSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setTopicSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#86868B] hover:text-[#1D1D1F]"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Questions Solution List */}
            <div className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-[#E5E5EA]">
                  <HelpCircle className="w-10 h-10 text-[#86868B] mx-auto mb-2 opacity-50" />
                  <h4 className="text-base font-bold text-[#1D1D1F]">
                    Kriterlere Uygun Soru Bulunamadı
                  </h4>
                  <p className="text-xs text-[#86868B] mt-1">
                    Filtre ayarlarını değiştirerek daha fazla soru görüntüleyebilirsiniz.
                  </p>
                </div>
              ) : (
                filteredQuestions.map((q) => {
                  const u = result.answers[q.id];
                  const isCorrect = u === q.correctAnswer;
                  const isEmpty = u === null || u === undefined;

                  return (
                    <div
                      key={q.id}
                      className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E5E5EA] shadow-xs"
                    >
                      {/* Meta header */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F0F0F2]">
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <span className="text-[#0071E3] uppercase">{q.subjectId}</span>
                          <span className="text-[#D2D2D7]">·</span>
                          <span className="text-[#86868B]">{q.topic}</span>
                          <span className="text-[#D2D2D7]">·</span>
                          <span className="text-[#1D1D1F] tabular-numbers font-bold">
                            Soru {q.id}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {isCorrect && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Doğru
                            </span>
                          )}
                          {!isEmpty && !isCorrect && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
                              <XCircle className="w-3.5 h-3.5" /> Yanlış
                            </span>
                          )}
                          {isEmpty && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F5F5F7] text-[#86868B] border border-[#E5E5EA]">
                              Boş Bırakıldı
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Context */}
                      {q.context && (
                        <div className="mb-4 p-3.5 bg-[#FBFBFD] border-l-2 border-[#0071E3] rounded-r-lg text-xs sm:text-sm text-[#3A3A3C] italic leading-relaxed">
                          <LatexRenderer content={q.context} />
                        </div>
                      )}

                      {/* Question Stem */}
                      <div className="text-base font-semibold text-[#1D1D1F] mb-4 leading-relaxed whitespace-pre-line">
                        <LatexRenderer content={q.question} isBlock={true} />
                      </div>

                      {/* Options Overview */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-xs">
                        {q.options.map((opt, oIdx) => {
                          const isCorrectAnswer = oIdx === q.correctAnswer;
                          const isUserChoice = u === oIdx;

                          let rowClass = 'bg-[#FBFBFD] border-[#E5E5EA] text-[#555]';
                          if (isCorrectAnswer) {
                            rowClass = 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-semibold';
                          } else if (isUserChoice && !isCorrect) {
                            rowClass = 'bg-red-50/70 border-red-300 text-red-900 line-through';
                          }

                          return (
                            <div
                              key={oIdx}
                              className={`flex items-center gap-2 p-2 rounded-xl border ${rowClass}`}
                            >
                              <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] bg-white border border-current shrink-0">
                                {optionLetters[oIdx]}
                              </span>
                              <span className="truncate">
                                <LatexRenderer content={opt} />
                              </span>
                              {isCorrectAnswer && (
                                <span className="ml-auto text-[10px] font-bold text-emerald-700">
                                  ✓ Doğru
                                </span>
                              )}
                              {isUserChoice && !isCorrect && (
                                <span className="ml-auto text-[10px] font-bold text-red-600">
                                  ✗ Senin Cevabın
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Detailed Solution Box */}
                      <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm text-[#1E293B]">
                        <div className="flex items-center gap-1.5 font-bold text-[#0071E3] mb-1.5">
                          <Sparkles className="w-4 h-4" />
                          <span>Çözüm ve Açıklama:</span>
                        </div>
                        <p className="leading-relaxed whitespace-pre-line">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
