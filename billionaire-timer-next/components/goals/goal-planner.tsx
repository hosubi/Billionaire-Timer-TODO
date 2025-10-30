import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { GoalSnapshot } from "@/lib/types";

export function GoalPlanner({ goal }: { goal: GoalSnapshot }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>목표 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-rate">현재 시급</Label>
            <Input id="current-rate" defaultValue={goal.currentRate} type="number" min={0} step={1000} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-rate">목표 시급</Label>
            <Input id="target-rate" defaultValue={goal.targetRate} type="number" min={0} step={1000} />
          </div>
          <Button className="w-full">계산하기</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>계산 결과</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ResultRow label="시급 격차" value={`₩${goal.gap.toLocaleString()}`} />
          <ResultRow label="목표 달성률" value={`${Math.round(goal.progress * 100)}%`} />
          <ResultRow label="필요 집중률" value={`${Math.round(goal.focusEfficiency * 100)}%`} />
          <ResultRow label="예상 달성일" value={`${goal.daysToTarget}일`} />
        </CardContent>
      </Card>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-neutral-100 bg-white px-3 py-2">
      <span className="text-neutral-500">{label}</span>
      <span className="font-semibold text-neutral-900">{value}</span>
    </div>
  );
}
