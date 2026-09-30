import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Clock,
  Zap,
  Target,
  BookOpen,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { ExamResult, Question, SubjectId } from '../types/exam';
import { SUBJECTS, formatDuration } from '../utils/kpssScoring';

interface QuestionAnalyticsProps {
  result: ExamResult;
  questions: Question[];
  onFilterTopicQuestions?: (topic: string) => void;
}

interface TopicStat {
  subjectId: SubjectId;
  topic: string;
  total: number;
  correct: number;
  wrong: number;
  empty: number;
  net: number;
  accuracy: number;
}

export const QuestionAnalytics: React.FC<QuestionAnalyticsProps> = ({
  result,
  questions,
  onFilterTopicQuestions,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'accuracy' | 'net' | 'wrong'>('wrong');

  // Compute topic stats
  const topicMap: Record<string, TopicStat> = {};

  questions.forEach((q) => {
    const key = `${q.subjectId}__${q.topic}`;
    if (!topicMap[key]) {
      topicMap[key] = {
        subjectId: q.subjectId,
        topic: q.topic,
        total: 0,
        correct: 0,
        wrong: 0,
        empty: 0,
        net: 0,
        accuracy: 0,
      };
    }

    const t = topicMap[key];
    t.total++;
    const userAns = result.answers[q.id];
    if (userAns === null || userAns === undefined) {
      t.empty++;
    } else if (userAns === q.correctAnswer) {
      t.correct++;
    } else {
      t.wrong++;
    }
  });

  // Calculate nets and accuracy
  const allTopicStats: TopicStat[] = Object.values(topicMap).map((t) => {
    const net = t.correct - t.wrong * 0.25;
    const answered = t.correct + t.wrong;
    const accuracy = answered > 0 ? (t.correct / answered) * 100 : 0;
    return {
      ...t,
      net,
      accuracy,
    };
  });

  // Filtered topics
  const filteredTopics = allTopicStats
    .filter((t) => selectedSubject === 'ALL' || t.subjectId === selectedSubject)
    .sort((a, b) => {
      if (sortBy === 'wrong') return b.wrong - a.wrong;
      if (sortBy === 'net') return a.net - b.net;
      return a.accuracy - b.accuracy;
    });

  // Top Strengths (topics with highest accuracy & net)
  const strongTopics = [...allTopicStats]
    .filter((t) => t.total >= 2 && t.accuracy >= 75)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 3);

  // Critical Weaknesses (topics with highest wrong count or lowest accuracy)
  const weakTopics = [...allTopicStats]
    .filter((t) => t.wrong >= 1 || (t.total >= 2 && t.accuracy < 60))
    .sort((a, b) => b.wrong - a.wrong)
    .slice(0, 3);

  // Time & Pace metrics
  const avgSecondsPerQuestion = Math.round(result.elapsedSeconds / Math.max(1, 120 - result.totalEmpty));
  const targetAvgSeconds = 65; // KPSS standard 130 min / 120 questions = 65 sec
  const paceRating =
    avgSecondsPerQuestion <= 55
      ? { label: 'Oldukça Hızlı', color: 'text-amber-600', advice: 'Soru başına süreniz hızlı; çeldiricilere dikkat ederek soru köklerini daha dikkatli okuyabilirsiniz.' }
      : avgSecondsPerQuestion <= 70
      ? { label: 'İdeal ÖSYM Temposu', color: 'text-emerald-600', advice: 'Mükemmel zaman yönetimi. Her soruya ayrılan süre sınav standardında.' }
      : { label: 'Biraz Yavaş', color: 'text-rose-600', advice: 'Özellikle Matematik ve Paragraf sorularında hızlanmak için pratik yapmalısınız.' };

  // 4 Wrong = 1 Correct Penalty
  const netLostToPenalty = (result.totalWrong * 0.25).toFixed(2);
  const potentialNetIfAvoidedWildGuessing = (
    result.totalNet +
    Math.min(result.totalWrong * 0.25, 3.5)
  ).toFixed(2);

  return (
    <div className="flex flex-col gap-6">
      {/* 3-Column Diagnostic Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Strong Topics */}
        <div className="bg-white p-5 rounded-3xl border border-emerald-200/80 bg-linear-to-b from-emerald-50/30 to-white shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>En Güçlü Konular</span>
          </div>
          <div className="flex flex-col gap-2">
            {strongTopics.length > 0 ? (
              strongTopics.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E5E5EA] shadow-2xs"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-xs font-bold text-[#1D1D1F] truncate">{t.topic}</span>
                    <span className="text-[10px] text-[#86868B]">{t.subjectId}</span>
                  </div>
                  <span className="text-xs font-black text-emerald-600 tabular-numbers shrink-0">
                    %{Math.round(t.accuracy)}
                  </span>
                </div>
              ))
            ) : (
              <span className="text-xs text-[#86868B] italic py-2">Daha fazla deneme çözerek güçlü konularınızı belirleyin.</span>
            )}
          </div>
        </div>

        {/* Weak Topics / Deficits */}
        <div className="bg-white p-5 rounded-3xl border border-rose-200/80 bg-linear-to-b from-rose-50/30 to-white shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider mb-3">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Geliştirilecek Konular</span>
          </div>
          <div className="flex flex-col gap-2">
            {weakTopics.length > 0 ? (
              weakTopics.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E5E5EA] shadow-2xs"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-xs font-bold text-[#1D1D1F] truncate">{t.topic}</span>
                    <span className="text-[10px] text-rose-600 font-semibold">{t.wrong} Yanlış</span>
                  </div>
                  <span className="text-xs font-black text-rose-600 tabular-numbers shrink-0">
                    {t.net.toFixed(1)} Net
                  </span>
                </div>
              ))
            ) : (
              <span className="text-xs text-[#86868B] italic py-2">Tebrikler! Belirgin bir hata odağı bulunamadı.</span>
            )}
          </div>
        </div>

        {/* Pace & Penalty Intelligence */}
        <div className="bg-white p-5 rounded-3xl border border-blue-200/80 bg-linear-to-b from-blue-50/30 to-white shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0071E3] uppercase tracking-wider mb-3">
              <Clock className="w-4 h-4 text-[#0071E3]" />
              <span>Süre & Hız Stratejisi</span>
            </div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs text-[#86868B]">Soru Başına Süre:</span>
              <span className="text-lg font-black text-[#1D1D1F] tabular-numbers">
                {avgSecondsPerQuestion} sn <span className="text-xs font-normal text-[#86868B]">/ 65 sn hedef</span>
              </span>
            </div>
            <div className={`text-xs font-bold ${paceRating.color} mb-2`}>
              {paceRating.label}
            </div>
            <p className="text-[11px] text-[#3A3A3C] leading-relaxed mb-3">
              {paceRating.advice}
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0F0F2] flex items-center justify-between text-xs">
            <span className="text-[#86868B]">4 Yanlış 1 Doğru Kaybı:</span>
            <span className="font-extrabold text-red-500 tabular-numbers">
              -{netLostToPenalty} Net
            </span>
          </div>
        </div>
      </div>

      {/* Comprehensive Topic Performance Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E5EA] shadow-xs">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">
              Tüm Konuların Detaylı Analizi
            </h3>
            <p className="text-xs text-[#86868B] mt-0.5">
              Hangi konuda kaç doğru, yanlış ve net yaptığınızı adım adım inceleyin.
            </p>
          </div>

          {/* Subject Pills */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#F5F5F7] rounded-xl border border-[#E5E5EA]">
            <button
              type="button"
              onClick={() => setSelectedSubject('ALL')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedSubject === 'ALL'
                  ? 'bg-white text-[#1D1D1F] shadow-xs'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              Tümü
            </button>
            {SUBJECTS.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSubject(sub.id)}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedSubject === sub.id
                    ? 'bg-white text-[#1D1D1F] shadow-xs'
                    : 'text-[#86868B] hover:text-[#1D1D1F]'
                }`}
              >
                {sub.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Topics List Table */}
        <div className="flex flex-col gap-2.5">
          {filteredTopics.map((topic, i) => {
            const isHigh = topic.accuracy >= 75;
            const isMid = topic.accuracy >= 50 && topic.accuracy < 75;
            const statusColor = isHigh
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
              : isMid
              ? 'text-amber-700 bg-amber-50 border-amber-200'
              : 'text-rose-700 bg-rose-50 border-rose-200';

            const statusText = isHigh ? 'Ustalaşıldı' : isMid ? 'Geliştirilmeli' : 'Kritik Eksik';

            return (
              <motion.div
                key={`${topic.subjectId}-${topic.topic}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: i * 0.02 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-[#E5E5EA] hover:border-[#D2D2D7] bg-[#FAFAFC] hover:bg-white transition-all gap-3"
              >
                {/* Topic Info */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#86868B] uppercase w-16 shrink-0">
                    {topic.subjectId}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#1D1D1F]">{topic.topic}</h4>
                    <span className="text-[11px] text-[#86868B]">
                      {topic.total} Soru · {topic.correct} Doğru · {topic.wrong} Yanlış · {topic.empty} Boş
                    </span>
                  </div>
                </div>

                {/* Accuracy bar & Net badge */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-[#E5E5EA] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isHigh ? 'bg-emerald-500' : isMid ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.round(topic.accuracy)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-[#1D1D1F] tabular-numbers w-10 text-right">
                      %{Math.round(topic.accuracy)}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusColor} shrink-0`}
                  >
                    {statusText}
                  </span>

                  <div className="text-right shrink-0 w-16">
                    <span className="text-sm font-extrabold text-[#0071E3] tabular-numbers block">
                      {topic.net.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-[#86868B] block">NET</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
