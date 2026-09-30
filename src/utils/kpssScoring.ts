import { ExamResult, Question, SubjectConfig, SubjectId, SubjectStat } from '../types/exam';

export const SUBJECTS: SubjectConfig[] = [
  {
    id: 'TURKCE',
    name: 'Türkçe',
    shortName: 'TR',
    range: [1, 30],
    questionCount: 30,
    color: '#0071E3',
  },
  {
    id: 'MATEMATIK',
    name: 'Matematik & Geometri',
    shortName: 'MAT',
    range: [31, 60],
    questionCount: 30,
    color: '#5856D6',
  },
  {
    id: 'TARIH',
    name: 'Tarih',
    shortName: 'TAR',
    range: [61, 87],
    questionCount: 27,
    color: '#AF52DE',
  },
  {
    id: 'COGRAFYA',
    name: 'Coğrafya',
    shortName: 'COĞ',
    range: [88, 105],
    questionCount: 18,
    color: '#34C759',
  },
  {
    id: 'VATANDASLIK',
    name: 'Vatandaşlık & Anayasa',
    shortName: 'VAT',
    range: [106, 114],
    questionCount: 9,
    color: '#FF9500',
  },
  {
    id: 'GUNCEL',
    name: 'Güncel Bilgiler',
    shortName: 'GÜN',
    range: [115, 120],
    questionCount: 6,
    color: '#FF2D55',
  },
];

export const TOTAL_EXAM_SECONDS = 130 * 60; // 130 minutes (7800 seconds)

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s} saniye`;
  return `${m} dakika ${s > 0 ? `${s} sn` : ''}`;
}

/**
 * Calculates standard KPSS Lisans P3 Score based on ÖSYM standardized distribution:
 * Genel Yetenek (60 Q) + Genel Kültür (60 Q)
 * 4 incorrect answers penalize 1 correct answer (Net = D - Y/4).
 */
export function calculateExamResult(
  questions: Question[],
  answers: Record<number, number | null>,
  elapsedSeconds: number
): ExamResult {
  const subjectStats: Record<SubjectId, SubjectStat> = {
    TURKCE: { subjectId: 'TURKCE', name: 'Türkçe', total: 30, correct: 0, wrong: 0, empty: 0, net: 0, successRate: 0 },
    MATEMATIK: { subjectId: 'MATEMATIK', name: 'Matematik & Geometri', total: 30, correct: 0, wrong: 0, empty: 0, net: 0, successRate: 0 },
    TARIH: { subjectId: 'TARIH', name: 'Tarih', total: 27, correct: 0, wrong: 0, empty: 0, net: 0, successRate: 0 },
    COGRAFYA: { subjectId: 'COGRAFYA', name: 'Coğrafya', total: 18, correct: 0, wrong: 0, empty: 0, net: 0, successRate: 0 },
    VATANDASLIK: { subjectId: 'VATANDASLIK', name: 'Vatandaşlık', total: 9, correct: 0, wrong: 0, empty: 0, net: 0, successRate: 0 },
    GUNCEL: { subjectId: 'GUNCEL', name: 'Güncel Bilgiler', total: 6, correct: 0, wrong: 0, empty: 0, net: 0, successRate: 0 },
  };

  let totalCorrect = 0;
  let totalWrong = 0;
  let totalEmpty = 0;

  questions.forEach((q) => {
    const userAnswer = answers[q.id];
    const stat = subjectStats[q.subjectId];

    if (userAnswer === null || userAnswer === undefined) {
      totalEmpty++;
      stat.empty++;
    } else if (userAnswer === q.correctAnswer) {
      totalCorrect++;
      stat.correct++;
    } else {
      totalWrong++;
      stat.wrong++;
    }
  });

  // Calculate Net and success rates per subject
  Object.values(subjectStats).forEach((stat) => {
    stat.net = Number((stat.correct - stat.wrong * 0.25).toFixed(2));
    stat.successRate = stat.total > 0 ? Math.max(0, Math.round((stat.net / stat.total) * 100)) : 0;
  });

  const totalNet = Number((totalCorrect - totalWrong * 0.25).toFixed(2));
  const gyNet = Number((subjectStats.TURKCE.net + subjectStats.MATEMATIK.net).toFixed(2));
  const gkNet = Number(
    (
      subjectStats.TARIH.net +
      subjectStats.COGRAFYA.net +
      subjectStats.VATANDASLIK.net +
      subjectStats.GUNCEL.net
    ).toFixed(2)
  );

  // Realistic ÖSYM P3 Formula:
  // Base constant ~ 39.5
  // GY Net weight ~ 0.512
  // GK Net weight ~ 0.496
  // Range: 35.00 min to 100.00 max
  let p3 = 39.5 + (gyNet * 0.512) + (gkNet * 0.496);
  if (totalNet <= 0) p3 = 35.0;
  if (p3 > 100) p3 = 100.0;
  if (p3 < 35) p3 = 35.0;

  const now = Date.now();
  return {
    id: `exam-${now}`,
    date: new Date(now).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    timestamp: now,
    elapsedSeconds,
    totalQuestions: questions.length,
    totalCorrect,
    totalWrong,
    totalEmpty,
    totalNet,
    gyNet,
    gkNet,
    estimatedP3Score: Number(p3.toFixed(2)),
    subjectStats,
    answers,
  };
}

const STORAGE_KEY = 'kpss_lab_history_v1';

export function saveExamResult(result: ExamResult): void {
  try {
    const existing = getExamHistory();
    const updated = [result, ...existing].slice(0, 20); // Keep last 20
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save exam history', e);
  }
}

export function getExamHistory(): ExamResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}
