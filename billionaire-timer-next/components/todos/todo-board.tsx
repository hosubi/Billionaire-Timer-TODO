import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TodoSnapshot } from "@/lib/types";

const columns: Array<{ key: TodoSnapshot["status"]; title: string }> = [
  { key: "pending", title: "대기" },
  { key: "in-progress", title: "진행 중" },
  { key: "completed", title: "완료" }
];

export function TodoBoard({ todos }: { todos: TodoSnapshot[] }) {
  const grouped = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      items: todos.filter((todo) => todo.status === column.key)
    }));
  }, [todos]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {grouped.map((column) => (
        <Card key={column.key}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{column.title}</CardTitle>
            <Badge variant="outline">{column.items.length}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {column.items.length === 0 ? (
              <p className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-500">
                아직 태스크가 없습니다.
              </p>
            ) : (
              column.items.map((todo) => <TodoCard key={todo.id} todo={todo} />)
            )}
            {column.key === "pending" ? (
              <Button variant="outline" className="w-full">
                새 태스크 추가
              </Button>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TodoCard({ todo }: { todo: TodoSnapshot }) {
  const badgeVariant = todo.status === "completed" ? "outline" : todo.status === "in-progress" ? "secondary" : "default";

  return (
    <div className="space-y-2 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold">{todo.title}</h4>
        <Badge variant={badgeVariant}>예상 {todo.minutes}분</Badge>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">
          타이머 시작
        </Button>
        <Button variant="outline" size="sm">
          상세
        </Button>
      </div>
    </div>
  );
}
