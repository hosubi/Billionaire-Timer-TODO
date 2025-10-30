import { GoalSummary } from "@/components/dashboard/goal-summary";
import { TimerWidget } from "@/components/dashboard/timer-widget";
import { TodoSnapshot } from "@/components/dashboard/todo-snapshot";
import { ProfitOverview } from "@/components/dashboard/profit-overview";
import { StreakPanel } from "@/components/dashboard/streak-panel";
import { mockDashboard } from "@/lib/mock-data";

export default function DashboardPage() {
  const snapshot = mockDashboard;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="md:col-span-2 xl:col-span-3">
        <GoalSummary goal={snapshot.goal} />
      </div>
      <StreakPanel streak={snapshot.streak} />
      <div className="md:col-span-2 xl:col-span-2">
        <TimerWidget timer={snapshot.timer} />
      </div>
      <TodoSnapshot todos={snapshot.todos} />
      <ProfitOverview profit={snapshot.profit} />
    </div>
  );
}
