import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { GoalSnapshot } from "@/lib/types";
import type { GoalMetrics } from "@/lib/services/payroll";

type GoalSummaryProps = {
  goal: GoalSnapshot;
  metrics: GoalMetrics;
};

export function GoalSummary({ goal, metrics }: GoalSummaryProps) {
  const etaLabel = metrics.daysToTarget === 0 ? "오늘" : `${metrics.daysToTarget}일`;

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
          value={`₩${Math.round(metrics.current.monthly).toLocaleString()}`}
          caption={`시급 ₩${Math.round(metrics.current.hourly).toLocaleString()}`}
        />
        <Metric
          label="목표 월급"
          value={`₩${Math.round(metrics.target.monthly).toLocaleString()}`}
          caption={`연봉 ₩${Math.round(metrics.target.yearly).toLocaleString()}`}
        />
        <Metric
          label="필요 증가분"
          value={`₩${Math.round(metrics.gap.monthly).toLocaleString()}`}
          caption="추가 집중 세션 필요"
        />
        <div className="md:col-span-3 space-y-2">
          <div className="flex justify-between text-sm text-neutral-500">
            <span>진행률</span>
            <span>{Math.round(metrics.progress * 100)}%</span>
          </div>
          <Progress value={metrics.progress * 100} />
        </div>
        <div className="md:col-span-3 rounded-lg border border-neutral-100 bg-neutral-50 p-4 text-sm text-neutral-600">
          {metrics.focusMinutesPerDay === 0 ? (
            <span className="font-semibold text-neutral-800">이미 목표 수준에 도달했습니다. 새로운 챌린지를 설정해보세요!</span>
          ) : (
            <span>
              하루 집중 미션 <strong>{metrics.focusMinutesPerDay}분</strong> — 꾸준히 실행하면 연간{' '}
              <strong>₩{Math.round(metrics.yearlyGap).toLocaleString()}</strong> 격차를 메울 수 있어요.
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
