import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { TodoSnapshot } from "@/lib/types";

const statusLabel: Record<TodoSnapshot["status"], string> = {
  pending: "대기",
  "in-progress": "진행 중",
  completed: "완료"
};

export function TodoSnapshot({ todos }: { todos: TodoSnapshot[] }) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>우선순위 할 일</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>태스크</TableHead>
              <TableHead>예상 시간</TableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell className="font-medium">{todo.title}</TableCell>
                <TableCell>{todo.minutes}분</TableCell>
                <TableCell>{statusLabel[todo.status]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
