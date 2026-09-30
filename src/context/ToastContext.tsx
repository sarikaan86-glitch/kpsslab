import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Award, Sparkles, X, Flame, Check, Star } from 'lucide-react';

export interface AchievementToastData {
  id: string;
  badgeTag?: string; // e.g. "YENİ ROZET KAZANILDI" or "DENEME TAMAMLANDI"
  title: string;
  subtitle: string;
  icon?: string; // emoji or default icon
  xp?: number; // e.g. 50
  type?: 'achievement' | 'milestone' | 'badge' | 'record';
  durationMs?: number;
}

interface ToastContextType {
  triggerToast: (toast: Omit<AchievementToastData, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeToast, setActiveToast] = useState<AchievementToastData | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dismissToast = useCallback((id: string) => {
    setActiveToast((current) => (current?.id === id ? null : current));
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const triggerToast = useCallback((data: Omit<AchievementToastData, 'id'>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const newToast: AchievementToastData = {
      ...data,
      id: `toast-${Date.now()}-${Math.random()}`,
    };

    setActiveToast(newToast);

    const duration = data.durationMs || 5000;
    timeoutRef.current = setTimeout(() => {
      setActiveToast((current) => (current?.id === newToast.id ? null : current));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ triggerToast, dismissToast }}>
      {children}

      {/* Apple Dynamic Island / macOS Style Floating Achievement Toast */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <AnimatePresence mode="wait">
          {activeToast && (
            <motion.div
              key={activeToast.id}
              initial={{ y: -50, scale: 0.88, opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -45, scale: 0.9, opacity: 0, filter: 'blur(6px)' }}
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 28,
                mass: 0.8,
              }}
              className="pointer-events-auto relative max-w-md w-full sm:w-auto min-w-[320px] sm:min-w-[360px] bg-neutral-900/90 dark:bg-[#161618]/95 backdrop-blur-2xl border border-white/20 dark:border-white/20 text-white rounded-3xl sm:rounded-full px-4 py-3 sm:px-5 sm:py-3 shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden cursor-pointer group"
              onClick={() => dismissToast(activeToast.id)}
            >
              {/* Apple Specular Gloss Rim Highlight */}
              <div className="absolute inset-0 rounded-3xl sm:rounded-full bg-linear-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center gap-3.5">
                {/* 3D Glowing Medallion Icon */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-2xl sm:rounded-full bg-linear-to-tr from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-xl shadow-md ring-2 ring-white/20">
                    <span>{activeToast.icon || '🏆'}</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-neutral-900 flex items-center justify-center">
                    <Check className="w-2 h-2 text-white stroke-[3]" />
                  </span>
                </div>

                {/* Toast Info */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                      {activeToast.badgeTag || 'BAŞARI KİLİDİ AÇILDI'}
                    </span>
                    {activeToast.xp && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        +{activeToast.xp} XP
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-extrabold text-white tracking-tight truncate mt-0.5">
                    {activeToast.title}
                  </h4>
                  <p className="text-xs text-neutral-300 font-medium truncate mt-0.5">
                    {activeToast.subtitle}
                  </p>
                </div>

                {/* Dismiss Close Icon */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissToast(activeToast.id);
                  }}
                  className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                  aria-label="Kapat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Line indicating auto-dismiss */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{
                    duration: (activeToast.durationMs || 5000) / 1000,
                    ease: 'linear',
                  }}
                  className="h-full bg-linear-to-r from-amber-400 to-[#0071E3]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useAchievementToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useAchievementToast must be used within a ToastProvider');
  }
  return context;
};
