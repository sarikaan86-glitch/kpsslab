import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Award, Star, Flame, Sparkles, Shield, Check, Lock, Clock, Calendar, Zap, Filter, Compass, BookOpen, Target } from 'lucide-react';
import { ExamResult, Question } from '../types/exam';
import { useAchievementToast } from '../context/ToastContext';

interface GamificationBadgesProps {
  result: ExamResult;
  questions: Question[];
  history?: ExamResult[];
}

export type BadgeCategory = 'all' | 'unlocked' | 'continuity' | 'performance' | 'subject';

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: 'continuity' | 'performance' | 'subject';
  icon: string;
  color: string;
  bgGrad: string;
  unlocked: boolean;
  progress: number; // 0 to 100
  criteria: string;
  detailHint?: string;
}

export const GamificationBadges: React.FC<GamificationBadgesProps> = ({
  result,
  questions,
  history = [],
}) => {
  const { triggerToast } = useAchievementToast();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [activeCategory, setActiveCategory] = useState<BadgeCategory>('all');

  // Compute longest consecutive correct streak in current exam
  let maxStreak = 0;
  let currentStreak = 0;
  questions.forEach((q) => {
    const userAns = result.answers[q.id];
    if (userAns === q.correctAnswer) {
      currentStreak++;
      if (currentStreak > maxStreak) maxStreak = currentStreak;
    } else {
      currentStreak = 0;
    }
  });

  // Combine current exam and history
  const allExams: ExamResult[] = [
    result,
    ...history.filter((h) => h.id !== result.id),
  ];
  const totalExamsCount = allExams.length;

  // Previous exam for net leap comparison
  const prevExam = history.find((h) => h.id !== result.id);
  const netDiff = prevExam ? Number((result.totalNet - prevExam.totalNet).toFixed(2)) : 0;

  // Time & Routine checks (check current exam and all historical exams)
  const isNightHour = (ts?: number) => {
    const d = new Date(ts || Date.now());
    const hour = d.getHours();
    return hour >= 23 || hour < 5;
  };

  const isEarlyHour = (ts?: number) => {
    const d = new Date(ts || Date.now());
    const hour = d.getHours();
    const min = d.getMinutes();
    return (hour >= 6 && hour < 9) || (hour === 9 && min <= 30);
  };

  const isWeekendDay = (ts?: number) => {
    const d = new Date(ts || Date.now());
    const day = d.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  const isOsymClock = (ts?: number) => {
    const d = new Date(ts || Date.now());
    const hour = d.getHours();
    const min = d.getMinutes();
    return (hour === 10 && min >= 15) || hour === 11 || (hour === 12 && min <= 30);
  };

  const hasNightOwl = allExams.some((e) => isNightHour(e.timestamp));
  const hasEarlyBird = allExams.some((e) => isEarlyHour(e.timestamp));
  const hasWeekend = allExams.some((e) => isWeekendDay(e.timestamp));
  const hasOsymClock = allExams.some((e) => isOsymClock(e.timestamp));

  // Count unique days solved
  const uniqueDates = new Set(
    allExams.map((e) => {
      const d = new Date(e.timestamp || Date.now());
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    })
  );
  const uniqueDaysCount = uniqueDates.size;

  // Check subject specific 0-wrong achievements in current exam
  const hasZeroWrongSubject = Object.values(result.subjectStats).some(
    (stat) => stat.total >= 6 && stat.wrong === 0 && stat.correct >= 5
  );

  const accuracy = (result.totalCorrect / Math.max(1, result.totalCorrect + result.totalWrong)) * 100;

  // Comprehensive Gamification Badge Catalog
  const badges: Badge[] = [
    // --- 1. DEVAMLILIK & ALIŞKANLIK ROZETLERİ ---
    {
      id: 'ten_exams_master',
      title: '10 Deneme Efsanesi',
      description: 'Disiplin ve sürekliliğin simgesi: Toplamda 10 tam KPSS denemesini başarıyla tamamladınız.',
      category: 'continuity',
      icon: '🔟',
      color: '#FF9500',
      bgGrad: 'from-amber-400 via-orange-500 to-rose-500',
      unlocked: totalExamsCount >= 10,
      progress: Math.min(100, (totalExamsCount / 10) * 100),
      criteria: '10 Tam Deneme Çözümü',
      detailHint: `${totalExamsCount} / 10 Deneme tamamlandı`,
    },
    {
      id: 'five_exams_streak',
      title: '5 Deneme Serisi',
      description: 'KPSS maratonunda tempoyu yakaladınız: 5 denemeyi tamamlayarak çalışma alışkanlığınızı sabitlediniz.',
      category: 'continuity',
      icon: '🎖️',
      color: '#0071E3',
      bgGrad: 'from-blue-500 to-indigo-600',
      unlocked: totalExamsCount >= 5,
      progress: Math.min(100, (totalExamsCount / 5) * 100),
      criteria: '5 Tam Deneme Çözümü',
      detailHint: `${totalExamsCount} / 5 Deneme tamamlandı`,
    },
    {
      id: 'first_step',
      title: 'İlk Adım',
      description: 'Atama yolculuğu ilk denemeyle başlar: 120 soruluk ilk simülasyonu başarıyla bitirdiniz.',
      category: 'continuity',
      icon: '🚀',
      color: '#34C759',
      bgGrad: 'from-emerald-400 to-teal-600',
      unlocked: totalExamsCount >= 1,
      progress: 100,
      criteria: 'İlk Denemeyi Tamamla',
      detailHint: 'Tamamlandı',
    },
    {
      id: 'night_owl',
      title: 'Gece Kuşu',
      description: 'Herkes uyurken hedefe odaklanmak: Gece 23:00 ile 05:00 arasında bir deneme seansını tamamladınız.',
      category: 'continuity',
      icon: '🦉',
      color: '#5856D6',
      bgGrad: 'from-purple-600 via-indigo-700 to-slate-900',
      unlocked: hasNightOwl,
      progress: hasNightOwl ? 100 : 0,
      criteria: '23:00 - 05:00 Gece Seansı',
      detailHint: hasNightOwl ? 'Gece çalışması kaydedildi' : 'Gece 23:00 - 05:00 arası bir deneme bitirin',
    },
    {
      id: 'early_bird',
      title: 'Erkenci Kuş',
      description: 'Sabahın dinginliğinde zinde zihin: Sabah 06:00 - 09:30 saatleri arasında deneme tamamladınız.',
      category: 'continuity',
      icon: '🌅',
      color: '#FF9500',
      bgGrad: 'from-amber-400 to-pink-500',
      unlocked: hasEarlyBird,
      progress: hasEarlyBird ? 100 : 0,
      criteria: '06:00 - 09:30 Sabah Seansı',
      detailHint: hasEarlyBird ? 'Sabah çalışması kaydedildi' : 'Sabah 06:00 - 09:30 arası bir deneme bitirin',
    },
    {
      id: 'weekend_warrior',
      title: 'Hafta Sonu Fedaisi',
      description: 'Tatil günlerini fırsata çeviren azim: Cumartesi veya Pazar günü tam bir KPSS denemesi çözdünüz.',
      category: 'continuity',
      icon: '⚔️',
      color: '#FF2D55',
      bgGrad: 'from-rose-500 to-red-600',
      unlocked: hasWeekend,
      progress: hasWeekend ? 100 : 0,
      criteria: 'Hafta Sonu Denemesi',
      detailHint: hasWeekend ? 'Hafta sonu denemesi tamamlandı' : 'Cumartesi/Pazar günü bir deneme bitirin',
    },
    {
      id: 'osym_clock',
      title: 'ÖSYM Saati Sadığı',
      description: 'Gerçek sınav biyolojik ritmine uyum: Saat 10:15 - 12:30 arasında deneme çözerek ÖSYM ortamını simüle ettiniz.',
      category: 'continuity',
      icon: '⏰',
      color: '#0071E3',
      bgGrad: 'from-sky-400 to-blue-600',
      unlocked: hasOsymClock,
      progress: hasOsymClock ? 100 : 0,
      criteria: '10:15 - 12:30 Sınav Saati Seansı',
      detailHint: hasOsymClock ? 'Sınav saatinde deneme çözüldü' : '10:15 - 12:30 saatleri arasında bir deneme bitirin',
    },
    {
      id: 'consistency_streak',
      title: 'İstikrar Abidesi',
      description: 'Süreklilik başarıyı getirir: En az 3 farklı günde sisteme girip deneme çözümü gerçekleştirdiniz.',
      category: 'continuity',
      icon: '🗓️',
      color: '#34C759',
      bgGrad: 'from-teal-400 to-emerald-600',
      unlocked: uniqueDaysCount >= 3,
      progress: Math.min(100, (uniqueDaysCount / 3) * 100),
      criteria: '3 Farklı Günde Deneme Çözümü',
      detailHint: `${uniqueDaysCount} / 3 Farklı gün`,
    },

    // --- 2. PERFORMANS, HIZ VE STRATEJİ ROZETLERİ ---
    {
      id: 'net_leap',
      title: 'Net Sıçraması',
      description: 'Gözle görülür sıçrama: Bir önceki denemenize kıyasla netlerinizi en az +5.0 net artırdınız.',
      category: 'performance',
      icon: '📈',
      color: '#34C759',
      bgGrad: 'from-emerald-400 to-green-600',
      unlocked: prevExam !== undefined && netDiff >= 5.0,
      progress: prevExam ? Math.min(100, Math.max(0, (netDiff / 5.0) * 100)) : 0,
      criteria: 'Önceki Denemeye Göre +5.0 Net',
      detailHint: prevExam ? `Net Değişimi: ${netDiff >= 0 ? '+' : ''}${netDiff}` : 'En az 2 deneme gereklidir',
    },
    {
      id: 'p3_master',
      title: 'KPSS Şampiyonu',
      description: 'Tahmini KPSS P3 puanında 85.00 barajını aşarak en üst derece grubuna ulaştınız.',
      category: 'performance',
      icon: '🏆',
      color: '#FF9500',
      bgGrad: 'from-amber-400 to-orange-500',
      unlocked: result.estimatedP3Score >= 85,
      progress: Math.min(100, (result.estimatedP3Score / 85) * 100),
      criteria: '85.00+ P3 Puanı',
      detailHint: `P3 Puanınız: ${result.estimatedP3Score}`,
    },
    {
      id: 'net_titan',
      title: '85+ Net Titanı',
      description: 'Toplam 85 ve üzeri net elde ederek Türkiye genelinde ilk %1’lik dilime aday oldunuz.',
      category: 'performance',
      icon: '👑',
      color: '#FF3B30',
      bgGrad: 'from-red-400 to-rose-600',
      unlocked: result.totalNet >= 85,
      progress: Math.min(100, (result.totalNet / 85) * 100),
      criteria: '85+ Toplam Net',
      detailHint: `Netiniz: ${result.totalNet}`,
    },
    {
      id: 'sharp_shooter',
      title: 'Keskin Nişancı',
      description: 'İşaretlediğiniz sorularda %80 ve üzeri doğruluk oranına ulaşarak çeldiricilere takılmadınız.',
      category: 'performance',
      icon: '🎯',
      color: '#34C759',
      bgGrad: 'from-emerald-400 to-teal-600',
      unlocked: accuracy >= 80,
      progress: Math.min(100, (accuracy / 80) * 100),
      criteria: '%80+ Doğruluk Oranı',
      detailHint: `Doğruluk: %${Math.round(accuracy)}`,
    },
    {
      id: 'speed_demon',
      title: 'Hız Canavarı',
      description: '120 soruluk sınavı 115 dakikanın altında (6900 saniye) tamamlayarak yüksek zaman tasarrufu sağladınız.',
      category: 'performance',
      icon: '⚡',
      color: '#0071E3',
      bgGrad: 'from-blue-400 to-indigo-600',
      unlocked: result.elapsedSeconds <= 6900,
      progress: Math.min(100, Math.max(0, ((7800 - result.elapsedSeconds) / (7800 - 6900)) * 100)),
      criteria: '< 115 Dakika Tamamlama',
      detailHint: `Süre: ${Math.floor(result.elapsedSeconds / 60)} dk`,
    },
    {
      id: 'streak_master',
      title: 'Seri İsabet',
      description: 'Hiç hata yapmadan art arda en az 8 soruyu doğru çözerek seri yakaladınız.',
      category: 'performance',
      icon: '🔥',
      color: '#FF2D55',
      bgGrad: 'from-rose-500 to-pink-600',
      unlocked: maxStreak >= 8,
      progress: Math.min(100, (maxStreak / 8) * 100),
      criteria: '8+ Soru Üst Üste Doğru',
      detailHint: `En Uzun Seri: ${maxStreak} Soru`,
    },
    {
      id: 'tactician',
      title: 'Strateji Dehası',
      description: 'Tereddüt ettiğiniz soruları boş bırakarak yanlış sayısını 12’nin altında tuttunuz ve netlerinizi korudunuz.',
      category: 'performance',
      icon: '🧠',
      color: '#64D2FF',
      bgGrad: 'from-cyan-400 to-blue-500',
      unlocked: result.totalWrong <= 12 && result.totalNet >= 50,
      progress: Math.min(100, Math.max(0, ((25 - result.totalWrong) / 13) * 100)),
      criteria: '≤ 12 Yanlış ile Net Koruma',
      detailHint: `Yanlış Sayınız: ${result.totalWrong}`,
    },
    {
      id: 'marathon_focus',
      title: 'Odak Maratoncusu',
      description: 'Acele etmeden derin odaklanma: 130 dakikalık sürenin en az 90 dakikasını ciddiyetle masada kalarak kullandınız.',
      category: 'performance',
      icon: '🧘',
      color: '#AF52DE',
      bgGrad: 'from-purple-500 to-indigo-600',
      unlocked: result.elapsedSeconds >= 5400,
      progress: Math.min(100, (result.elapsedSeconds / 5400) * 100),
      criteria: '≥ 90 Dakika Sınav Süresi',
      detailHint: `Kullanılan Süre: ${Math.floor(result.elapsedSeconds / 60)} dk`,
    },

    // --- 3. BRANŞ VE DERS HAKİMİYETİ ROZETLERİ ---
    {
      id: 'turkce_virtuoso',
      title: 'Türkçe Virtüözü',
      description: 'Türkçe testinde 24 ve üzeri net yaparak paragraf ve dil bilgisinde üstün başarı gösterdiniz.',
      category: 'subject',
      icon: '📚',
      color: '#0071E3',
      bgGrad: 'from-sky-400 to-blue-600',
      unlocked: (result.subjectStats.TURKCE?.net ?? 0) >= 24,
      progress: Math.min(100, ((result.subjectStats.TURKCE?.net ?? 0) / 24) * 100),
      criteria: '24+ Türkçe Neti',
      detailHint: `Türkçe Netiniz: ${result.subjectStats.TURKCE?.net ?? 0}`,
    },
    {
      id: 'math_prodigy',
      title: 'Matematik Dehası',
      description: 'Sayısal yetenek ve problemlerde 20 ve üzeri nete imza attınız.',
      category: 'subject',
      icon: '📐',
      color: '#5856D6',
      bgGrad: 'from-indigo-400 to-violet-600',
      unlocked: (result.subjectStats.MATEMATIK?.net ?? 0) >= 20,
      progress: Math.min(100, ((result.subjectStats.MATEMATIK?.net ?? 0) / 20) * 100),
      criteria: '20+ Matematik Neti',
      detailHint: `Matematik Netiniz: ${result.subjectStats.MATEMATIK?.net ?? 0}`,
    },
    {
      id: 'history_scholar',
      title: 'Tarih Bilgini',
      description: 'İslamiyet öncesinden Çağdaş Türk ve Dünya tarihine kadar 20 ve üzeri net çıkardınız.',
      category: 'subject',
      icon: '🏛️',
      color: '#AF52DE',
      bgGrad: 'from-purple-400 to-fuchsia-600',
      unlocked: (result.subjectStats.TARIH?.net ?? 0) >= 20,
      progress: Math.min(100, ((result.subjectStats.TARIH?.net ?? 0) / 20) * 100),
      criteria: '20+ Tarih Neti',
      detailHint: `Tarih Netiniz: ${result.subjectStats.TARIH?.net ?? 0}`,
    },
    {
      id: 'geo_explorer',
      title: 'Harita Kaşifi',
      description: 'Türkiye Fiziki, Beşeri ve Ekonomik Coğrafyasında 14 ve üzeri net elde ettiniz.',
      category: 'subject',
      icon: '🌍',
      color: '#30D158',
      bgGrad: 'from-emerald-400 to-green-600',
      unlocked: (result.subjectStats.COGRAFYA?.net ?? 0) >= 14,
      progress: Math.min(100, ((result.subjectStats.COGRAFYA?.net ?? 0) / 14) * 100),
      criteria: '14+ Coğrafya Neti',
      detailHint: `Coğrafya Netiniz: ${result.subjectStats.COGRAFYA?.net ?? 0}`,
    },
    {
      id: 'constitution_jurist',
      title: 'Anayasa Hakimi',
      description: '1982 Anayasası, Yasama, Yürütme ve İdare Hukukunda 7 ve üzeri net yaptınız.',
      category: 'subject',
      icon: '⚖️',
      color: '#FF9500',
      bgGrad: 'from-amber-400 to-yellow-600',
      unlocked: (result.subjectStats.VATANDASLIK?.net ?? 0) >= 7,
      progress: Math.min(100, ((result.subjectStats.VATANDASLIK?.net ?? 0) / 7) * 100),
      criteria: '7+ Vatandaşlık Neti',
      detailHint: `Vatandaşlık Netiniz: ${result.subjectStats.VATANDASLIK?.net ?? 0}`,
    },
    {
      id: 'flawless_branch',
      title: 'Sıfır Hata Kulübü',
      description: 'En az bir KPSS dersinde hiç yanlış yapmadan kusursuz bir karne tamamladınız.',
      category: 'subject',
      icon: '🛡️',
      color: '#34C759',
      bgGrad: 'from-teal-400 to-emerald-600',
      unlocked: hasZeroWrongSubject,
      progress: hasZeroWrongSubject ? 100 : 0,
      criteria: 'Bir Derste 0 Yanlış',
      detailHint: hasZeroWrongSubject ? 'Tebrikler! 0 Yanlış derse ulaşıldı' : 'Herhangi bir derste hiç hata yapmayın',
    },
  ];

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  // Filtered badges based on active category tab
  const filteredBadges = badges.filter((b) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'unlocked') return b.unlocked;
    return b.category === activeCategory;
  });

  // Calculate Cumulative XP points
  // Base current exam XP + 60 XP for every completed exam + 40 XP per unlocked badge
  const currentExamXP = Math.round(
    result.totalNet * 10 +
    result.totalCorrect * 3 -
    result.totalWrong * 1 +
    result.estimatedP3Score * 2
  );
  const historyBonusXP = (totalExamsCount - 1) * 75;
  const badgesBonusXP = unlockedCount * 45;
  const calculatedXP = Math.max(0, currentExamXP + historyBonusXP + badgesBonusXP);

  // Dynamic Rank & Civil Service Title
  const getRank = (xp: number) => {
    if (xp >= 1600) return { title: '👑 KPSS Derece Şampiyonu', level: 5, nextXP: 2200, desc: 'Merkezi atama Türkiye sıralamalarında en üst %0.5 dilimdesiniz.' };
    if (xp >= 1200) return { title: '⚖️ Başmüfettiş / Kıdemli Denetçi', level: 4, nextXP: 1600, desc: 'A Grubu kariyer meslekleri ve müfettişlik kadroları için güçlü puan ve birikim.' };
    if (xp >= 800) return { title: '🎖️ Kariyer Uzmanı', level: 3, nextXP: 1200, desc: 'Bakanlıklar ve uzman kadroları için atanma eşiğini geçtiniz.' };
    if (xp >= 450) return { title: '💼 Uzman Yardımcısı', level: 2, nextXP: 800, desc: 'Atama barajını aştınız. Netleri ve deneme sürekliliğini artırma adımları.' };
    return { title: '🔰 Aday Memur', level: 1, nextXP: 450, desc: 'KPSS hazırlığında temeller sağlamlaştırılıyor. İstikrarlı deneme çözümüyle dereceye koşacaksınız.' };
  };

  const rank = getRank(calculatedXP);
  const prevLevelXP = rank.level === 1 ? 0 : rank.level === 2 ? 450 : rank.level === 3 ? 800 : rank.level === 4 ? 1200 : 1600;
  const levelProgress = Math.min(100, Math.max(0, ((calculatedXP - prevLevelXP) / (rank.nextXP - prevLevelXP)) * 100));

  return (
    <div className="flex flex-col gap-6">
      {/* Apple Fitness Style Gamification Rank & Level Card */}
      <div className="bg-linear-to-br from-white via-[#FBFBFD] to-blue-50/40 rounded-3xl p-6 sm:p-7 border border-[#E5E5EA] shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#F0F0F2]">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-[#0071E3] to-[#5856D6] flex items-center justify-center text-white shadow-md text-2xl font-bold">
              {rank.level}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0071E3] uppercase tracking-wider">
                  KPSS Memuriyet Derecesi
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0071E3] font-bold text-[10px]">
                  SEVİYE {rank.level}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1D1D1F] tracking-tight">
                {rank.title}
              </h2>
            </div>
          </div>

          {/* Total XP Counter */}
          <div className="sm:text-right bg-white sm:bg-transparent px-4 py-2.5 sm:p-0 rounded-2xl border sm:border-0 border-[#E5E5EA]">
            <span className="text-xs font-semibold text-[#86868B] block">Kümülatif Toplam XP</span>
            <div className="text-2xl sm:text-3xl font-black text-[#1D1D1F] tabular-numbers flex items-center gap-1.5 sm:justify-end">
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>{calculatedXP} XP</span>
            </div>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#86868B] mb-2">
            <span>{rank.desc}</span>
            <span className="text-[#1D1D1F] tabular-numbers font-bold">
              Sonraki Seviye: {rank.nextXP} XP
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#F2F2F7] rounded-full overflow-hidden p-0.5">
            <motion.div
              className="h-full bg-linear-to-r from-[#0071E3] via-[#5856D6] to-[#FA114F] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* Quick Continuity & Performance Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#F0F0F2] text-center">
          <div className="p-2 bg-white/70 rounded-xl border border-[#E5E5EA]">
            <span className="text-xs text-[#86868B] font-medium block">Tamamlanan Deneme</span>
            <span className="text-lg font-black text-[#1D1D1F] tabular-numbers">
              {totalExamsCount} Deneme
            </span>
          </div>
          <div className="p-2 bg-white/70 rounded-xl border border-[#E5E5EA]">
            <span className="text-xs text-[#86868B] font-medium block">Açılan Rozet</span>
            <span className="text-lg font-black text-[#0071E3] tabular-numbers">
              {unlockedCount} / {badges.length}
            </span>
          </div>
          <div className="p-2 bg-white/70 rounded-xl border border-[#E5E5EA]">
            <span className="text-xs text-[#86868B] font-medium block">En Uzun Seri</span>
            <span className="text-lg font-black text-rose-500 tabular-numbers">
              {maxStreak} Doğru 🔥
            </span>
          </div>
          <div className="p-2 bg-white/70 rounded-xl border border-[#E5E5EA]">
            <span className="text-xs text-[#86868B] font-medium block">Çalışılan Gün</span>
            <span className="text-lg font-black text-emerald-600 tabular-numbers">
              {uniqueDaysCount} Gün
            </span>
          </div>
        </div>
      </div>

      {/* Badges Showcase (Apple Watch Style Shiny Medallions) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E5EA] shadow-xs flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Başarım ve Madalyalar</span>
            </h3>
            <p className="text-xs text-[#86868B] mt-0.5">
              Çözüm devamlılığı, biyolojik rutin ve sınav performansınızla kazandığınız özel KPSS nişanları.
            </p>
          </div>
          <div className="px-3.5 py-1.5 bg-amber-50 rounded-full border border-amber-200 text-amber-700 font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto">
            <Trophy className="w-3.5 h-3.5 fill-current" />
            <span>%{Math.round((unlockedCount / badges.length) * 100)} Tamamlandı</span>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5F5F7] rounded-2xl border border-[#E5E5EA] overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-white text-[#1D1D1F] shadow-xs'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Tümü ({badges.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('unlocked')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'unlocked'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>Kazanılanlar ({unlockedCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('continuity')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'continuity'
                ? 'bg-white text-[#0071E3] shadow-xs'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Devamlılık & Rutin</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('performance')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'performance'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Performans & Hız</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('subject')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'subject'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ders Hakimiyeti</span>
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBadges.map((badge) => {
            return (
              <motion.button
                key={badge.id}
                type="button"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSelectedBadge(badge);
                  if (badge.unlocked) {
                    triggerToast({
                      badgeTag: 'KAZANILAN KPSS ROZETİ',
                      title: `${badge.title} Rozeti`,
                      subtitle: badge.criteria,
                      icon: badge.icon,
                      xp: 45,
                      durationMs: 4000,
                    });
                  }
                }}
                className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all cursor-pointer relative ${
                  badge.unlocked
                    ? 'bg-linear-to-b from-white to-neutral-50/80 border-[#E5E5EA] hover:border-[#0071E3]/40 hover:shadow-md'
                    : 'bg-[#F9F9FB] border-[#E5E5EA]/70 opacity-65 hover:opacity-85'
                }`}
              >
                {/* 3D Shiny Badge Medallion Circle */}
                <div className="relative mb-3">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-inner relative transition-transform ${
                      badge.unlocked
                        ? `bg-linear-to-tr ${badge.bgGrad} text-white shadow-lg ring-4 ring-black/5`
                        : 'bg-neutral-200 text-neutral-400'
                    }`}
                  >
                    <span>{badge.icon}</span>

                    {/* Apple Style Metallic Shine Overlay */}
                    {badge.unlocked && (
                      <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-transparent via-white/20 to-white/40 pointer-events-none" />
                    )}
                  </div>

                  {/* Lock / Check indicator */}
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-xs ${
                      badge.unlocked
                        ? 'bg-emerald-500 text-white'
                        : 'bg-neutral-400 text-white'
                    }`}
                  >
                    {badge.unlocked ? <Check className="w-3 h-3 stroke-[3]" /> : <Lock className="w-2.5 h-2.5" />}
                  </div>
                </div>

                <span className="text-sm font-bold text-[#1D1D1F] line-clamp-1">
                  {badge.title}
                </span>

                <span className="text-[11px] font-medium text-[#86868B] mt-0.5 line-clamp-1">
                  {badge.criteria}
                </span>

                {/* Micro progress indicator */}
                <div className="w-full bg-[#E5E5EA] h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      badge.unlocked ? 'bg-emerald-500' : 'bg-[#0071E3]'
                    }`}
                    style={{ width: `${Math.round(badge.progress)}%` }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-black/5 relative"
            >
              <div
                className={`w-24 h-24 rounded-3xl mx-auto mb-4 flex items-center justify-center text-4xl shadow-xl bg-linear-to-tr ${
                  selectedBadge.unlocked
                    ? `${selectedBadge.bgGrad} text-white ring-8 ring-black/5`
                    : 'bg-neutral-200 text-neutral-400'
                }`}
              >
                <span>{selectedBadge.icon}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2">
                {selectedBadge.unlocked ? (
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" /> KAZANILDI
                  </span>
                ) : (
                  <span className="text-neutral-600 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> KİLİTLİ (%{Math.round(selectedBadge.progress)})
                  </span>
                )}
              </div>

              <h3 className="text-xl font-extrabold text-[#1D1D1F] mb-1">
                {selectedBadge.title}
              </h3>
              <p className="text-xs font-semibold text-[#0071E3] mb-3">
                Hedef: {selectedBadge.criteria}
              </p>
              <p className="text-sm text-[#3A3A3C] leading-relaxed mb-4">
                {selectedBadge.description}
              </p>

              {selectedBadge.detailHint && (
                <div className="p-3 bg-[#F5F5F7] rounded-xl text-xs font-medium text-[#1D1D1F] mb-6 border border-[#E5E5EA]">
                  Durum: <span className="font-bold text-[#0071E3]">{selectedBadge.detailHint}</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="w-full py-3 bg-[#1D1D1F] hover:bg-[#3A3A3C] text-white font-bold text-sm rounded-2xl transition-colors cursor-pointer shadow-xs"
              >
                Tamam
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
