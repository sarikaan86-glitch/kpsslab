import React from 'react';
import { AlertTriangle, CheckCircle2, Clock, Flag, HelpCircle } from 'lucide-react';
import { formatTime } from '../utils/kpssScoring';

interface FinishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmFinish: () => void;
  answeredCount: number;
  emptyCount: number;
  markedCount: number;
  timeRemainingSeconds: number;
}

export const FinishModal: React.FC<FinishModalProps> = ({
  isOpen,
  onClose,
  onConfirmFinish,
  answeredCount,
  emptyCount,
  markedCount,
  timeRemainingSeconds,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#D2D2D7] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#0071E3] mb-4">
          <HelpCircle className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight mb-2">
          Deneme Sınavını Bitir
        </h3>
        <p className="text-sm text-[#86868B] mb-6">
          Sınavınızı sonlandırıp KPSS P3 puanınızı ve ayrıntılı çözüm analizlerinizi hesaplamak istediğinize emin misiniz?
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-[#F5F5F7] rounded-xl border border-[#E5E5EA] mb-6">
          <div className="text-center">
            <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider block">
              Cevaplanan
            </span>
            <span className="text-xl font-bold text-emerald-600 tabular-numbers">
              {answeredCount}
            </span>
          </div>
          <div className="text-center border-x border-[#E5E5EA]">
            <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider block">
              Boş Kalan
            </span>
            <span className="text-xl font-bold text-[#86868B] tabular-numbers">
              {emptyCount}
            </span>
          </div>
          <div className="text-center">
            <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider block">
              İşaretli
            </span>
            <span className="text-xl font-bold text-[#FF9500] tabular-numbers">
              {markedCount}
            </span>
          </div>
        </div>

        {emptyCount > 0 && (
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200/80 rounded-lg text-xs text-amber-900 mb-6 text-left">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Henüz cevaplamadığınız <strong>{emptyCount} boş soru</strong> bulunmaktadır.
            </span>
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 text-xs text-[#86868B] mb-6">
          <Clock className="w-3.5 h-3.5" />
          <span>Kalan Süre: <strong className="text-[#1D1D1F]">{formatTime(timeRemainingSeconds)}</strong></span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 text-sm font-semibold text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#E5E5EA] rounded-xl transition-colors"
          >
            Sınava Devam Et
          </button>
          <button
            type="button"
            onClick={onConfirmFinish}
            className="flex-1 py-2.5 px-4 text-sm font-semibold text-white bg-[#0071E3] hover:bg-[#0077ED] rounded-xl shadow-xs transition-colors"
          >
            Sınavı Bitir
          </button>
        </div>
      </div>
    </div>
  );
};
