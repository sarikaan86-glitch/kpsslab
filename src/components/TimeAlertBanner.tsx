import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Clock, X, Bell } from 'lucide-react';

interface TimeAlertBannerProps {
  timeRemainingSeconds: number;
}

export const TimeAlertBanner: React.FC<TimeAlertBannerProps> = ({ timeRemainingSeconds }) => {
  const [activeAlert, setActiveAlert] = useState<{
    id: string;
    level: 'info' | 'warning' | 'urgent';
    title: string;
    message: string;
  } | null>(null);

  const [dismissedAlerts, setDismissedAlerts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // 30 Minutes: 1800s
    if (timeRemainingSeconds <= 1800 && timeRemainingSeconds > 1740 && !dismissedAlerts['30m']) {
      setActiveAlert({
        id: '30m',
        level: 'info',
        title: 'Son 30 Dakika Uyarısı',
        message: 'Sürenizin son 30 dakikasına girdiniz. Genel Kültür testine geçmediyseniz temponuzu kontrol edin.',
      });
    }
    // 15 Minutes: 900s
    else if (timeRemainingSeconds <= 900 && timeRemainingSeconds > 840 && !dismissedAlerts['15m']) {
      setActiveAlert({
        id: '15m',
        level: 'warning',
        title: 'Son 15 Dakika Uyarısı',
        message: 'Optik formunuzu gözden geçirin, işaretlediğiniz sorulara ve boş bıraktığınız sorulara tekrar bakın.',
      });
    }
    // 5 Minutes: 300s
    else if (timeRemainingSeconds <= 300 && timeRemainingSeconds > 240 && !dismissedAlerts['5m']) {
      setActiveAlert({
        id: '5m',
        level: 'urgent',
        title: 'Son 5 Dakika! (Kritik Eşik)',
        message: 'Sınavın tamamlanmasına yalnızca 5 dakika kaldı. Tüm cevaplarınızı teyit ediniz.',
      });
    }
    // 1 Minute: 60s
    else if (timeRemainingSeconds <= 60 && timeRemainingSeconds > 0 && !dismissedAlerts['1m']) {
      setActiveAlert({
        id: '1m',
        level: 'urgent',
        title: 'Son 1 Dakika!',
        message: 'Sınav süresi bittiğinde sınav otomatik olarak sonlandırılıp puanınız hesaplanacaktır.',
      });
    }
  }, [timeRemainingSeconds, dismissedAlerts]);

  const handleDismiss = () => {
    if (activeAlert) {
      setDismissedAlerts((prev) => ({ ...prev, [activeAlert.id]: true }));
      setActiveAlert(null);
    }
  };

  return (
    <AnimatePresence>
      {activeAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={`mb-4 p-4 rounded-2xl border shadow-lg backdrop-blur-md flex items-start justify-between gap-3 ${
            activeAlert.level === 'urgent'
              ? 'bg-rose-50/95 dark:bg-rose-950/80 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20'
              : activeAlert.level === 'warning'
              ? 'bg-amber-50/95 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              : 'bg-blue-50/95 dark:bg-blue-950/80 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                activeAlert.level === 'urgent'
                  ? 'bg-rose-500 text-white animate-pulse'
                  : activeAlert.level === 'warning'
                  ? 'bg-amber-500 text-white'
                  : 'bg-[#0071E3] text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-tight">{activeAlert.title}</h4>
              <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{activeAlert.message}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1.5 rounded-lg opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
