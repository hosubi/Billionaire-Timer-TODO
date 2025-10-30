import { TodoBoard } from "@/components/todos/todo-board";
import { mockDashboard } from "@/lib/mock-data";

export default function TodosPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">할 일 관리</h1>
        <p className="text-neutral-500">수익 잠재력을 기준으로 우선순위를 정리하세요.</p>
      </header>
      <TodoBoard todos={mockDashboard.todos} />
    </section>
  );
}
