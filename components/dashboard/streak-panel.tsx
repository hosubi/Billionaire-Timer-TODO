import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StreakSnapshot } from "@/lib/types";

export function StreakPanel({ streak }: { streak: StreakSnapshot }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>집중 스트릭</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <Row label="현재 연속 성공" value={`${streak.current}일`} />
        <Row label="최장 기록" value={`${streak.longest}일`} />
        <Row label="성공 세션" value={`${streak.successfulSessions}회`} />
        <Row label="실패 세션" value={`${streak.failedSessions}회`} />
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-neutral-100 bg-white px-3 py-2">
      <span className="text-neutral-500">{label}</span>
      <span className="font-semibold text-neutral-900">{value}</span>
    </div>
  );
}
