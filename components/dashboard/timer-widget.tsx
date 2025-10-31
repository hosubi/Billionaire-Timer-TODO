"use client";

import { useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useTimerStore } from "@/store/timer-store";
import type { TimerSnapshot } from "@/lib/types";
import { cn } from "@/lib/utils";

const PRESETS = [15, 30, 45, 60, 90, 120];

export function TimerWidget({ timer }: { timer: TimerSnapshot }) {
  const { timeLeft, status, start, pause, reset, initialize, updateSnapshot, snapshot } = useTimerStore((state) => ({
    timeLeft: state.timeLeft,
    status: state.status,
    start: state.start,
    pause: state.pause,
    reset: state.reset,
    initialize: state.initialize,
    updateSnapshot: state.updateSnapshot,
    snapshot: state.snapshot
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

  const baseProfitPerMinute =
    snapshot.totalMinutes > 0 && snapshot.expectedProfit > 0
      ? snapshot.expectedProfit / snapshot.totalMinutes
      : timer.totalMinutes > 0
      ? timer.expectedProfit / timer.totalMinutes
      : 0;
  const baseLossPerMinute =
    snapshot.totalMinutes > 0 && snapshot.expectedLoss > 0
      ? snapshot.expectedLoss / snapshot.totalMinutes
      : timer.totalMinutes > 0
      ? timer.expectedLoss / timer.totalMinutes
      : 0;

  const projectedProfit = Math.round(baseProfitPerMinute * snapshot.totalMinutes);
  const projectedLoss = Math.round(baseLossPerMinute * snapshot.totalMinutes);

  const handleDurationChange = (value: number) => {
    const nextProfit = Math.round(baseProfitPerMinute * value);
    const nextLoss = Math.round(baseLossPerMinute * value);
    updateSnapshot((current) => ({
      ...current,
      totalMinutes: value,
      expectedProfit: nextProfit,
      expectedLoss: nextLoss
    }));
  };

  const gaugeValue = (snapshot.totalMinutes / PRESETS[PRESETS.length - 1]) * 100;

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div>
          <CardTitle>{snapshot.currentTask ?? timer.currentTask ?? "세션 선택"}</CardTitle>
          <p className="text-sm text-neutral-500">
            집중 시간을 선택해 도파민 타이머를 작동시키세요.
          </p>
        </div>
        <DurationGauge
          value={snapshot.totalMinutes}
          gaugeValue={gaugeValue}
          onChange={handleDurationChange}
          projectedProfit={projectedProfit}
          projectedLoss={projectedLoss}
        />
        <PresetButtons
          current={snapshot.totalMinutes}
          onSelect={(preset) => handleDurationChange(preset)}
        />
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
          예상 수익 ₩{projectedProfit.toLocaleString()} / 손실 리스크 ₩{projectedLoss.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}

type DurationGaugeProps = {
  value: number;
  gaugeValue: number;
  projectedProfit: number;
  projectedLoss: number;
  onChange: (value: number) => void;
};

function DurationGauge({ value, gaugeValue, onChange, projectedProfit, projectedLoss }: DurationGaugeProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>15분</span>
        <span>120분</span>
      </div>
      <Slider value={[value]} min={15} max={120} step={5} onValueChange={(values) => onChange(values[0] ?? value)} />
      <Progress value={gaugeValue} className="h-2" />
      <div className="flex justify-between text-sm text-neutral-600">
        <span>집중 시간 {value}분</span>
        <span className="font-medium">예상 ₩{projectedProfit.toLocaleString()} / 손실 ₩{projectedLoss.toLocaleString()}</span>
      </div>
    </div>
  );
}

function PresetButtons({ current, onSelect }: { current: number; onSelect: (value: number) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PRESETS.map((preset) => (
        <Button
          key={preset}
          variant="outline"
          size="sm"
          className={cn(preset === current ? "border-primary text-primary" : "text-neutral-500")}
          onClick={() => onSelect(preset)}
        >
          {preset}분
        </Button>
      ))}
    </div>
  );
}
