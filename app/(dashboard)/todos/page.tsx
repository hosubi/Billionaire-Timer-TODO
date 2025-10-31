import { TodoBoard } from "@/components/todos/todo-board";
import { mockDashboard } from "@/lib/mock-data";

export default function TodosPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Task Management</h1>
        <p className="text-neutral-500">
          Prioritize your tasks based on profit potential and estimated effort.
        </p>
      </header>
      <TodoBoard initialTodos={mockDashboard.todos} hourlyRate={mockDashboard.goal.targetRate} />
    </section>
  );
}

