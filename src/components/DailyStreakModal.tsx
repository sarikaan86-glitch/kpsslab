import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Shield, Trophy, Calendar, Check, X, Sparkles } from 'lucide-react';
import { StreakData } from '../utils/streakManager';

interface DailyStreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakData: StreakData;
}

export const DailyStreakModal: React.FC<DailyStreakModalProps> = ({
  isOpen,
  onClose,
  streakData,
}) => {
  if (!isOpen) return null;

  // Day names for current week
  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7; // 0 for Monday, 6 for Sunday

  const milestones = [
    { days: 3, title: '3 Günlük Çırak', desc: 'Süreklilik alışkanlığı kazanıldı', icon: '🥉' },
    { days: 7, title: '7 Günlük Kararlı', desc: 'Tam 1 haftadır kesintisiz KPSS hazırlığı', icon: '🥈' },
    { days: 14, title: '14 Günlük Usta', desc: 'İki haftalık demir gibi disiplin', icon: '🥇' },
    { days: 30, title: '30 Günlük KPSS Fatihi', desc: 'Gerçek bir derece adayı!', icon: '👑' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="relative w-full max-w-md bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-white/10 shadow-2xl p-6 sm:p-7 z-10 text-[#1D1D1F] dark:text-[#F5F5F7]"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Flame Centerpiece */}
          <div className="text-center pt-2 pb-5">
            <motion.div
              animate={{ scale: [1, 1.08, 1], rotate: [-2, 2, -2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 mx-auto rounded-3xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/25 mb-4"
            >
              <Flame className="w-12 h-12 text-white fill-current" />
            </motion.div>

            <span className="text-xs font-black uppercase tracking-wider text-orange-500">
              Günlük Çalışma Serisi
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
              {streakData.currentStreak} Gün Kesintisiz!
            </h2>
            <p className="text-xs text-[#86868B] dark:text-[#A1A1A6] mt-1.5">
              En uzun seriniz: <strong>{streakData.longestStreak} gün</strong> · Düzenli çalışarak serinizi koruyun!
            </p>
          </div>

          {/* 7-Day Weekly Calendar Dots */}
          <div className="bg-[#F5F5F7] dark:bg-[#252528] p-4 rounded-2xl mb-5">
            <div className="flex items-center justify-between text-xs font-bold text-[#86868B] mb-2 px-1">
              <span>Haftalık Alışkanlık Halkası</span>
              <span className="text-[#0071E3] dark:text-[#2997FF]">Bugün Aktif ✓</span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {weekDays.map((day, idx) => {
                const isActive = idx <= currentDayIndex;
                const isToday = idx === currentDayIndex;

                return (
                  <div key={day} className="flex flex-col items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#86868B]">{day}</span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                        isToday
                          ? 'bg-linear-to-br from-orange-500 to-amber-500 text-white ring-3 ring-orange-500/30 scale-105 shadow-xs'
                          : isActive
                          ? 'bg-emerald-500 text-white shadow-2xs'
                          : 'bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-white/10 text-neutral-400'
                      }`}
                    >
                      {isActive ? <Check className="w-4 h-4 stroke-[3]" /> : '·'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Streak Freeze & Milestones */}
          <div className="space-y-2.5 mb-6">
            {/* Freeze Shield */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-blue-900 dark:text-blue-100 block">
                    Seri Kalkanı (Freeze)
                  </span>
                  <span className="text-[11px] text-[#86868B] dark:text-[#A1A1A6]">
                    1 gün aksatırsanız seriniz sıfırlanmaz
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {streakData.freezesRemaining} Kalkan
              </span>
            </div>

            {/* Next Milestone */}
            {milestones.map((m) => {
              const isUnlocked = streakData.currentStreak >= m.days;
              return (
                <div
                  key={m.days}
                  className={`flex items-center justify-between p-3 rounded-2xl border text-xs transition-all ${
                    isUnlocked
                      ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/40'
                      : 'bg-white dark:bg-[#161618] border-[#E5E5EA] dark:border-white/10 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{m.icon}</span>
                    <div>
                      <span className="font-bold block">{m.title}</span>
                      <span className="text-[10px] text-[#86868B] dark:text-[#A1A1A6]">
                        {m.desc}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isUnlocked
                        ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-[#86868B]'
                    }`}
                  >
                    {isUnlocked ? 'Kazanıldı ✓' : `${m.days - streakData.currentStreak} gün kaldı`}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
          >
            Seriyi Devam Ettir
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
