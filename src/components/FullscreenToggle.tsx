import React from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useFullscreen } from '../hooks/useFullscreen';

interface FullscreenToggleProps {
  className?: string;
  showText?: boolean;
}

export const FullscreenToggle: React.FC<FullscreenToggleProps> = ({
  className = '',
  showText = false,
}) => {
  const { isFullscreen, toggleFullscreen, isSupported } = useFullscreen();

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={toggleFullscreen}
      className={`flex items-center gap-1.5 p-2 rounded-xl text-[#86868B] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-white/10 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-all cursor-pointer shadow-2xs ${className}`}
      title={isFullscreen ? 'Tam Ekrandan Çık (Esc)' : 'Tam Ekran Moduna Geç'}
      aria-label="Tam Ekran Modunu Değiştir"
    >
      {isFullscreen ? (
        <Minimize2 className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
      ) : (
        <Maximize2 className="w-4 h-4" />
      )}
      {showText && (
        <span className="text-xs font-semibold">
          {isFullscreen ? 'Küçült' : 'Tam Ekran'}
        </span>
      )}
    </button>
  );
};
