import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Share, PlusSquare, X, CheckCircle2, Smartphone, Monitor } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  // If already running in standalone PWA window, hide button
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstalledSuccess(true);
        setTimeout(() => setInstalledSuccess(false), 3000);
      }
    } else {
      setShowGuideModal(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-98 shadow-xs transition-all cursor-pointer"
        title="KPSSLAB'ı Bilgisayarınıza veya Telefonunuza Uygulama Olarak Yükleyin"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Uygulama Olarak İndir</span>
        <span className="sm:hidden">İndir</span>
      </button>

      {/* Installation Guide Modal (iOS Safari & Manual Chrome fallback) */}
      <AnimatePresence>
        {showGuideModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGuideModal(false)}
              className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative w-full max-w-md bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-white/10 shadow-2xl p-6 z-10 text-[#1D1D1F] dark:text-[#F5F5F7]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F0F0F2] dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-[#0071E3] text-white flex items-center justify-center font-bold shadow-xs">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold tracking-tight">
                      Uygulama Olarak Yükle
                    </h3>
                    <p className="text-[11px] text-[#86868B] dark:text-[#A1A1A6]">
                      KPSSLAB Progressive Web App (PWA)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowGuideModal(false)}
                  className="p-1 rounded-full text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instructions body */}
              <div className="space-y-4 text-xs">
                {isIOS ? (
                  // iOS Safari instructions
                  <div className="space-y-3">
                    <p className="font-semibold text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      iPhone veya iPad'inizde KPSSLAB'ı tam ekran yerel uygulama olarak kullanmak için:
                    </p>
                    <div className="bg-[#F5F5F7] dark:bg-[#2C2C2E] p-3.5 rounded-2xl space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                        <span>Safari tarayıcınızın alt çubuğundaki <strong className="inline-flex items-center gap-1 text-[#0071E3]"><Share className="w-3.5 h-3.5" /> Paylaş</strong> simgesine dokunun.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                        <span>Açılan menüyü aşağı kaydırarak <strong className="inline-flex items-center gap-1 text-[#0071E3]"><PlusSquare className="w-3.5 h-3.5" /> Ana Ekrana Ekle</strong> seçeneğini seçin.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                        <span>Sağ üstteki <strong>"Ekle"</strong> butonuna dokunarak kurulumu tamamlayın.</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Android / Desktop Chrome / Edge instructions
                  <div className="space-y-3">
                    <p className="font-semibold text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      Tarayıcınızın adres çubuğundaki yükleme simgesiyle veya aşağıdaki adımlarla kurabilirsiniz:
                    </p>
                    <div className="bg-[#F5F5F7] dark:bg-[#2C2C2E] p-3.5 rounded-2xl space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                        <span>Tarayıcınızın sağ üstündeki menüye (<strong>⋮ Üç Nokta</strong>) dokunun.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                        <span><strong>"Uygulamayı Yükle"</strong> veya <strong>"Ana Ekrana Ekle"</strong> butonuna basın.</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 rounded-2xl flex items-center gap-2 text-[11px] text-[#0071E3] dark:text-[#2997FF]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Uygulama olarak yüklendiğinde internetsiz ortamda önbellekten hızla açılır ve tam ekran modunda çalışır.</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F0F0F2] dark:border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowGuideModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Anladım, Kapat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
