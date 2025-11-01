export type GoalSnapshot = {
  currentRate: number;
  targetRate: number;
  gap: number;
  daysToTarget: number;
  progress: number;
  focusEfficiency: number;
};

export type StreakSnapshot = {
  current: number;
  longest: number;
  successfulSessions: number;
  failedSessions: number;
};

export type TimerSnapshot = {
  totalMinutes: number;
  currentTask: string | null;
  expectedProfit: number;
  expectedLoss: number;
  phase: "focus" | "break";
  shortBreakMinutes: number;
  longBreakMinutes: number;
  roundsUntilLongBreak: number;
  completedRounds: number;
};

export type TodoSnapshot = {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
  minutes: number;
};

export type ProfitSnapshot = {
  weekProfit: number;
  weekLoss: number;
  chart: {
    day: string;
    profit: number;
    loss: number;
  }[];
};

export type IdeaSnapshot = {
  id: string;
  content: string;
  createdAt: string;
  potential: "high" | "medium" | "low";
};

export type StatsSnapshot = {
  productivity: {
    label: string;
    value: number;
  }[];
  successRate: number;
  focusScore: number;
  revenueSeries: {
    label: string;
    profit: number;
    loss: number;
  }[];
};

export type SettingsSnapshot = {
  showLoss: boolean;
  siteWarning: boolean;
  notifications: boolean;
  sound: boolean;
  motivationBanner: boolean;
  autoReschedule: boolean;
  focusEfficiency: number;
};

export type TimerSession = {
  id: string;
  title: string;
  minutes: number;
  status: "planned" | "running" | "completed" | "missed";
  profit: number;
  loss: number;
};

export type DashboardSnapshot = {
  goal: GoalSnapshot;
  streak: StreakSnapshot;
  timer: TimerSnapshot;
  todos: TodoSnapshot[];
  profit: ProfitSnapshot;
};
