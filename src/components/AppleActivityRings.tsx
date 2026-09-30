import React from 'react';
import { motion } from 'motion/react';
import { Target, Zap, CheckCircle2 } from 'lucide-react';

interface AppleActivityRingsProps {
  totalNet: number;
  targetNet?: number;
  accuracyRate: number; // 0 to 100
  timeScore: number; // 0 to 100 (pace efficiency)
  size?: number;
}

export const AppleActivityRings: React.FC<AppleActivityRingsProps> = ({
  totalNet,
  targetNet = 85,
  accuracyRate,
  timeScore,
  size = 200,
}) => {
  const netProgress = Math.min(Math.max(totalNet / targetNet, 0), 1.25);
  const accuracyProgress = Math.min(Math.max(accuracyRate / 100, 0), 1.0);
  const timeProgress = Math.min(Math.max(timeScore / 100, 0), 1.0);

  // Ring geometry
  const strokeWidth = 14;
  const gap = 3;

  const r1 = 80; // Outer (Net)
  const r2 = r1 - strokeWidth - gap; // Middle (Accuracy)
  const r3 = r2 - strokeWidth - gap; // Inner (Time/Pace)

  const c1 = 2 * Math.PI * r1;
  const c2 = 2 * Math.PI * r2;
  const c3 = 2 * Math.PI * r3;

  const center = 100;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full -rotate-90 transform drop-shadow-md"
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="ringNetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FA114F" />
              <stop offset="100%" stopColor="#FF5252" />
            </linearGradient>
            <linearGradient id="ringAccGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A1FE03" />
              <stop offset="100%" stopColor="#30D158" />
            </linearGradient>
            <linearGradient id="ringTimeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#0071E3" />
            </linearGradient>
          </defs>

          {/* Background Tracks */}
          <circle
            cx={center}
            cy={center}
            r={r1}
            fill="none"
            stroke="#FA114F"
            strokeOpacity="0.15"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={r2}
            fill="none"
            stroke="#30D158"
            strokeOpacity="0.15"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={r3}
            fill="none"
            stroke="#0071E3"
            strokeOpacity="0.15"
            strokeWidth={strokeWidth}
          />

          {/* Outer Ring: Net (Red/Coral) */}
          <motion.circle
            cx={center}
            cy={center}
            r={r1}
            fill="none"
            stroke="url(#ringNetGrad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={c1}
            initial={{ strokeDashoffset: c1 }}
            animate={{ strokeDashoffset: c1 * (1 - Math.min(netProgress, 1)) }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Middle Ring: Accuracy (Green) */}
          <motion.circle
            cx={center}
            cy={center}
            r={r2}
            fill="none"
            stroke="url(#ringAccGrad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={c2}
            initial={{ strokeDashoffset: c2 }}
            animate={{ strokeDashoffset: c2 * (1 - accuracyProgress) }}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Inner Ring: Pace / Time (Blue/Cyan) */}
          <motion.circle
            cx={center}
            cy={center}
            r={r3}
            fill="none"
            stroke="url(#ringTimeGrad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={c3}
            initial={{ strokeDashoffset: c3 }}
            animate={{ strokeDashoffset: c3 * (1 - timeProgress) }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        {/* Center Activity Icon / Glow */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
            className="flex flex-col items-center"
          >
            <span className="text-2xl font-black text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-numbers">
              %{Math.round((netProgress * 100))}
            </span>
            <span className="text-[10px] font-bold text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-wider">
              Aktivite
            </span>
          </motion.div>
        </div>
      </div>

      {/* Ring Legends (Apple Fitness Style) */}
      <div className="grid grid-cols-3 gap-3 mt-4 w-full">
        {/* Net */}
        <div className="flex flex-col items-center p-2 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#FA114F]">
            <Target className="w-3 h-3" />
            <span>NET HEDEFİ</span>
          </div>
          <span className="text-sm font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] mt-0.5 tabular-numbers">
            {totalNet.toFixed(1)} / {targetNet}
          </span>
          <span className="text-[10px] text-[#86868B] dark:text-[#A1A1A6]">
            %{Math.round((totalNet / targetNet) * 100)}
          </span>
        </div>

        {/* Accuracy */}
        <div className="flex flex-col items-center p-2 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#30D158]">
            <CheckCircle2 className="w-3 h-3" />
            <span>İSABET ORANI</span>
          </div>
          <span className="text-sm font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] mt-0.5 tabular-numbers">
            %{Math.round(accuracyRate)}
          </span>
          <span className="text-[10px] text-[#86868B] dark:text-[#A1A1A6]">Doğruluk</span>
        </div>

        {/* Pace */}
        <div className="flex flex-col items-center p-2 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#0071E3] dark:text-[#2997FF]">
            <Zap className="w-3 h-3" />
            <span>HIZ VERİMİ</span>
          </div>
          <span className="text-sm font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] mt-0.5 tabular-numbers">
            %{Math.round(timeScore)}
          </span>
          <span className="text-[10px] text-[#86868B] dark:text-[#A1A1A6]">Tempo</span>
        </div>
      </div>
    </div>
  );
};
