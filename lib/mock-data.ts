import type {
  DashboardSnapshot,
  IdeaSnapshot,
  SettingsSnapshot,
  StatsSnapshot,
  TimerSession
} from "@/lib/types";

export const mockDashboard: DashboardSnapshot = {
  goal: {
    currentRate: 55000,
    targetRate: 110000,
    gap: 55000,
    daysToTarget: 42,
    progress: 0.38,
    focusEfficiency: 0.7
  },
  streak: {
    current: 6,
    longest: 14,
    successfulSessions: 58,
    failedSessions: 9
  },
  timer: {
    totalMinutes: 45,
    currentTask: "프리미엄 제안서 초안 작성",
    expectedProfit: 120000,
    expectedLoss: 28000,
    phase: "focus",
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    roundsUntilLongBreak: 4,
    completedRounds: 2
  },
  todos: [
    { id: "t1", title: "신규 리드 분석", status: "in-progress", minutes: 45 },
    { id: "t2", title: "블로그 콘셉트 피드백 정리", status: "pending", minutes: 30 },
    { id: "t3", title: "투자자 발표 슬라이드 개선", status: "completed", minutes: 60 }
  ],
  profit: {
    weekProfit: 840000,
    weekLoss: 180000,
    chart: [
      { day: "월", profit: 120000, loss: 25000 },
      { day: "화", profit: 150000, loss: 40000 },
      { day: "수", profit: 210000, loss: 30000 },
      { day: "목", profit: 180000, loss: 50000 },
      { day: "금", profit: 180000, loss: 35000 }
    ]
  }
};

export const mockTimerSessions: TimerSession[] = [
  {
    id: "s1",
    title: "프리미엄 제안서 작성",
    minutes: 60,
    status: "running",
    profit: 180000,
    loss: 40000
  },
  {
    id: "s2",
    title: "투자자 미팅 리허설",
    minutes: 45,
    status: "planned",
    profit: 120000,
    loss: 30000
  },
  {
    id: "s3",
    title: "콘텐츠 아이디어 리서치",
    minutes: 30,
    status: "completed",
    profit: 60000,
    loss: 0
  }
];

export const mockIdeas: IdeaSnapshot[] = [
  { id: "i1", content: "하이엔드 고객 웨비나 시리즈", createdAt: "2025-10-20", potential: "high" },
  { id: "i2", content: "VIP 멤버십 온보딩 메일링", createdAt: "2025-10-22", potential: "medium" },
  { id: "i3", content: "AI 작업 추천 모델 고도화", createdAt: "2025-10-24", potential: "high" }
];

export const mockStats: StatsSnapshot = {
  productivity: [
    { label: "집중 세션", value: 38 },
    { label: "완료 태스크", value: 24 },
    { label: "아이디어 전환", value: 6 }
  ],
  successRate: 0.78,
  focusScore: 0.84,
  revenueSeries: [
    { label: "9월 1주", profit: 720000, loss: 210000 },
    { label: "9월 2주", profit: 840000, loss: 180000 },
    { label: "9월 3주", profit: 880000, loss: 220000 },
    { label: "9월 4주", profit: 910000, loss: 160000 }
  ]
};

export const mockSettings: SettingsSnapshot = {
  showLoss: true,
  siteWarning: true,
  notifications: true,
  sound: false,
  motivationBanner: true,
  autoReschedule: true,
  focusEfficiency: 0.7
};
