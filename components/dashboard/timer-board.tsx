"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TimerSession } from "@/lib/types";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { useTimerStore } from "@/store/timer-store";

const statusStyles: Record<TimerSession["status"], { variant: BadgeProps["variant"]; className?: string }> = {
  planned: { variant: "secondary" },
  running: { variant: "default" },
  completed: { variant: "outline" },
  missed: { variant: "outline", className: "border-red-200 text-red-600" }
};

export function TimerBoard({ sessions }: { sessions: TimerSession[] }) {
  const [selected, setSelected] = useState<TimerSession | null>(sessions.at(0) ?? null);
  const updateSnapshot = useTimerStore((state) => state.updateSnapshot);
  const startTimer = useTimerStore((state) => state.start);

  const summary = useMemo(() => {
    const totalMinutes = sessions.reduce((acc, cur) => acc + cur.minutes, 0);
    const potentialProfit = sessions.reduce((acc, cur) => acc + cur.profit, 0);
    const potentialLoss = sessions.reduce((acc, cur) => acc + cur.loss, 0);
    return { totalMinutes, potentialProfit, potentialLoss };
  }, [sessions]);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>세션 리스트</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4 transition hover:border-primary/50"
            >
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">{session.title}</h3>
                <p className="text-xs text-neutral-500">{session.minutes}분 · 예상 수익 ₩{session.profit.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge {...statusStyles[session.status]}>
                  {statusLabel(session.status)}
                </Badge>
                <Button size="sm" variant="outline" onClick={() => setSelected(session)}>
                  세부 정보
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    updateSnapshot((current) => ({
                      ...current,
                      currentTask: session.title,
                      totalMinutes: session.minutes,
                      expectedProfit: session.profit,
                      expectedLoss: session.loss
                    }));
                    startTimer();
                  }}
                >
                  <Play className="mr-2 h-4 w-4" />
                  바로 시작
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>요약</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <SummaryRow label="총 집중 시간" value={`${summary.totalMinutes}분`} />
          <SummaryRow label="잠재 수익" value={`₩${summary.potentialProfit.toLocaleString()}`} />
          <SummaryRow label="잠재 손실" value={`₩${summary.potentialLoss.toLocaleString()}`} />
          {selected ? (
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <h4 className="text-sm font-semibold text-neutral-900">선택된 세션</h4>
              <p className="text-sm text-neutral-600">{selected.title}</p>
              <p className="text-xs text-neutral-500">
                {selected.minutes}분 / 수익 ₩{selected.profit.toLocaleString()} / 손실 ₩{selected.loss.toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-xs text-neutral-500">세션을 선택해 세부 정보를 확인하세요.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2">
      <span className="text-neutral-500">{label}</span>
      <span className="font-semibold text-neutral-900">{value}</span>
    </div>
  );
}

function statusLabel(status: TimerSession["status"]) {
  switch (status) {
    case "planned":
      return "예정";
    case "running":
      return "진행 중";
    case "completed":
      return "완료";
    case "missed":
      return "미완료";
  }
}
