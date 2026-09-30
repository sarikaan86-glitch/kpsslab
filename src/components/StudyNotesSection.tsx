import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Copy,
  Flame,
  Lightbulb,
  Printer,
  Sparkles,
  Target,
  AlertTriangle,
  RotateCcw,
  Check,
} from 'lucide-react';
import { PersonalizedStudyGuide, WeakTopicAnalysis } from '../utils/studyGuideGenerator';
import { useAchievementToast } from '../context/ToastContext';

interface StudyNotesSectionProps {
  studyGuide: PersonalizedStudyGuide;
  onRetakeMistakes: () => void;
  wrongQuestionCount: number;
}

export const StudyNotesSection: React.FC<StudyNotesSectionProps> = ({
  studyGuide,
  onRetakeMistakes,
  wrongQuestionCount,
}) => {
  const { triggerToast } = useAchievementToast();
  const [activeTab, setActiveTab] = useState<'topics' | 'notes' | 'plan'>('topics');
  const [selectedTopic, setSelectedTopic] = useState<WeakTopicAnalysis | null>(
    studyGuide.weakTopics[0] || null
  );
  const [copied, setCopied] = useState(false);

  const handleCopyNotes = () => {
    let text = `📋 KPSS KİŞİSEL ÇALIŞMA NOTU VE EKSİK ANALİZİ (${studyGuide.examDate})\n`;
    text += `Tahmini P3: ${studyGuide.estimatedP3} · Toplam Net: ${studyGuide.totalNet}\n\n`;
    text += `🎯 ÖNCELİKLİ ÇALIŞILMASI GEREKEN KONULAR:\n`;
    studyGuide.weakTopics.slice(0, 6).forEach((t, i) => {
      text += `${i + 1}. [${t.subjectName}] ${t.topic} (${t.wrongCount} Yanlış, ${t.emptyCount} Boş) - Öncelik: ${t.priority}\n`;
      text += `   • Püf Noktası: ${t.osymTips}\n`;
      text += `   • Eylem: ${t.recommendedAction}\n\n`;
    });
    text += `📅 7 GÜNLÜK ÇALIŞMA PLANI:\n`;
    studyGuide.studyPlan.forEach((p) => {
      text += `• ${p.day}: ${p.focusTopic} -> ${p.action} (Hedef: ${p.targetQuestions} Soru)\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    triggerToast({
      badgeTag: 'APPLE NOTLAR',
      title: 'Çalışma Notları Kopyalandı',
      subtitle: 'Not panosuna kopyalandı; Apple Notlar veya defterinize yapıştırabilirsiniz.',
      icon: '📝',
      durationMs: 3500,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-[#161618] rounded-3xl border border-[#E5E5EA] dark:border-white/10 shadow-sm overflow-hidden transition-colors">
      {/* Apple Notes Style Header Banner */}
      <div className="bg-linear-to-r from-amber-50 via-amber-100/60 to-yellow-50 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-stone-900/40 p-6 border-b border-amber-200/80 dark:border-amber-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 dark:bg-amber-500 text-neutral-900 flex items-center justify-center font-bold text-2xl shadow-md ring-2 ring-white/50 dark:ring-white/10 shrink-0">
            📝
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Apple Notlar Biçiminde Kişisel Rapor
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/70 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200">
                {studyGuide.weakTopics.length} Konu Tespit Edildi
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight mt-0.5">
              Kişiselleştirilmiş Çalışma Notu & Konu Telafi Rehberi
            </h3>
            <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] mt-0.5">
              Bu denemede yanlış yaptığınız ve boş bıraktığınız sorular yapay zeka mantığıyla analiz edilerek kritik konular belirlendi.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          {wrongQuestionCount > 0 && (
            <button
              type="button"
              onClick={onRetakeMistakes}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Yanlışları Tekrar Çöz ({wrongQuestionCount})</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyNotes}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-white dark:bg-[#2C2C2E] border border-amber-300 dark:border-white/10 hover:bg-amber-50 dark:hover:bg-[#3A3A3C] rounded-xl shadow-2xs transition-colors cursor-pointer"
            title="Metin Olarak Kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />}
            <span>{copied ? 'Kopyalandı' : 'Notları Kopyala'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-white dark:bg-[#2C2C2E] border border-amber-300 dark:border-white/10 hover:bg-amber-50 dark:hover:bg-[#3A3A3C] rounded-xl shadow-2xs transition-colors cursor-pointer"
            title="Yazdır veya PDF Kaydet"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Yazdır</span>
          </button>
        </div>
      </div>

      {/* Segmented Control Navigation */}
      <div className="px-6 pt-5 pb-3 border-b border-[#F0F0F2] dark:border-white/10 flex items-center justify-between flex-wrap gap-3">
        <div className="inline-flex p-1 bg-[#F2F2F7] dark:bg-[#2C2C2E] rounded-2xl border border-[#E5E5EA] dark:border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('topics')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'topics'
                ? 'bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] shadow-xs'
                : 'text-[#86868B] dark:text-[#A1A1A6] hover:text-[#1D1D1F]'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>Öncelikli Konu Eksikleri ({studyGuide.weakTopics.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] shadow-xs'
                : 'text-[#86868B] dark:text-[#A1A1A6] hover:text-[#1D1D1F]'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Kritik Püf Noktaları & Notlar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('plan')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'plan'
                ? 'bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] shadow-xs'
                : 'text-[#86868B] dark:text-[#A1A1A6] hover:text-[#1D1D1F]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-500" />
            <span>7 Günlük Telafi Programı</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Öncelikli Konu Eksikleri */}
      {activeTab === 'topics' && (
        <div className="p-6">
          {studyGuide.weakTopics.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Muazzam Başarı! Tespit Edilen Eksik Konu Yok
              </h4>
              <p className="text-xs text-[#86868B] max-w-md mx-auto mt-1">
                Tüm soruları doğru yanıtladınız veya belirgin bir zayıf konu bulunamadı. Formunuzu korumak için karma denemeler çözmeye devam edin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studyGuide.weakTopics.map((item, idx) => {
                const priorityBadge = {
                  CRITICAL: { label: 'KRİTİK ÖNCELİK', color: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800' },
                  HIGH: { label: 'YÜKSEK ÖNCELİK', color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' },
                  MEDIUM: { label: 'ORTA ÖNCELİK', color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800' },
                }[item.priority];

                return (
                  <motion.div
                    key={`${item.subjectId}-${item.topic}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="p-4 rounded-2xl border border-[#E5E5EA] dark:border-white/10 bg-[#FAFAFC] dark:bg-[#1E1E22] flex flex-col justify-between hover:border-[#0071E3]/50 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF]">
                          {item.subjectName}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${priorityBadge.color}`}>
                          {priorityBadge.label}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                        {item.topic}
                      </h4>

                      <div className="flex items-center gap-3 text-xs text-[#86868B] dark:text-[#A1A1A6] mt-2 mb-3">
                        <span className="text-rose-600 dark:text-rose-400 font-semibold">
                          {item.wrongCount} Yanlış
                        </span>
                        {item.emptyCount > 0 && (
                          <span>· {item.emptyCount} Boş</span>
                        )}
                        <span>· Sorular: #{item.questionIds.join(', #')}</span>
                      </div>

                      <p className="text-xs text-[#3A3A3C] dark:text-[#D1D1D6] leading-relaxed bg-white dark:bg-[#161618] p-3 rounded-xl border border-[#E5E5EA] dark:border-white/10">
                        <strong className="text-amber-600 dark:text-amber-400 font-bold block mb-1">
                          💡 ÖSYM İpucu:
                        </strong>
                        {item.osymTips}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E5E5EA] dark:border-white/10 flex items-center justify-between text-xs font-semibold text-[#0071E3] dark:text-[#2997FF]">
                      <span className="truncate pr-2">{item.recommendedAction}</span>
                      <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Kritik Püf Noktaları & Notlar (Apple Notes Paper View) */}
      {activeTab === 'notes' && (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Topic Selector List */}
          <div className="lg:col-span-4 flex flex-col gap-1.5 max-h-[500px] overflow-y-auto pr-1">
            <span className="text-xs font-bold text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-wider mb-1 px-1">
              Konu Notları Seçin
            </span>
            {studyGuide.weakTopics.map((topic) => {
              const isSelected = selectedTopic?.topic === topic.topic;
              return (
                <button
                  key={`${topic.subjectId}-${topic.topic}`}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-[#1D1D1F] dark:text-[#F5F5F7] shadow-xs'
                      : 'bg-white dark:bg-[#1E1E22] border-[#E5E5EA] dark:border-white/10 text-[#6E6E73] dark:text-[#A1A1A6] hover:bg-[#F5F5F7] dark:hover:bg-[#28282C]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold text-[#0071E3] uppercase">{topic.subjectName}</span>
                    <span className="text-[10px] font-semibold text-rose-600">{topic.wrongCount} Yanlış</span>
                  </div>
                  <div className="text-xs font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mt-0.5 truncate">
                    {topic.topic}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Apple Note Card */}
          <div className="lg:col-span-8 bg-[#FFFDF5] dark:bg-[#1A1813] border border-amber-200 dark:border-amber-800/50 rounded-2xl p-6 sm:p-7 shadow-xs">
            {selectedTopic ? (
              <div>
                <div className="flex items-center justify-between border-b border-amber-200/70 dark:border-amber-800/40 pb-3 mb-4">
                  <div>
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      {selectedTopic.subjectName} Özel Çalışma Notu
                    </span>
                    <h3 className="text-xl font-black text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                      {selectedTopic.topic}
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200">
                    ÖSYM Soru Bankası Uyarısı
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#86868B] dark:text-[#A1A1A6] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Kritik Hatırlatma ve Formül Notları
                    </h5>
                    <ul className="space-y-2">
                      {selectedTopic.keyNotes.map((note, nIdx) => (
                        <li
                          key={nIdx}
                          className="flex items-start gap-2 text-sm text-[#3A3A3C] dark:text-[#D1D1D6] leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl border border-amber-200/80 dark:border-amber-800/40">
                    <h5 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      ÖSYM Çeldirici Tuzağı
                    </h5>
                    <p className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
                      {selectedTopic.osymTips}
                    </p>
                  </div>

                  <div className="pt-2">
                    <h5 className="text-xs font-bold text-[#1D1D1F] dark:text-[#F5F5F7] uppercase tracking-wider mb-1">
                      Tavsiye Edilen Telafi Adımı:
                    </h5>
                    <p className="text-xs text-[#0071E3] dark:text-[#2997FF] font-semibold">
                      {selectedTopic.recommendedAction}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-[#86868B]">
                İncelemek istediğiniz konuyu soldaki listeden seçin.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: 7 Günlük Telafi Programı */}
      {activeTab === 'plan' && (
        <div className="p-6">
          <div className="mb-4">
            <h4 className="text-base font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
              Kişiselleştirilmiş 7 Günlük KPSS Çalışma Kampı
            </h4>
            <p className="text-xs text-[#86868B] dark:text-[#A1A1A6] mt-0.5">
              Bu denemedeki net kaybına neden olan konuları 1 haftada telafi etmeniz için optimize edilmiş ders programı.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {studyGuide.studyPlan.map((planItem, idx) => (
              <div
                key={planItem.day}
                className="p-4 rounded-2xl border border-[#E5E5EA] dark:border-white/10 bg-white dark:bg-[#1E1E22] shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#0071E3]/10 text-[#0071E3] dark:text-[#2997FF]">
                      {planItem.day}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      🎯 {planItem.targetQuestions} Soru
                    </span>
                  </div>

                  <h5 className="text-sm font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                    {planItem.focusTopic}
                  </h5>

                  <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] mt-2 leading-relaxed">
                    {planItem.action}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0F0F2] dark:border-white/10 flex items-center gap-1.5 text-[11px] text-[#86868B] dark:text-[#A1A1A6]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Hedef: %85+ İsabet</span>
                </div>
              </div>
            ))}
          </div>

          {/* General Advice Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#1E1E22] border border-[#E5E5EA] dark:border-white/10">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F] dark:text-[#F5F5F7] mb-2 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" />
              KPSS Sınav Stratejisti Tavsiyeleri
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-[#3A3A3C] dark:text-[#D1D1D6]">
              {studyGuide.generalAdvice.map((adv, aIdx) => (
                <div key={aIdx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] mt-1.5 shrink-0" />
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
