import React, { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  FileText,
  History,
  Sparkles,
  Trophy,
  RefreshCw,
  Zap,
  Target,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ExamResult } from '../types/exam';
import { GamificationBadges } from './GamificationBadges';

interface HomeViewProps {
  onStartExam: () => void;
  examHistory: ExamResult[];
  onViewPastResult: (result: ExamResult) => void;
  examTitle?: string;
  onRenewQuestions?: () => void;
  onOpenSubjectBank?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartExam,
  examHistory,
  onViewPastResult,
  examTitle = '2026 KPSS Türkiye Geneli Deneme #1',
  onRenewQuestions,
  onOpenSubjectBank,
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'subjects' | 'history' | 'badges'>('subjects');

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 py-10 sm:py-16 max-w-5xl mx-auto">
      {/* Hero Section (Apple Aesthetic) */}
      <div className="text-center max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-linear-to-r from-blue-50 via-indigo-50 to-rose-50 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 text-[#0071E3] dark:text-[#2997FF] border border-blue-200/60 dark:border-blue-800/40 mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span className="font-bold">{examTitle}</span>
          <span className="text-[#86868B] dark:text-[#A1A1A6]">· 120 Soru / 130 Dakika</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-tight mb-5">
          KPSS'ye daha <br className="hidden sm:inline" />
          <span className="bg-linear-to-r from-[#0071E3] via-[#5856D6] to-[#AF52DE] bg-clip-text text-transparent">
            hazır ve özgüvenli gir.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#86868B] dark:text-[#A1A1A6] font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
          ÖSYM soru mantığı ve güncel standartlar temel alınarak hazırlanan, her seferinde yenilenen dinamik soru havuzu ve Apple zarafetinde akıllı KPSS deneme simülatörü.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onStartExam}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-[#0071E3] hover:bg-[#0077ED] active:scale-98 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer ring-4 ring-[#0071E3]/20"
          >
            <span>Deneme Sınavına Başla</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onOpenSubjectBank && (
            <button
              type="button"
              onClick={onOpenSubjectBank}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] bg-white dark:bg-[#1C1C1E] border border-[#D2D2D7] dark:border-white/15 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] hover:border-[#0071E3] dark:hover:border-[#2997FF] rounded-full shadow-2xs transition-all cursor-pointer"
            >
              <Target className="w-4 h-4 text-amber-500" />
              <span>100'lük Branş Bankası</span>
            </button>
          )}

          {onRenewQuestions && (
            <button
              type="button"
              onClick={onRenewQuestions}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] bg-white dark:bg-[#1C1C1E] border border-[#D2D2D7] dark:border-white/15 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-full shadow-2xs transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
              <span>Soruları Yenile</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Stats Row (Apple Widget Style) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-10">
        <div className="bg-white dark:bg-[#161618] p-5 rounded-3xl border border-[#E5E5EA] dark:border-white/10 shadow-xs text-center transition-colors">
          <span className="text-3xl sm:text-4xl font-black text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight block mb-1">
            120
          </span>
          <span className="text-xs font-bold text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-wider">
            Yenilenen Soru
          </span>
        </div>

        <div className="bg-white dark:bg-[#161618] p-5 rounded-3xl border border-[#E5E5EA] dark:border-white/10 shadow-xs text-center transition-colors">
          <span className="text-3xl sm:text-4xl font-black text-[#0071E3] dark:text-[#2997FF] tracking-tight block mb-1">
            130
          </span>
          <span className="text-xs font-bold text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-wider">
            Dakika Süre
          </span>
        </div>

        <div className="bg-white dark:bg-[#161618] p-5 rounded-3xl border border-[#E5E5EA] dark:border-white/10 shadow-xs text-center transition-colors">
          <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight block mb-1">
            4Y = 1D
          </span>
          <span className="text-xs font-bold text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-wider">
            ÖSYM Net Kuralı
          </span>
        </div>

        <div className="bg-white dark:bg-[#161618] p-5 rounded-3xl border border-[#E5E5EA] dark:border-white/10 shadow-xs text-center transition-colors">
          <span className="text-3xl sm:text-4xl font-black text-[#5856D6] dark:text-[#AF52DE] tracking-tight block mb-1">
            P3
          </span>
          <span className="text-xs font-bold text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-wider">
            Puan Simülatörü
          </span>
        </div>
      </div>

      {/* Interactive Tabs (Apple Segmented Control Style) */}
      <div className="w-full bg-white dark:bg-[#161618] rounded-3xl border border-[#E5E5EA] dark:border-white/10 shadow-xs overflow-hidden transition-colors">
        {/* Tab Header with Cupertino Pill Navigation */}
        <div className="p-3 border-b border-[#E5E5EA] dark:border-white/10 bg-[#F9F9FB] dark:bg-[#1C1C1E] flex gap-1.5 overflow-x-auto">
          {[
            { id: 'subjects', label: 'Soru Dağılımı (120 Soru)', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'rules', label: 'ÖSYM Sınav Kuralları', icon: <FileText className="w-4 h-4" /> },
            { id: 'history', label: `Geçmiş Denemelerim (${examHistory.length})`, icon: <History className="w-4 h-4" /> },
            { id: 'badges', label: 'Rozetler & Başarımlar', icon: <Trophy className="w-4 h-4 text-amber-500" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-2xl transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-[#2C2C2E] text-[#0071E3] dark:text-[#2997FF] shadow-xs'
                    : 'text-[#86868B] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8">
          {activeTab === 'subjects' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Genel Yetenek */}
                <div className="p-5 rounded-2xl bg-[#FBFBFD] dark:bg-[#1E1E22] border border-[#E5E5EA] dark:border-white/10">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E5E5EA] dark:border-white/10">
                    <span className="text-xs font-black text-[#1D1D1F] dark:text-[#F5F5F7] uppercase tracking-wider">
                      Genel Yetenek Testi
                    </span>
                    <span className="text-xs font-bold text-[#0071E3] dark:text-[#2997FF]">60 Soru</span>
                  </div>
                  <ul className="space-y-3 text-sm text-[#1D1D1F] dark:text-[#F5F5F7]">
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
                        Türkçe (Anlam Bilgisi, Dil Bilgisi, Sözel Mantık)
                      </span>
                      <strong className="text-xs font-bold text-[#86868B]">30 Soru</strong>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#5856D6]" />
                        Matematik & Geometri (Temel Kavramlar, Problemler, Mantık)
                      </span>
                      <strong className="text-xs font-bold text-[#86868B]">30 Soru</strong>
                    </li>
                  </ul>
                </div>

                {/* Genel Kültür */}
                <div className="p-5 rounded-2xl bg-[#FBFBFD] dark:bg-[#1E1E22] border border-[#E5E5EA] dark:border-white/10">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E5E5EA] dark:border-white/10">
                    <span className="text-xs font-black text-[#1D1D1F] dark:text-[#F5F5F7] uppercase tracking-wider">
                      Genel Kültür Testi
                    </span>
                    <span className="text-xs font-bold text-[#AF52DE]">60 Soru</span>
                  </div>
                  <ul className="space-y-3 text-sm text-[#1D1D1F] dark:text-[#F5F5F7]">
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#AF52DE]" />
                        Tarih (Selçuklu, Osmanlı, İnkılap Tarihi, Çağdaş)
                      </span>
                      <strong className="text-xs font-bold text-[#86868B]">27 Soru</strong>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#34C759]" />
                        Türkiye Coğrafyası (Fiziki, Beşeri, Ekonomik)
                      </span>
                      <strong className="text-xs font-bold text-[#86868B]">18 Soru</strong>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FF9500]" />
                        Vatandaşlık & Anayasa Hukuku
                      </span>
                      <strong className="text-xs font-bold text-[#86868B]">9 Soru</strong>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FF2D55]" />
                        Güncel Bilgiler & Genel Kültür Olayları
                      </span>
                      <strong className="text-xs font-bold text-[#86868B]">6 Soru</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4 text-xs sm:text-sm text-[#3A3A3C] dark:text-[#D1D1D6] leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#FBFBFD] dark:bg-[#1E1E22] border border-[#E5E5EA] dark:border-white/10 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Sınav Süresi: 130 Dakika (7800 Saniye)</span>
                </div>
                <p className="text-xs text-[#86868B] dark:text-[#A1A1A6]">
                  Sınav süreniz başladığı anda üst barda sayaç geri sayıma başlar. Süre tamamlandığında sınavınız otomatik olarak sonlandırılır.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FBFBFD] dark:bg-[#1E1E22] border border-[#E5E5EA] dark:border-white/10 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>ÖSYM 4 Yanlış 1 Doğru Kuralı</span>
                </div>
                <p className="text-xs text-[#86868B] dark:text-[#A1A1A6]">
                  Her testte adayın doğru cevap sayısından yanlış cevap sayısının 1/4\'ü çıkarılarak adayın ilgili testten aldığı ham puan (net) hesaplanır.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              {examHistory.length === 0 ? (
                <div className="text-center py-12 text-[#86868B] dark:text-[#A1A1A6]">
                  <History className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-semibold">Henüz tamamlanmış bir denemeniz bulunmuyor.</p>
                  <p className="text-xs mt-1">İlk denemenizi çözdüğünüzde sonuçlarınız burada arşivlenecektir.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {examHistory.map((hist, i) => (
                    <div
                      key={hist.id || i}
                      className="p-4 rounded-2xl border border-[#E5E5EA] dark:border-white/10 bg-[#FBFBFD] dark:bg-[#1E1E22] flex items-center justify-between flex-wrap gap-3 hover:border-[#0071E3] transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#0071E3] dark:text-[#2997FF]">Deneme #{examHistory.length - i}</span>
                          <span className="text-xs text-[#86868B]">{hist.date}</span>
                        </div>
                        <div className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mt-1">
                          Net: <strong className="text-[#0071E3] dark:text-[#2997FF]">{hist.totalNet}</strong> · P3: <strong>{hist.estimatedP3Score}</strong>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onViewPastResult(hist)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-[#0071E3] dark:text-[#2997FF] bg-[#0071E3]/10 hover:bg-[#0071E3]/20 rounded-xl transition-colors cursor-pointer"
                      >
                        Karnesini Gör
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="text-center py-6">
              <p className="text-xs text-[#86868B] dark:text-[#A1A1A6] mb-4">
                Denemeleri tamamladıkça kilitleri açılan Apple tarzı başarı nişanlarınız sınav sonucunuzda listelenir.
              </p>
              {examHistory.length > 0 ? (
                <GamificationBadges result={examHistory[0]} questions={[]} history={examHistory} />
              ) : (
                <div className="p-8 rounded-2xl bg-[#FBFBFD] dark:bg-[#1E1E22] border border-[#E5E5EA] dark:border-white/10">
                  <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-2 opacity-60" />
                  <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">Rozetler Sınav Tamamlandığında Açılır</h4>
                  <p className="text-xs text-[#86868B] mt-1">İlk denemenizi çözdüğünüzde Gece Kuşu, Hız Ustası ve Şampiyon rozetleri değerlendirilir.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
