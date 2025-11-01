import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { TodoSnapshot } from "@/lib/types";

const statusLabel: Record<TodoSnapshot["status"], string> = {
  pending: "대기",
  "in-progress": "진행 중",
  completed: "완료"
};

type TodoSnapshotProps = {
  todos: TodoSnapshot[];
  hourlyRate?: number;
};

export function TodoSnapshot({ todos, hourlyRate = 0 }: TodoSnapshotProps) {
  const ratePerMinute = hourlyRate > 0 ? hourlyRate / 60 : 0;

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>우선순위 작업</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>태스크</TableHead>
              <TableHead>예상 시간</TableHead>
              <TableHead>도파민 보상</TableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-sm text-neutral-500">
                  아직 등록된 작업이 없습니다. 새로운 미션을 추가해 도파민 코인을 모아보세요!
                </TableCell>
              </TableRow>
            ) : (
              todos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell className="font-medium">{todo.title}</TableCell>
                  <TableCell>{todo.minutes}분</TableCell>
                  <TableCell>
                    {ratePerMinute === 0
                      ? "-"
                      : `₩${Math.round(ratePerMinute * todo.minutes).toLocaleString()}`}
                  </TableCell>
                  <TableCell>{statusLabel[todo.status]}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
