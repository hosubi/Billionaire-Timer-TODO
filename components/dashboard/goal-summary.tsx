import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { GoalSnapshot } from "@/lib/types";

export function GoalSummary({ goal }: { goal: GoalSnapshot }) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>목표 수입 현황</CardTitle>
          <p className="text-sm text-neutral-500">목표 달성까지 예상 {goal.daysToTarget}일</p>
        </div>
        <Badge variant="secondary">{Math.round(goal.focusEfficiency * 100)}% 집중 효율</Badge>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <Metric label="현재 시급" value={`₩${goal.currentRate.toLocaleString()}`} />
        <Metric label="목표 시급" value={`₩${goal.targetRate.toLocaleString()}`} />
        <Metric label="격차" value={`₩${goal.gap.toLocaleString()}`} trend="집중 세션 반복 필요" />
        <div className="md:col-span-3 space-y-2">
          <div className="flex justify-between text-sm text-neutral-500">
            <span>달성률</span>
            <span>{Math.round(goal.progress * 100)}%</span>
          </div>
          <Progress value={goal.progress * 100} />
        </div>
      </CardContent>
    </Card>
  );
}

function Metric({ label, value, trend }: { label: string; value: string; trend?: string }) {
  return (
    <div className="rounded-lg border border-neutral-100 bg-white p-4 shadow-sm">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
      {trend ? <p className="text-xs text-primary">{trend}</p> : null}
    </div>
  );
}
