import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Search,
  Award,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface CareerCadreSimulatorProps {
  currentP3Score?: number;
  currentNet?: number;
}

interface CadreItem {
  id: string;
  title: string;
  institution: string;
  category: 'A_GRUBU_KARIYER' | 'B_GRUBU_MEMURLUK' | 'EMNIYET';
  minP3Score: number;
  targetNet: number;
  salaryEstimate: string;
  description: string;
}

const CADRES: CadreItem[] = [
  {
    id: 'sayistay',
    title: 'Sayıştay Denetçi Yardımcılığı',
    institution: 'Sayıştay Başkanlığı',
    category: 'A_GRUBU_KARIYER',
    minP3Score: 89.5,
    targetNet: 98,
    salaryEstimate: '₺65.000 - ₺75.000',
    description: 'En yüksek prestijli denetim kariyer mesleği. Yüksek Genel Yetenek ve Genel Kültür neti gerektirir.',
  },
  {
    id: 'bakanlik_uzman',
    title: 'Bakanlık Uzman Yardımcılığı',
    institution: 'Merkezi Bakanlıklar',
    category: 'A_GRUBU_KARIYER',
    minP3Score: 86.5,
    targetNet: 92,
    salaryEstimate: '₺55.000 - ₺62.000',
    description: 'Bakanlık merkez teşkilatlarında politika ve mevzuat geliştirme kariyeri.',
  },
  {
    id: 'sgk_denetmen',
    title: 'Sosyal Güvenlik Denetmen Yrd.',
    institution: 'Sosyal Güvenlik Kurumu (SGK)',
    category: 'A_GRUBU_KARIYER',
    minP3Score: 81.8,
    targetNet: 82,
    salaryEstimate: '₺48.000 - ₺54.000',
    description: 'Kayıt dışı istihdam ve sosyal güvenlik denetimlerini yürüten saygın kariyer kadrosu.',
  },
  {
    id: 'guy',
    title: 'Gelir Uzman Yardımcılığı (GUY)',
    institution: 'Gelir İdaresi Başkanlığı (GİB)',
    category: 'A_GRUBU_KARIYER',
    minP3Score: 78.4,
    targetNet: 75,
    salaryEstimate: '₺45.000 - ₺50.000',
    description: 'Vergi dairelerinde en çok alım yapan ve adayların en yoğun tercih ettiği A grubu kariyer mesleği.',
  },
  {
    id: 'il_goc',
    title: 'İl Göç Uzman Yardımcılığı',
    institution: 'Göç İdaresi Başkanlığı',
    category: 'A_GRUBU_KARIYER',
    minP3Score: 79.5,
    targetNet: 78,
    salaryEstimate: '₺46.000 - ₺52.000',
    description: 'Türkiye genelinde yabancılar hukuku ve göç yönetimi süreçlerini yürüten kadro.',
  },
  {
    id: 'gumruk',
    title: 'Gümrük Muhafaza Memurluğu',
    institution: 'Ticaret Bakanlığı',
    category: 'B_GRUBU_MEMURLUK',
    minP3Score: 76.5,
    targetNet: 71,
    salaryEstimate: '₺42.000 - ₺47.000',
    description: 'Havalimanları ve sınır kapılarında gümrük kaçakçılığıyla mücadele eden B grubu kadro.',
  },
  {
    id: 'vhki',
    title: 'Veri Hazırlama & Kontrol İşletmeni (VHKİ)',
    institution: 'Üniversiteler & Valilikler',
    category: 'B_GRUBU_MEMURLUK',
    minP3Score: 74.0,
    targetNet: 68,
    salaryEstimate: '₺38.000 - ₺43.000',
    description: 'Merkezi atama (ÖSYM tercih kılavuzu) ile mülakatsız doğrudan atanan devlet memurluğu.',
  },
  {
    id: 'pomem',
    title: 'POMEM Polis Memurluğu',
    institution: 'Emniyet Genel Müdürlüğü (EGM)',
    category: 'EMNIYET',
    minP3Score: 65.0,
    targetNet: 50,
    salaryEstimate: '₺50.000 - ₺58.000',
    description: 'Lisans mezunları için 65.00 taban puanlı polis meslek eğitim merkezi alımı.',
  },
];

export const CareerCadreSimulator: React.FC<CareerCadreSimulatorProps> = ({
  currentP3Score = 75.0,
  currentNet = 70.0,
}) => {
  const [userScore, setUserScore] = useState<number>(currentP3Score);
  const [filterCat, setFilterCat] = useState<'ALL' | 'A_GRUBU_KARIYER' | 'B_GRUBU_MEMURLUK' | 'EMNIYET'>('ALL');
  const [search, setSearch] = useState('');

  const filtered = CADRES.filter((c) => {
    const matchesCat = filterCat === 'ALL' || c.category === filterCat;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.institution.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-[#161618] rounded-3xl p-6 sm:p-8 border border-[#E5E5EA] dark:border-white/10 shadow-xs transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0F0F2] dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF]">
              2026 ÖSYM Tercih ve Atama Motoru
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/50 text-[#0071E3] dark:text-[#2997FF]">
              Canlı Simülasyon
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight mt-0.5">
            Hedef Kadro & Taban Puan Simülatörü
          </h3>
          <p className="text-xs text-[#86868B] dark:text-[#A1A1A6] mt-0.5">
            Bu denemedeki netiniz ve P3 puanınızla hangi devlet kadrolarına atanabileceğinizi inceleyin.
          </p>
        </div>

        {/* Dynamic Score Slider / Input */}
        <div className="bg-[#F5F5F7] dark:bg-[#1C1C1E] p-3 rounded-2xl border border-[#E5E5EA] dark:border-white/10 flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-bold text-[#86868B] uppercase block">Hesaplanan P3</span>
            <span className="text-2xl font-black text-[#0071E3] dark:text-[#2997FF] tabular-numbers">
              {userScore.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            step="0.5"
            value={userScore}
            onChange={(e) => setUserScore(parseFloat(e.target.value))}
            className="w-28 sm:w-36 accent-[#0071E3] cursor-pointer"
          />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-5 pb-4">
        {/* Category Pills */}
        <div className="inline-flex p-1 bg-[#F5F5F7] dark:bg-[#1C1C1E] rounded-2xl border border-[#E5E5EA] dark:border-white/10">
          {[
            { id: 'ALL', label: 'Tüm Kadrolar' },
            { id: 'A_GRUBU_KARIYER', label: 'A Grubu Kariyer' },
            { id: 'B_GRUBU_MEMURLUK', label: 'B Grubu Memurluk' },
            { id: 'EMNIYET', label: 'Polislik / EGM' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilterCat(cat.id as any)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                filterCat === cat.id
                  ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                  : 'text-[#86868B] dark:text-[#A1A1A6] hover:text-[#1D1D1F]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kadro veya kurum ara..."
            className="pl-8 pr-3 py-1.5 rounded-xl bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-white/10 text-xs text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
          />
          <Search className="w-3.5 h-3.5 text-[#86868B] absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Cadres Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {filtered.map((cadre) => {
          const diff = userScore - cadre.minP3Score;
          const isEligible = diff >= 0;
          const isClose = !isEligible && diff >= -3.5;

          return (
            <motion.div
              key={cadre.id}
              whileHover={{ y: -2 }}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isEligible
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/50'
                  : isClose
                  ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/50'
                  : 'bg-[#FAFAFC] dark:bg-[#1A1A1E] border-[#E5E5EA] dark:border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#86868B] dark:text-[#A1A1A6]">
                    {cadre.institution}
                  </span>

                  {/* Status Badge */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                      isEligible
                        ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border-emerald-300'
                        : isClose
                        ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border-amber-300'
                        : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 border-rose-300'
                    }`}
                  >
                    {isEligible
                      ? '✓ Tercih Edilebilir'
                      : isClose
                      ? `⚠️ ${Math.abs(diff).toFixed(1)} Puan Kaldı`
                      : `✕ +${Math.abs(diff).toFixed(1)} Puan Gerekli`}
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                  {cadre.title}
                </h4>

                <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] mt-1.5 leading-relaxed">
                  {cadre.description}
                </p>
              </div>

              {/* Footer info: Taban Puan, Maaş, Hedef Net */}
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#86868B] block text-[10px]">Taban P3 Eşiği</span>
                  <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-bold">
                    {cadre.minP3Score.toFixed(1)}
                  </strong>
                </div>

                <div>
                  <span className="text-[#86868B] block text-[10px]">Hedef Net</span>
                  <strong className="text-[#0071E3] dark:text-[#2997FF] font-bold">
                    ~{cadre.targetNet} Net
                  </strong>
                </div>

                <div className="text-right">
                  <span className="text-[#86868B] block text-[10px]">Tahmini Maaş</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {cadre.salaryEstimate}
                  </strong>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
