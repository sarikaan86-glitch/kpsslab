import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';

interface KPSSFlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Flashcard {
  subject: string;
  topic: string;
  front: string;
  back: string;
  mnemonic?: string;
  color: string;
}

const CARDS: Flashcard[] = [
  {
    subject: 'TÜRKÇE',
    topic: 'Yazım Kuralları',
    front: 'Bitişik yazılan istisna "ki" bağlaçları hangileridir ve nasıl kodlanır?',
    back: 'Sanki, Oysaki, Mademki, Belki, Halbuki, Çünkü, Meğerki, İllaki.\nBunlar kalıplaşmış oldukları için daima bitişik yazılır.',
    mnemonic: 'ŞİFRE: SOMBAHÇEMİ',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    subject: 'COĞRAFYA',
    topic: 'İklim & Rüzgarlar',
    front: 'Türkiye\'yi etkileyen yerel rüzgarlar saat yönünde nasıl sıralanır?',
    back: 'Kuzeybatıdan Karayel, Kuzeyden Yıldız, Kuzeydoğudan Poyraz (Sıcaklığı düşürür).\nGüneydoğudan Samyeli (Keşişleme), Güneyden Kıble, Güneybatıdan Lodos (Sıcaklığı yükseltir).',
    mnemonic: 'ŞİFRE: KAYIP SAKAL',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    subject: 'TARİH',
    topic: 'Kurtuluş Savaşı',
    front: 'Milli Mücadelenin "amacı, gerekçesi ve yöntemi" ilk kez nerede ilan edilmiştir?',
    back: 'Amasya Genelgesi (22 Haziran 1919).\n• Gerekçe: Vatanın bütünlüğü, milletin bağımsızlığı tehlikededir.\n• Amaç ve Yöntem: Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır.',
    mnemonic: 'ŞİFRE: Amasya = İhtilal Beyannamesi',
    color: 'from-amber-500 to-orange-600',
  },
  {
    subject: 'VATANDAŞLIK',
    topic: 'Anayasa Hukuku',
    front: 'Anayasa Mahkemesi kaç üyeden oluşur ve üyelerin görev süresi kaç yıldır?',
    back: '15 üyeden oluşur.\n• 3 üyeyi TBMM seçer.\n• 12 üyeyi Cumhurbaşkanı seçer.\nÜyeler 12 yıl için seçilir ve bir kimse iki defa Anayasa Mahkemesi üyesi seçilemez.',
    mnemonic: 'ŞİFRE: 15 Üye / 12 Yıl / Tek Sefer',
    color: 'from-purple-500 to-pink-600',
  },
  {
    subject: 'MATEMATİK',
    topic: 'Köklü Sayılar',
    front: 'Paydasında köklü ifade bulunan kesirler nasıl rasyonel yapılır?',
    back: 'Payda eşleniği ile çarpılır:\n• (√a - √b) ifadesinin eşleniği (√a + √b)\nİki kare farkı kuralından (√a - √b)(√a + √b) = a - b elde edilir.',
    mnemonic: 'KURAL: Eşlenik ile Çarpma',
    color: 'from-indigo-600 to-blue-700',
  },
  {
    subject: 'COĞRAFYA',
    topic: 'Karstik Şekiller',
    front: 'Karstik aşınım şekilleri küçükten büyüğe nasıl sıralanır?',
    back: 'Lapa -> Dolin -> Uvala -> Polye (Gölova).\nEn büyük karstik aşınım şekli polyedir.',
    mnemonic: 'ŞİFRE: GÖKSEL LAPA -> POLYE',
    color: 'from-teal-500 to-emerald-700',
  },
  {
    subject: 'TARİH',
    topic: 'İnkılap Tarihi',
    front: 'TBMM\'yi tanıyan ilk Avrupalı büyük devlet ve ilk taviz verilen yer neresidir?',
    back: 'Moskova Antlaşması (1921) ile Sovyet Rusya tanıdı.\nMisak-ı Milli\'den verilen ilk taviz: Batum (Gürcistan\'a bırakıldı).',
    mnemonic: 'ŞİFRE: Moskova = Rusya / İlk Taviz = Batum',
    color: 'from-rose-500 to-red-600',
  },
];

export const KPSSFlashcardsModal: React.FC<KPSSFlashcardsModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  const currentCard = CARDS[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % CARDS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Surface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="relative w-full max-w-lg bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-white/15 shadow-2xl p-6 sm:p-7 z-10 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F0F0F2] dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400 dark:bg-amber-500 text-neutral-900 flex items-center justify-center font-bold text-sm shadow-xs">
                🗂️
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                  Apple Cüzdan Stili KPSS Hafıza Kartları
                </h4>
                <span className="text-[11px] text-[#86868B] dark:text-[#A1A1A6]">
                  Kart {currentIndex + 1} / {CARDS.length} · Dokun ve Çevir
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-72 sm:h-80 perspective-1000 cursor-pointer select-none my-2"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full transform-style-3d shadow-xl rounded-3xl"
            >
              {/* FRONT OF CARD */}
              <div
                className={`absolute inset-0 backface-hidden rounded-3xl p-6 sm:p-7 bg-linear-to-br ${currentCard.color} text-white flex flex-col justify-between border border-white/20`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md">
                      {currentCard.subject} · {currentCard.topic}
                    </span>
                    <span className="text-xs font-semibold text-white/80 flex items-center gap-1">
                      <RotateCw className="w-3.5 h-3.5" />
                      Cevap İçin Dokun
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black mt-4 leading-snug">
                    {currentCard.front}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-xs text-white/80 pt-3 border-t border-white/15">
                  <span>ÖSYM Banko Bilgi</span>
                  <span>Kartı Çevir ➔</span>
                </div>
              </div>

              {/* BACK OF CARD */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 sm:p-7 bg-[#161618] dark:bg-black text-white flex flex-col justify-between border border-white/20">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Çözüm & Hafıza Şifresi
                    </span>
                    <span className="text-xs font-semibold text-neutral-400">
                      ÖSYM Mantığı
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-medium leading-relaxed mt-2 text-neutral-200 whitespace-pre-line">
                    {currentCard.back}
                  </p>

                  {currentCard.mnemonic && (
                    <div className="mt-4 p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-black text-xs">
                      {currentCard.mnemonic}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-white/10">
                  <span>Soruya Geri Dönmek İçin Dokun</span>
                  <span>↺</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-4 pt-2">
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#E5E5EA] text-[#1D1D1F] dark:text-[#F5F5F7] text-xs font-bold transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Önceki Kart</span>
            </button>

            <button
              type="button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Soruyu Gör' : 'Cevabı Çevir'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#E5E5EA] text-[#1D1D1F] dark:text-[#F5F5F7] text-xs font-bold transition-colors cursor-pointer"
            >
              <span>Sonraki Kart</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
