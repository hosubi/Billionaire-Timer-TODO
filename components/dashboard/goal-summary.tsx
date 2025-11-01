import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { GoalSnapshot } from "@/lib/types";
import type { GoalMetrics } from "@/lib/services/payroll";

export function GoalSummary({
  goal,
  metrics
}: {
  goal: GoalSnapshot;
  metrics?: GoalMetrics;
}) {
  const resolved: GoalMetrics =
    metrics ??
    ({
      current: {
        hourly: goal.currentRate,
        daily: goal.currentRate,
        monthly: goal.currentRate,
        yearly: goal.currentRate
      },
      target: {
        hourly: goal.targetRate,
        daily: goal.targetRate,
        monthly: goal.targetRate,
        yearly: goal.targetRate
      },
      gap: {
        hourly: goal.gap,
        daily: goal.gap,
        monthly: goal.gap,
        yearly: goal.gap
      },
      yearlyGap: goal.gap * 12,
      focusMinutesPerDay: 0,
      daysToTarget: goal.daysToTarget,
      progress: goal.progress
    } as GoalMetrics);

  const etaLabel = resolved.daysToTarget === 0 ? "오늘" : `${resolved.daysToTarget}일`;

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>목표 수입 현황</CardTitle>
          <p className="text-sm text-neutral-500">목표 달성까지 예상 {etaLabel}</p>
        </div>
        <Badge variant="secondary">{Math.round(goal.focusEfficiency * 100)}% 집중 효율</Badge>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <Metric
          label="현재 월급"
          value={`₩${Math.round(resolved.current.monthly).toLocaleString()}`}
          caption={`시급 ₩${Math.round(resolved.current.hourly).toLocaleString()}`}
        />
        <Metric
          label="목표 월급"
          value={`₩${Math.round(resolved.target.monthly).toLocaleString()}`}
          caption={`연봉 ₩${Math.round(resolved.target.yearly).toLocaleString()}`}
        />
        <Metric
          label="필요 증가분"
          value={`₩${Math.round(resolved.gap.monthly).toLocaleString()}`}
          caption="추가 집중 세션 필요"
        />
        <div className="md:col-span-3 space-y-2">
          <div className="flex justify-between text-sm text-neutral-500">
            <span>진행률</span>
            <span>{Math.round(resolved.progress * 100)}%</span>
          </div>
          <Progress value={resolved.progress * 100} />
        </div>
        <div className="md:col-span-3 rounded-lg border border-neutral-100 bg-neutral-50 p-4 text-sm text-neutral-600">
          {resolved.focusMinutesPerDay === 0 ? (
            <span className="font-semibold text-neutral-800">이미 목표 수준에 도달했습니다. 새로운 챌린지를 설정해보세요!</span>
          ) : (
            <span>
              하루 집중 미션 <strong>{resolved.focusMinutesPerDay}분</strong> — 꾸준히 실행하면 연간{" "}
              <strong>₩{Math.round(resolved.yearlyGap).toLocaleString()}</strong> 격차를 메울 수 있어요.
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Metric({
  label,
  value,
  caption
}: {
  label: string;
  value: string;
  caption?: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-100 bg-white p-4 shadow-sm">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-neutral-900">{value}</p>
      {caption ? <p className="text-xs text-neutral-400">{caption}</p> : null}
    </div>
  );
}
