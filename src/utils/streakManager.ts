export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  historyDates: string[]; // YYYY-MM-DD[]
  freezesRemaining: number;
}

const STORAGE_KEY = 'kpss_study_streak';

function getTodayStr(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function getYesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export function getStreakData(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}

  // Default state for new candidate
  return {
    currentStreak: 1,
    longestStreak: 1,
    lastActiveDate: getTodayStr(),
    historyDates: [getTodayStr()],
    freezesRemaining: 1,
  };
}

export function recordDailyActivity(): StreakData {
  const today = getTodayStr();
  const yesterday = getYesterdayStr();
  const current = getStreakData();

  if (current.lastActiveDate === today) {
    // Already recorded today
    return current;
  }

  let newStreak = current.currentStreak;
  let newFreezes = current.freezesRemaining;

  if (current.lastActiveDate === yesterday) {
    // Consecutive day!
    newStreak += 1;
  } else {
    // Missed a day: check if freeze can save it
    if (newFreezes > 0) {
      newFreezes -= 1;
      newStreak += 1; // Saved by freeze!
    } else {
      newStreak = 1; // Streak reset to 1
    }
  }

  const updated: StreakData = {
    currentStreak: newStreak,
    longestStreak: Math.max(current.longestStreak, newStreak),
    lastActiveDate: today,
    historyDates: Array.from(new Set([...current.historyDates, today])).slice(-60),
    freezesRemaining: newFreezes,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}

  return updated;
}
