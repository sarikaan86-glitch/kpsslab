import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
  AreaChart,
  Area,
} from 'recharts';
import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  Award,
  Sparkles,
  BarChart2,
  Calendar,
  Compass,
} from 'lucide-react';
import { ExamResult } from '../types/exam';
import { getExamHistory } from '../utils/kpssScoring';

interface NetAnalysisChartProps {
  currentResult: ExamResult;
  history?: ExamResult[];
}

type ChartMetricMode = 'total' | 'gy_gk' | 'subjects';

export const NetAnalysisChart: React.FC<NetAnalysisChartProps> = ({
  currentResult,
  history: propHistory,
}) => {
  const [metricMode, setMetricMode] = useState<ChartMetricMode>('total');
  const [chartType, setChartType] = useState<'line' | 'area'>('line');

  // Load history from props or localStorage
  const allHistory = useMemo(() => {
    const raw = propHistory && propHistory.length > 0 ? propHistory : getExamHistory();
    // Ensure currentResult is included
    const hasCurrent = raw.some((r) => r.id === currentResult.id);
    const list = hasCurrent ? [...raw] : [currentResult, ...raw];
    // Sort oldest first for chronological line progression
    return list.slice(0, 10).reverse();
  }, [propHistory, currentResult]);

  // Construct chart dataset
  const chartData = useMemo(() => {
    // If user has only 1 exam, provide helpful comparative context (ÖSYM target & benchmarks)
    if (allHistory.length === 1) {
      return [
        {
          name: 'Türkiye Ort.',
          shortName: 'Ortalama',
          isBenchmark: true,
          toplamNet: 44.5,
          gyNet: 22.0,
          gkNet: 22.5,
          p3Score: 68.2,
          turkce: 14.5,
          matematik: 7.5,
          tarih: 10.0,
          cografya: 7.0,
          vatandaslik: 4.0,
          guncel: 1.5,
        },
        {
          name: 'Atama Hedefi',
          shortName: 'Hedef 80+',
          isBenchmark: true,
          toplamNet: 78.0,
          gyNet: 40.0,
          gkNet: 38.0,
          p3Score: 82.5,
          turkce: 24.0,
          matematik: 16.0,
          tarih: 18.0,
          cografya: 12.0,
          vatandaslik: 6.0,
          guncel: 2.0,
        },
        {
          name: 'Bu Deneme',
          shortName: 'Deneme 1',
          isBenchmark: false,
          toplamNet: currentResult.totalNet,
          gyNet: currentResult.gyNet,
          gkNet: currentResult.gkNet,
          p3Score: currentResult.estimatedP3Score,
          turkce: currentResult.subjectStats.TURKCE?.net || 0,
          matematik: currentResult.subjectStats.MATEMATIK?.net || 0,
          tarih: currentResult.subjectStats.TARIH?.net || 0,
          cografya: currentResult.subjectStats.COGRAFYA?.net || 0,
          vatandaslik: currentResult.subjectStats.VATANDASLIK?.net || 0,
          guncel: currentResult.subjectStats.GUNCEL?.net || 0,
        },
      ];
    }

    // Real chronological exam data
    return allHistory.map((item, index) => {
      const isCurrent = item.id === currentResult.id;
      return {
        name: isCurrent ? 'Son Deneme' : `${index + 1}. Deneme`,
        shortName: `D-${index + 1}`,
        date: item.date,
        isBenchmark: false,
        toplamNet: item.totalNet,
        gyNet: item.gyNet,
        gkNet: item.gkNet,
        p3Score: item.estimatedP3Score,
        turkce: item.subjectStats.TURKCE?.net || 0,
        matematik: item.subjectStats.MATEMATIK?.net || 0,
        tarih: item.subjectStats.TARIH?.net || 0,
        cografya: item.subjectStats.COGRAFYA?.net || 0,
        vatandaslik: item.subjectStats.VATANDASLIK?.net || 0,
        guncel: item.subjectStats.GUNCEL?.net || 0,
      };
    });
  }, [allHistory, currentResult]);

  // Statistics calculation
  const stats = useMemo(() => {
    const realNets = allHistory.map((h) => h.totalNet);
    const avgNet = realNets.reduce((a, b) => a + b, 0) / realNets.length;
    const maxNet = Math.max(...realNets);
    const prevNet = allHistory.length > 1 ? allHistory[allHistory.length - 2].totalNet : null;
    const diff = prevNet !== null ? currentResult.totalNet - prevNet : null;

    return {
      avgNet: Number(avgNet.toFixed(2)),
      maxNet: Number(maxNet.toFixed(2)),
      diff: diff !== null ? Number(diff.toFixed(2)) : null,
      examCount: allHistory.length,
    };
  }, [allHistory, currentResult]);

  // Custom Apple-style Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl border border-[#E5E5EA] shadow-lg text-xs flex flex-col gap-2 min-w-[170px]">
        <div className="font-bold text-[#1D1D1F] border-b border-[#F0F0F2] pb-1.5 flex items-center justify-between">
          <span>{label}</span>
          {payload[0]?.payload?.isBenchmark && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold">
              Kıyaslama
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          {payload.map((entry: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-[#86868B] font-medium">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}:
              </span>
              <span className="font-bold tabular-numbers text-[#1D1D1F]">
                {entry.value} {entry.dataKey === 'p3Score' ? 'Puan' : 'Net'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E5EA] shadow-xs flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0F0F2]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0071E3] uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            Performans Trendi & Net Analizi
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight">
            Denemeler Arası Net Karşılaştırması
          </h3>
          <p className="text-xs sm:text-sm text-[#86868B] mt-0.5">
            {allHistory.length > 1
              ? `Kayıtlı ${allHistory.length} denemenin kronolojik net ve puan gelişim eğrisi.`
              : 'İlk denemenizin Türkiye ortalaması ve hedef atama eşiğiyle karşılaştırmalı analizi.'}
          </p>
        </div>

        {/* View Mode Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Segmented control for metrics */}
          <div className="flex items-center p-1 bg-[#F5F5F7] rounded-xl border border-[#E5E5EA] text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMetricMode('total')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                metricMode === 'total'
                  ? 'bg-white text-[#1D1D1F] shadow-xs'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              Toplam Net & P3
            </button>
            <button
              type="button"
              onClick={() => setMetricMode('gy_gk')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                metricMode === 'gy_gk'
                  ? 'bg-white text-[#1D1D1F] shadow-xs'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              GY vs GK
            </button>
            <button
              type="button"
              onClick={() => setMetricMode('subjects')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                metricMode === 'subjects'
                  ? 'bg-white text-[#1D1D1F] shadow-xs'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              Dersler
            </button>
          </div>

          {/* Line vs Area toggle */}
          <div className="flex items-center p-1 bg-[#F5F5F7] rounded-xl border border-[#E5E5EA]">
            <button
              type="button"
              onClick={() => setChartType('line')}
              className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                chartType === 'line'
                  ? 'bg-white text-[#0071E3] shadow-xs font-bold'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
              title="Çizgi Grafiği"
            >
              Çizgi
            </button>
            <button
              type="button"
              onClick={() => setChartType('area')}
              className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                chartType === 'area'
                  ? 'bg-white text-[#0071E3] shadow-xs font-bold'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
              title="Alan Grafiği"
            >
              Alan
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[#FBFBFD] border border-[#E5E5EA]">
          <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block mb-1">
            Mevcut Net
          </span>
          <div className="text-2xl font-extrabold text-[#0071E3] tabular-numbers">
            {currentResult.totalNet.toFixed(2)}
          </div>
          <span className="text-[11px] text-[#86868B] mt-0.5 block">120 soru üzerinden</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FBFBFD] border border-[#E5E5EA]">
          <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block mb-1">
            Önceki Denemeye Göre
          </span>
          <div className="flex items-center gap-1">
            {stats.diff !== null ? (
              <>
                {stats.diff >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-[#34C759]" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-[#FF3B30]" />
                )}
                <span
                  className={`text-2xl font-extrabold tabular-numbers ${
                    stats.diff >= 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'
                  }`}
                >
                  {stats.diff >= 0 ? `+${stats.diff}` : stats.diff}
                </span>
              </>
            ) : (
              <span className="text-2xl font-extrabold text-[#1D1D1F] tabular-numbers">
                İlk Deneme
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#86868B] mt-0.5 block">
            {stats.diff !== null ? 'Net farkı' : 'Referans oluşturuldu'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FBFBFD] border border-[#E5E5EA]">
          <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block mb-1">
            Ortalama Net
          </span>
          <div className="text-2xl font-extrabold text-[#1D1D1F] tabular-numbers">
            {stats.avgNet}
          </div>
          <span className="text-[11px] text-[#86868B] mt-0.5 block">Genel Deneme Ortalaması</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FBFBFD] border border-[#E5E5EA]">
          <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block mb-1">
            Zirve Net (Rekor)
          </span>
          <div className="text-2xl font-extrabold text-[#5856D6] tabular-numbers">
            {stats.maxNet}
          </div>
          <span className="text-[11px] text-[#86868B] mt-0.5 block">En yüksek skor</span>
        </div>
      </div>

      {/* Main Recharts Graphic Container */}
      <div className="w-full h-[320px] sm:h-[360px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F2" vertical={false} />
              <XAxis
                dataKey="shortName"
                stroke="#86868B"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#E5E5EA' }}
              />
              <YAxis
                stroke="#86868B"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#E5E5EA' }}
                domain={[0, metricMode === 'total' ? 100 : 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="circle"
              />

              {metricMode === 'total' && (
                <>
                  <ReferenceLine
                    y={70}
                    label={{
                      value: '70 Barajı',
                      fill: '#86868B',
                      fontSize: 10,
                      position: 'insideTopLeft',
                    }}
                    stroke="#D2D2D7"
                    strokeDasharray="4 4"
                  />
                  <ReferenceLine
                    y={85}
                    label={{
                      value: '85+ Atama Eşiği',
                      fill: '#34C759',
                      fontSize: 10,
                      position: 'insideTopLeft',
                    }}
                    stroke="#34C759"
                    strokeDasharray="3 3"
                    strokeOpacity={0.5}
                  />

                  <Line
                    type="monotone"
                    dataKey="toplamNet"
                    name="Toplam Net"
                    stroke="#0071E3"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#0071E3', strokeWidth: 2, stroke: '#FFFFFF' }}
                    activeDot={{ r: 8, stroke: '#0071E3', strokeWidth: 2, fill: '#FFFFFF' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="p3Score"
                    name="KPSS P3 Puanı"
                    stroke="#5856D6"
                    strokeWidth={2.5}
                    strokeDasharray="5 5"
                    dot={{ r: 4, fill: '#5856D6', strokeWidth: 2, stroke: '#FFFFFF' }}
                    activeDot={{ r: 7, stroke: '#5856D6', strokeWidth: 2, fill: '#FFFFFF' }}
                  />
                </>
              )}

              {metricMode === 'gy_gk' && (
                <>
                  <Line
                    type="monotone"
                    dataKey="gyNet"
                    name="Genel Yetenek (60 Soru)"
                    stroke="#0071E3"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#0071E3', strokeWidth: 2, stroke: '#FFFFFF' }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="gkNet"
                    name="Genel Kültür (60 Soru)"
                    stroke="#FF9500"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#FF9500', strokeWidth: 2, stroke: '#FFFFFF' }}
                    activeDot={{ r: 7 }}
                  />
                </>
              )}

              {metricMode === 'subjects' && (
                <>
                  <Line
                    type="monotone"
                    dataKey="turkce"
                    name="Türkçe"
                    stroke="#0071E3"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="matematik"
                    name="Matematik"
                    stroke="#5856D6"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="tarih"
                    name="Tarih"
                    stroke="#FF9500"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cografya"
                    name="Coğrafya"
                    stroke="#34C759"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="vatandaslik"
                    name="Vatandaşlık"
                    stroke="#AF52DE"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </>
              )}
            </LineChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
              <defs>
                <linearGradient id="colorTotalNet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0071E3" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0071E3" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorGY" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0071E3" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0071E3" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorGK" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF9500" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF9500" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F2" vertical={false} />
              <XAxis
                dataKey="shortName"
                stroke="#86868B"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#E5E5EA' }}
              />
              <YAxis
                stroke="#86868B"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#E5E5EA' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />

              {metricMode === 'total' && (
                <Area
                  type="monotone"
                  dataKey="toplamNet"
                  name="Toplam Net"
                  stroke="#0071E3"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorTotalNet)"
                />
              )}

              {metricMode === 'gy_gk' && (
                <>
                  <Area
                    type="monotone"
                    dataKey="gyNet"
                    name="Genel Yetenek"
                    stroke="#0071E3"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorGY)"
                  />
                  <Area
                    type="monotone"
                    dataKey="gkNet"
                    name="Genel Kültür"
                    stroke="#FF9500"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorGK)"
                  />
                </>
              )}

              {metricMode === 'subjects' && (
                <>
                  <Area
                    type="monotone"
                    dataKey="turkce"
                    name="Türkçe"
                    stroke="#0071E3"
                    strokeWidth={2}
                    fill="#0071E3"
                    fillOpacity={0.15}
                  />
                  <Area
                    type="monotone"
                    dataKey="matematik"
                    name="Matematik"
                    stroke="#5856D6"
                    strokeWidth={2}
                    fill="#5856D6"
                    fillOpacity={0.15}
                  />
                  <Area
                    type="monotone"
                    dataKey="tarih"
                    name="Tarih"
                    stroke="#FF9500"
                    strokeWidth={2}
                    fill="#FF9500"
                    fillOpacity={0.15}
                  />
                </>
              )}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Analytical Footnote */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F0F0F2] text-xs text-[#86868B]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" />
          <span>
            Hedef ÖSYM P3: <strong>85.00+</strong> puan için Genel Yetenek’te ~42 net, Genel Kültür’de ~40 net dengesi önerilir.
          </span>
        </div>
        <span className="font-medium text-[#1D1D1F]">
          Son Deneme Tarihi: {currentResult.date}
        </span>
      </div>
    </div>
  );
};
