"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Timer, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { TodoSnapshot } from "@/lib/types";
import { useTodoStore } from "@/store/todo-store";
import { useTimerStore } from "@/store/timer-store";
import { cn } from "@/lib/utils";

const COLUMNS: Array<{ key: TodoSnapshot["status"]; title: string }> = [
  { key: "pending", title: "대기" },
  { key: "in-progress", title: "진행 중" },
  { key: "completed", title: "완료" }
];

type TodoBoardProps = {
  initialTodos?: TodoSnapshot[];
  hourlyRate?: number;
};

export function TodoBoard({ initialTodos = [], hourlyRate = 60000 }: TodoBoardProps) {
  const todos = useTodoStore((state) => state.todos);
  const initialize = useTodoStore((state) => state.initialize);

  useEffect(() => {
    if (initialTodos.length > 0) {
      initialize(initialTodos);
    }
  }, [initialTodos, initialize]);

  const grouped = useMemo(() => {
    return COLUMNS.map((column) => ({
      ...column,
      items: todos.filter((todo) => todo.status === column.key)
    }));
  }, [todos]);

  return (
    <div className="space-y-4">
      <AddTodoForm hourlyRate={hourlyRate} />
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
                column.items.map((todo) => (
                  <TodoCard key={todo.id} todo={todo} hourlyRate={hourlyRate} />
                ))
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AddTodoForm({ hourlyRate }: { hourlyRate: number }) {
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState(45);
  const addTodo = useTodoStore((state) => state.addTodo);

  const estimatedProfit = useMemo(() => Math.round((hourlyRate / 60) * minutes), [hourlyRate, minutes]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    addTodo({ title: title.trim(), minutes });
    setTitle("");
    setMinutes(45);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>새 태스크 추가</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="todo-title">태스크 제목</Label>
            <Input
              id="todo-title"
              placeholder="집중할 일을 입력하세요"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center justify-between text-sm font-medium">
              예상 소요 시간
              <span className="text-xs text-neutral-500">{minutes}분</span>
            </Label>
            <Slider
              value={[minutes]}
              min={15}
              max={180}
              step={5}
              onValueChange={(value) => setMinutes(value[0] ?? 15)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <span>예상 수익</span>
          <span className="font-semibold text-neutral-900">₩{estimatedProfit.toLocaleString()}</span>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            태스크 추가
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TodoCard({ todo, hourlyRate }: { todo: TodoSnapshot; hourlyRate: number }) {
  const updateStatus = useTodoStore((state) => state.updateStatus);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const updateTimerSnapshot = useTimerStore((state) => state.updateSnapshot);
  const startTimer = useTimerStore((state) => state.start);
  const profitEstimate = Math.round((hourlyRate / 60) * todo.minutes);
  const lossEstimate = Math.round(profitEstimate * 0.35);

  const actionButtons: Array<{ label: string; status: TodoSnapshot["status"] }> = [
    { label: "대기", status: "pending" },
    { label: "진행", status: "in-progress" },
    { label: "완료", status: "completed" }
  ];

  return (
    <div className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition hover:border-primary/50">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-neutral-900">{todo.title}</h4>
          <p className="text-xs text-neutral-500">예상 {todo.minutes}분 · 수익 ₩{profitEstimate.toLocaleString()}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => removeTodo(todo.id)} className="text-neutral-400 hover:text-red-500">
          <Trash className="h-4 w-4" />
          <span className="sr-only">삭제</span>
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <Badge variant={todo.status === "completed" ? "outline" : todo.status === "in-progress" ? "secondary" : "default"}>
          {statusLabel(todo.status)}
        </Badge>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            updateTimerSnapshot((current) => ({
              ...current,
              currentTask: todo.title,
              totalMinutes: todo.minutes,
              expectedProfit: profitEstimate,
              expectedLoss: lossEstimate
            }));
            startTimer();
          }}
        >
          <Timer className="mr-2 h-4 w-4" />
          타이머 시작
        </Button>
      </div>
      <div className="flex gap-2">
        {actionButtons.map((action) => (
          <Button
            key={action.status}
            variant="outline"
            size="sm"
            className={cn(
              "flex-1 text-xs",
              action.status === todo.status ? "border-primary text-primary" : "text-neutral-500"
            )}
            onClick={() => updateStatus(todo.id, action.status)}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function statusLabel(status: TodoSnapshot["status"]) {
  switch (status) {
    case "pending":
      return "대기";
    case "in-progress":
      return "진행 중";
    case "completed":
      return "완료";
    default:
      return status;
  }
}
