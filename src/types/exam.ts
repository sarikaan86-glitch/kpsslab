export type SubjectId = 'TURKCE' | 'MATEMATIK' | 'TARIH' | 'COGRAFYA' | 'VATANDASLIK' | 'GUNCEL';

export type QuestionType = 'single_choice' | 'true_false' | 'matching' | 'ordering';

export interface SubjectConfig {
  id: SubjectId;
  name: string;
  shortName: string;
  range: [number, number]; // 1-indexed [start, end]
  questionCount: number;
  color: string;
}

export interface QuestionMedia {
  type: 'image' | 'chart' | 'table' | 'video' | 'map';
  title?: string;
  caption?: string;
  url?: string;
  chartType?: 'bar' | 'pie';
  chartData?: { name: string; value: number; color?: string }[];
  tableData?: { headers: string[]; rows: string[][] };
  interactivePoints?: { label: string; x: number; y: number; desc?: string }[];
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface Question {
  id: number; // 1 to 120
  subjectId: SubjectId;
  topic: string;
  question: string;
  context?: string; // e.g. text passage or preamble
  questionType?: QuestionType; // default is 'single_choice'
  media?: QuestionMedia; // graphic, table, map, or video simulation
  options: string[]; // typically A, B, C, D, E or 2 for true/false
  correctAnswer: number; // 0=A, 1=B, 2=C, 3=D, 4=E (or 0=Doğru, 1=Yanlış)
  explanation: string;
  matchingPairs?: MatchingPair[]; // For matching question types
  orderingItems?: string[]; // For chronological / logical ordering question types
  correctOrder?: number[]; // Target indices for ordering
}

export interface ActiveExamSnapshot {
  currentIndex: number;
  answers: Record<number, number | null>;
  marked: Record<number, boolean>;
  timeRemainingSeconds: number;
  lastSavedAt: number;
}

export interface UserExamState {
  answers: Record<number, number | null>; // questionId -> option index (0..4) or null
  marked: Record<number, boolean>; // questionId -> flagged
  timeRemainingSeconds: number; // starts at 130 * 60 (7800s)
  isFinished: boolean;
  startedAt: string;
  completedAt?: string;
  elapsedSeconds: number;
}

export interface SubjectStat {
  subjectId: SubjectId;
  name: string;
  total: number;
  correct: number;
  wrong: number;
  empty: number;
  net: number;
  successRate: number;
}

export interface ExamResult {
  id: string;
  date: string;
  timestamp?: number;
  elapsedSeconds: number;
  totalQuestions: number;
  totalCorrect: number;
  totalWrong: number;
  totalEmpty: number;
  totalNet: number;
  gyNet: number; // Genel Yetenek (Türkçe + Mat)
  gkNet: number; // Genel Kültür (Tarih + Coğ + Vat + Güncel)
  estimatedP3Score: number;
  subjectStats: Record<SubjectId, SubjectStat>;
  answers: Record<number, number | null>;
}
