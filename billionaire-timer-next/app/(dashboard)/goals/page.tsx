import { GoalPlanner } from "@/components/goals/goal-planner";
import { mockDashboard } from "@/lib/mock-data";

export default function GoalsPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">목표 설정</h1>
        <p className="text-neutral-500">현재 시급과 목표 시급을 입력해 전략을 세워보세요.</p>
      </header>
      <GoalPlanner goal={mockDashboard.goal} />
    </section>
  );
}
