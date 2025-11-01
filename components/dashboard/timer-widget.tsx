"use client";

import { useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { TimerSnapshot } from "@/lib/types";
import { useTimerStore } from "@/store/timer-store";
import { cn } from "@/lib/utils";

const FOCUS_PRESETS = [15, 25, 35, 45, 60, 90];

const defaultTimerValue: TimerSnapshot = {
  totalMinutes: 45,
  currentTask: null,
  expectedProfit: 0,
  expectedLoss: 0,
  phase: "focus",
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  roundsUntilLongBreak: 4,
  completedRounds: 0
};

export function TimerWidget({ timer }: { timer: TimerSnapshot }) {
  const {
    snapshot,
    timeLeft,
    activeDuration,
    status,
    initialize,
    updateSnapshot,
    advancePhase,
    start,
    pause,
    reset
  } = useTimerStore((state) => ({
    snapshot: state.snapshot,
    timeLeft: state.timeLeft,
    activeDuration: state.activeDuration,
    status: state.status,
    initialize: state.initialize,
    updateSnapshot: state.updateSnapshot,
    advancePhase: state.advancePhase,
    start: state.start,
    pause: state.pause,
    reset: state.reset
  }));

  useEffect(() => {
    if (!useTimerStore.persist.hasHydrated()) return;
    const current = useTimerStore.getState();
    const isDefault =
      current.snapshot.currentTask === null &&
      current.snapshot.completedRounds === 0 &&
      current.snapshot.totalMinutes === defaultTimerValue.totalMinutes;
    if (isDefault) {
      initialize({
        ...defaultTimerValue,
        ...timer,
        phase: timer.phase ?? "focus"
      });
    }
  }, [initialize, timer]);

  useEffect(() => {
    return () => {
      const id = useTimerStore.getState().intervalId;
      if (id) clearInterval(id);
    };
  }, []);

  const [minutes, seconds] = useMemo(() => {
    const mm = Math.max(0, Math.floor(timeLeft / 60))
      .toString()
      .padStart(2, "0");
    const ss = Math.max(0, timeLeft % 60)
      .toString()
      .padStart(2, "0");
    return [mm, ss];
  }, [timeLeft]);

  const progress = activeDuration > 0 ? (1 - timeLeft / activeDuration) * 100 : 0;
  const isBreakPhase = snapshot.phase === "break";
  const isLongBreak =
    isBreakPhase &&
    snapshot.completedRounds > 0 &&
    snapshot.completedRounds % snapshot.roundsUntilLongBreak === 0;

  const projectedProfit =
    snapshot.totalMinutes > 0 ? Math.round((snapshot.expectedProfit / snapshot.totalMinutes) * snapshot.totalMinutes) : 0;
  const projectedLoss =
    snapshot.totalMinutes > 0 ? Math.round((snapshot.expectedLoss / snapshot.totalMinutes) * snapshot.totalMinutes) : 0;

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
              isBreakPhase ? "bg-emerald-50 text-emerald-600" : "bg-primary/10 text-primary"
            )}
          >
            {isBreakPhase ? (isLongBreak ? "롱 브레이크" : "숏 브레이크") : "포커스 라운드"}
          </span>
          <CardTitle className="mt-3 text-lg font-semibold">
            {snapshot.currentTask ?? timer.currentTask ?? "집중할 작업을 선택해 주세요"}
          </CardTitle>
          <p className="text-sm text-neutral-500">
            {isBreakPhase
              ? "세션 사이에 뇌를 쉬게 하고 다음 라운드를 준비하세요."
              : `라운드 ${snapshot.completedRounds + 1} / ${snapshot.roundsUntilLongBreak} — 집중 세션을 완료하면 보상이 증가해요.`}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <TimerGauge progress={progress} minutes={minutes} seconds={seconds} />

        <div className="grid gap-2 md:grid-cols-2">
          <Button onClick={start} disabled={status === "running"} className="w-full">
            {status === "running" ? "진행 중" : "시작"}
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={pause} disabled={status !== "running"} className="flex-1">
              일시정지
            </Button>
            <Button variant="outline" onClick={reset} className="flex-1">
              초기화
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-neutral-600">
            예상 수익 <strong>₩{snapshot.expectedProfit.toLocaleString()}</strong> · 손실 리스크{" "}
            <strong>₩{snapshot.expectedLoss.toLocaleString()}</strong>
          </div>
          <Button variant="ghost" size="sm" onClick={advancePhase} disabled={status === "running"}>
            다음 단계로 넘기기
          </Button>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <div className="mb-3 flex items-center justify-between text-sm font-semibold text-neutral-700">
            <span>라운드 설정</span>
            <span>{snapshot.completedRounds % snapshot.roundsUntilLongBreak}/{snapshot.roundsUntilLongBreak} 완료</span>
          </div>
          <div className="space-y-4">
            <PresetSelector
              label="포커스 시간"
              options={FOCUS_PRESETS}
              current={snapshot.totalMinutes}
              onSelect={(value) =>
                updateSnapshot((current) => ({
                  ...current,
                  totalMinutes: value,
                  expectedProfit:
                    current.expectedProfit && current.totalMinutes > 0
                      ? Math.round((current.expectedProfit / current.totalMinutes) * value)
                      : current.expectedProfit,
                  expectedLoss:
                    current.expectedLoss && current.totalMinutes > 0
                      ? Math.round((current.expectedLoss / current.totalMinutes) * value)
                      : current.expectedLoss
                }))
              }
            />
            <BreakSlider
              label="숏 브레이크"
              minutes={snapshot.shortBreakMinutes}
              onChange={(value) =>
                updateSnapshot((current) => ({
                  ...current,
                  shortBreakMinutes: value
                }))
              }
            />
            <BreakSlider
              label="롱 브레이크"
              minutes={snapshot.longBreakMinutes}
              onChange={(value) =>
                updateSnapshot((current) => ({
                  ...current,
                  longBreakMinutes: value
                }))
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TimerGauge({ progress, minutes, seconds }: { progress: number; minutes: string; seconds: string }) {
  const radius = 68;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative mx-auto h-44 w-44">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#d4af37"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <span className="text-3xl font-semibold tabular-nums">
          {minutes}:{seconds}
        </span>
        <span className="text-xs uppercase tracking-wide text-neutral-500">남은 시간</span>
      </div>
    </div>
  );
}

function PresetSelector({
  label,
  options,
  current,
  onSelect
}: {
  label: string;
  options: number[];
  current: number;
  onSelect: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option}
            size="sm"
            variant={option === current ? "default" : "outline"}
            onClick={() => onSelect(option)}
          >
            {option}분
          </Button>
        ))}
      </div>
    </div>
  );
}

function BreakSlider({
  label,
  minutes,
  onChange
}: {
  label: string;
  minutes: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>{label}</span>
        <span>{minutes}분</span>
      </div>
      <Slider
        min={3}
        max={30}
        step={1}
        value={[minutes]}
        onValueChange={([value]) => onChange(Number(value ?? minutes))}
      />
    </div>
  );
}
