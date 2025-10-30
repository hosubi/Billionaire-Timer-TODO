"use client";

import { useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTimerStore } from "@/store/timer-store";
import type { TimerSnapshot } from "@/lib/types";

export function TimerWidget({ timer }: { timer: TimerSnapshot }) {
  const { timeLeft, status, start, pause, reset, initialize } = useTimerStore((state) => ({
    timeLeft: state.timeLeft,
    status: state.status,
    start: state.start,
    pause: state.pause,
    reset: state.reset,
    initialize: state.initialize
  }));

  useEffect(() => {
    initialize(timer);
  }, [initialize, timer]);

  useEffect(() => {
    return () => {
      const id = useTimerStore.getState().intervalId;
      if (id) {
        clearInterval(id);
      }
    };
  }, []);

  const [minutes, seconds] = useMemo(() => {
    const formattedMinutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const formattedSeconds = (timeLeft % 60).toString().padStart(2, "0");
    return [formattedMinutes, formattedSeconds];
  }, [timeLeft]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{timer.currentTask ?? "세션 선택"}</CardTitle>
        <p className="text-sm text-neutral-500">선택한 세션 길이 {timer.totalMinutes}분</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <span className="text-5xl font-mono font-semibold tabular-nums">
          {minutes}:{seconds}
        </span>
        <div className="flex gap-2">
          <Button onClick={start} disabled={status === "running"}>
            시작
          </Button>
          <Button variant="secondary" onClick={pause} disabled={status !== "running"}>
            일시정지
          </Button>
          <Button variant="outline" onClick={reset}>
            초기화
          </Button>
        </div>
        <p className="text-sm text-neutral-500">
          예상 수익 ₩{timer.expectedProfit.toLocaleString()} / 손실 리스크 ₩{timer.expectedLoss.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
