"use client";

import { TodoBoard } from "@/components/todos/todo-board";
import { mockDashboard } from "@/lib/mock-data";
import { useBrowserCache } from "@/app/hooks/use-browser-cache";
import { calculateGoalMetrics } from "@/lib/services/payroll";

const defaultGoalCache = {
  current: { value: mockDashboard.goal.currentRate, unit: "hour" as const },
  target: { value: mockDashboard.goal.targetRate, unit: "hour" as const },
  focusEfficiency: mockDashboard.goal.focusEfficiency
};

export default function TodosPage() {
  const { load } = useBrowserCache();
  const goalCache = load("goals", defaultGoalCache);
  const metrics = calculateGoalMetrics({
    current: goalCache.current,
    target: goalCache.target,
    focusEfficiency: goalCache.focusEfficiency
  });

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Task Management</h1>
        <p className="text-neutral-500">
          Prioritize your tasks based on expected profit and complete them to earn dopamine rewards.
        </p>
      </header>
      <TodoBoard initialTodos={mockDashboard.todos} hourlyRate={metrics.current.hourly} />
    </section>
  );
}
