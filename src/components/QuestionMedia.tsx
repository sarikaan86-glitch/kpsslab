import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, Image as ImageIcon, Table as TableIcon, Video, Play, Pause, RotateCcw, Maximize2, MapPin, Eye } from 'lucide-react';
import { QuestionMedia as MediaData } from '../types/exam';

interface QuestionMediaProps {
  media: MediaData;
}

export const QuestionMedia: React.FC<QuestionMediaProps> = ({ media }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePoint, setActivePoint] = useState<{ label: string; x: number; y: number; desc?: string } | null>(null);

  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-[#E5E5EA] dark:border-white/10 bg-[#FBFBFD] dark:bg-[#161618] transition-all">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/70 dark:bg-[#1A1A1E] border-b border-[#E5E5EA] dark:border-white/10 backdrop-blur-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
          {media.type === 'chart' && <BarChart3 className="w-4 h-4 text-[#0071E3]" />}
          {media.type === 'table' && <TableIcon className="w-4 h-4 text-emerald-600" />}
          {media.type === 'video' && <Video className="w-4 h-4 text-rose-500" />}
          {media.type === 'map' && <MapPin className="w-4 h-4 text-amber-500" />}
          {media.type === 'image' && <ImageIcon className="w-4 h-4 text-indigo-500" />}
          <span>{media.title || 'Soruya Ait Görsel / Materyal'}</span>
        </div>
        {media.caption && (
          <span className="text-[11px] font-medium text-[#86868B] dark:text-[#A1A1A6] hidden sm:inline">
            {media.caption}
          </span>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5">
        {/* 1. TABLE TYPE */}
        {media.type === 'table' && media.tableData && (
          <div className="overflow-x-auto rounded-xl border border-[#E5E5EA] dark:border-white/10 shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#F2F2F7] dark:bg-[#222226] text-[#1D1D1F] dark:text-[#F5F5F7] font-bold">
                  {media.tableData.headers.map((h, i) => (
                    <th key={i} className="p-3 border-b border-[#E5E5EA] dark:border-white/10">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5EA] dark:divide-white/5 bg-white dark:bg-[#161618]">
                {media.tableData.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors text-[#3A3A3C] dark:text-[#D1D1D6]"
                  >
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. CHART TYPE */}
        {media.type === 'chart' && media.chartData && (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div className="flex flex-col gap-2">
                {media.chartData.map((item, idx) => {
                  const maxVal = Math.max(...(media.chartData?.map((d) => d.value) || [100]));
                  const pct = Math.round((item.value / maxVal) * 100);
                  const color = item.color || '#0071E3';

                  return (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-[#1D1D1F] dark:text-[#F5F5F7]">{item.name}</span>
                        <span className="text-[#86868B] dark:text-[#A1A1A6] font-mono">
                          %{item.value}
                        </span>
                      </div>
                      <div className="w-full h-3 bg-[#E5E5EA] dark:bg-white/10 rounded-full overflow-hidden p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Simple Chart Infographic preview */}
              <div className="p-4 bg-white dark:bg-[#1C1C1F] rounded-xl border border-[#E5E5EA] dark:border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-[#0071E3] dark:text-[#2997FF] mb-1">
                    {media.chartData.reduce((acc, c) => acc + c.value, 0)}
                  </div>
                  <span className="text-[11px] font-semibold text-[#86868B] dark:text-[#A1A1A6] uppercase">
                    Toplam İndeks Değeri
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. MAP TYPE (Interactive SVG Map of Turkey with Coordinates / Points) */}
        {media.type === 'map' && (
          <div className="relative w-full aspect-2/1 bg-sky-50/50 dark:bg-slate-900/60 rounded-xl border border-sky-200/50 dark:border-sky-900/40 p-3 sm:p-4 overflow-hidden flex items-center justify-center">
            {/* SVG stylized Turkey map silhouette */}
            <svg
              viewBox="0 0 800 360"
              className="w-full h-full text-emerald-600/20 dark:text-emerald-500/20"
              fill="currentColor"
            >
              <path d="M 50 140 C 90 90, 160 110, 220 90 C 270 70, 340 85, 410 75 C 470 65, 540 80, 600 70 C 670 60, 720 90, 760 130 C 780 160, 770 210, 740 240 C 700 270, 650 260, 590 280 C 520 290, 460 260, 390 270 C 310 280, 240 260, 170 270 C 110 275, 70 240, 50 200 Z" />
              {/* Black sea and Mediterranean coastline accents */}
              <path
                d="M 50 140 Q 220 70 410 75 Q 600 65 760 130"
                fill="none"
                stroke="#0071E3"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                opacity="0.6"
              />
            </svg>

            {/* Interactive Location Marker Pins */}
            {media.interactivePoints &&
              media.interactivePoints.map((pt, idx) => (
                <div
                  key={idx}
                  style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  onClick={() => setActivePoint(pt)}
                >
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative flex items-center justify-center"
                  >
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-rose-400 opacity-75" />
                    <div className="w-6 h-6 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center shadow-md border-2 border-white dark:border-black">
                      {idx + 1}
                    </div>
                  </motion.div>
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex px-2 py-1 rounded bg-[#1D1D1F] text-white text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none z-10">
                    {pt.label}
                  </div>
                </div>
              ))}

            {activePoint && (
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 dark:bg-[#1C1C1F]/95 backdrop-blur-md p-2.5 rounded-xl border border-[#E5E5EA] dark:border-white/10 shadow-lg text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#0071E3]">{activePoint.label}</span>
                  {activePoint.desc && (
                    <span className="text-[#86868B] ml-2">{activePoint.desc}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setActivePoint(null)}
                  className="text-[10px] font-bold text-[#86868B] hover:text-[#1D1D1F] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. VIDEO / ANIMATION SIMULATION TYPE */}
        {media.type === 'video' && (
          <div className="relative aspect-16/9 bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 flex flex-col justify-between p-4">
            {/* Simulation Canvas / Animation Frame */}
            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-indigo-950 via-slate-900 to-black">
              {/* Dynamic animated graphics when playing */}
              {isPlaying ? (
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    className="w-20 h-20 rounded-full border-4 border-dashed border-[#0071E3] flex items-center justify-center text-white text-xs font-mono font-bold"
                  >
                    COĞRAFYA SİMÜLASYONU
                  </motion.div>
                  <span className="text-xs text-sky-300 font-mono animate-pulse">
                    Rüzgar ve Basınç Dinamikleri Çalışıyor (Canlı)
                  </span>
                </div>
              ) : (
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center mx-auto mb-3 border border-white/20">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                  <span className="text-xs font-medium text-white/80 block">
                    Görsel Animasyonu Başlatmak İçin Oynatın
                  </span>
                </div>
              )}
            </div>

            {/* Video Controls Bar */}
            <div className="relative z-10 mt-auto flex items-center justify-between gap-3 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10 text-white text-xs">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] font-bold text-white transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Durdur' : 'Oynat'}</span>
              </button>
              <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#0071E3]"
                  animate={{ width: isPlaying ? '100%' : '0%' }}
                  transition={{ duration: 6, ease: 'linear', repeat: isPlaying ? Infinity : 0 }}
                />
              </div>
              <span className="font-mono text-[11px] text-neutral-400">00:08</span>
            </div>
          </div>
        )}

        {/* 5. IMAGE TYPE */}
        {media.type === 'image' && media.url && (
          <div className="rounded-xl overflow-hidden border border-[#E5E5EA] dark:border-white/10">
            <img
              src={media.url}
              alt={media.title || 'Soru Görseli'}
              className="w-full max-h-80 object-contain bg-white dark:bg-black"
            />
          </div>
        )}
      </div>
    </div>
  );
};
