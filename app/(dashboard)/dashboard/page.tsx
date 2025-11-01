"use client";

import { useMemo } from "react";
import { GoalSummary } from "@/components/dashboard/goal-summary";
import { TimerWidget } from "@/components/dashboard/timer-widget";
import { TodoSnapshot } from "@/components/dashboard/todo-snapshot";
import { ProfitOverview } from "@/components/dashboard/profit-overview";
import { StreakPanel } from "@/components/dashboard/streak-panel";
import { mockDashboard } from "@/lib/mock-data";
import { useBrowserCache } from "@/app/hooks/use-browser-cache";
import { useTodoStore } from "@/store/todo-store";
import { useTimerStore } from "@/store/timer-store";
import type { GoalSnapshot } from "@/lib/types";
import { calculateGoalMetrics } from "@/lib/services/payroll";

const defaultGoalCache = {
  current: { value: mockDashboard.goal.currentRate, unit: "hour" as const },
  target: { value: mockDashboard.goal.targetRate, unit: "hour" as const },
  focusEfficiency: mockDashboard.goal.focusEfficiency
};

export default function DashboardPage() {
  const { load } = useBrowserCache();
  const todos = useTodoStore((state) => state.todos);
  const timerSnapshot = useTimerStore((state) => state.snapshot);

  const goalsCache = load("goals", defaultGoalCache);
  const metrics = useMemo(
    () =>
      calculateGoalMetrics({
        current: goalsCache.current,
        target: goalsCache.target,
        focusEfficiency: goalsCache.focusEfficiency
      }),
    [goalsCache]
  );

  const goalSummary: GoalSnapshot = {
    currentRate: Math.round(metrics.current.monthly),
    targetRate: Math.round(metrics.target.monthly),
    gap: Math.round(metrics.gap.monthly),
    daysToTarget: metrics.daysToTarget,
    progress: metrics.progress,
    focusEfficiency: goalsCache.focusEfficiency
  };

  const displayTodos = todos.length > 0 ? todos : mockDashboard.todos;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="md:col-span-2 xl:col-span-3">
        <GoalSummary goal={goalSummary} metrics={metrics} />
      </div>
      <StreakPanel streak={mockDashboard.streak} />
      <div className="md:col-span-2 xl:col-span-2">
        <TimerWidget timer={timerSnapshot} />
      </div>
      <TodoSnapshot todos={displayTodos} hourlyRate={metrics.current.hourly} />
      <ProfitOverview profit={mockDashboard.profit} />
    </div>
  );
}
