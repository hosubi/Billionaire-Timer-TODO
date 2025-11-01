"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import type { GoalSnapshot } from "@/lib/types";
import { calculateGoalMetrics, PAYROLL_CONSTANTS, RateUnit } from "@/lib/services/payroll";
import { useBrowserCache } from "@/app/hooks/use-browser-cache";

type PlannerForm = {
  current: { value: number; unit: RateUnit };
  target: { value: number; unit: RateUnit };
  focusEfficiency: number;
};

const rateOptions: { value: RateUnit; label: string }[] = [
  { value: "hour", label: "시급" },
  { value: "day", label: "일급" },
  { value: "month", label: "월급" },
  { value: "year", label: "연봉" }
];

const defaultFocusEfficiency = 0.7;

export function GoalPlanner({ goal }: { goal: GoalSnapshot }) {
  const { load, save } = useBrowserCache();

  const [form, setForm] = useState<PlannerForm>(() =>
    load<PlannerForm>("goals", {
      current: { value: goal.currentRate || 50000, unit: "hour" },
      target: { value: goal.targetRate || 100000, unit: "hour" },
      focusEfficiency: goal.focusEfficiency || defaultFocusEfficiency
    })
  );

  const metrics = useMemo(
    () =>
      calculateGoalMetrics({
        current: form.current,
        target: form.target,
        focusEfficiency: form.focusEfficiency
      }),
    [form]
  );

  useEffect(() => {
    save("goals", form);
  }, [form, save]);

  const handleValueChange = (field: "current" | "target", value: number) => {
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value: Math.max(0, value)
      }
    }));
  };

  const handleUnitChange = (field: "current" | "target", unit: RateUnit) => {
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        unit
      }
    }));
  };

  const handleReset = () => {
    setForm({
      current: { value: goal.currentRate || 50000, unit: "hour" },
      target: { value: goal.targetRate || 100000, unit: "hour" },
      focusEfficiency: goal.focusEfficiency || defaultFocusEfficiency
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>급여 기반 목표 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RateFieldset
            title="현재 수입"
            value={form.current.value}
            unit={form.current.unit}
            onValueChange={(val) => handleValueChange("current", val)}
            onUnitChange={(unit) => handleUnitChange("current", unit)}
          />
          <RateFieldset
            title="목표 수입"
            value={form.target.value}
            unit={form.target.unit}
            onValueChange={(val) => handleValueChange("target", val)}
            onUnitChange={(unit) => handleUnitChange("target", unit)}
          />
          <div className="space-y-2">
            <Label className="flex items-center justify-between text-sm font-medium">
              집중 효율
              <span>{Math.round(form.focusEfficiency * 100)}%</span>
            </Label>
            <Slider
              min={0.4}
              max={1}
              step={0.05}
              value={[form.focusEfficiency]}
              onValueChange={([value]) =>
                setForm((prev) => ({ ...prev, focusEfficiency: Number(value ?? prev.focusEfficiency) }))
              }
            />
            <p className="text-xs text-neutral-500">
              하루 집중 가능한 시간 대비 실제 성과를 나타내는 값입니다.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleReset} variant="outline">
              기본값으로 리셋
            </Button>
            <Button className="flex-1" onClick={() => save("goals", form)}>
              계산 결과 저장
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>도파민 리포트</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-sm">
          <RateComparison metricsType="현재 수입" rates={metrics.current} />
          <RateComparison metricsType="목표 수입" rates={metrics.target} accent />
          <RateComparison metricsType="필요 증가분" rates={metrics.gap} highlight />

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-neutral-700">하루 집중 미션</Label>
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm">
              {metrics.focusMinutesPerDay === 0 ? (
                <p className="font-medium text-neutral-600">이미 목표를 달성했어요! 다음 목표를 설정해보세요.</p>
              ) : (
                <div className="space-y-1">
                  <p className="font-semibold text-neutral-900">
                    집중 {Math.ceil(metrics.focusMinutesPerDay)}분 / 하루
                  </p>
                  <p className="text-xs text-neutral-500">
                    (기준: {PAYROLL_CONSTANTS.WORK_HOURS_PER_DAY}시간 집중, 효율 {Math.round(form.focusEfficiency * 100)}%)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-neutral-700">목표 진행률</Label>
            <Progress value={metrics.progress * 100} />
            <div className="flex justify-between text-xs text-neutral-500">
              <span>연봉 격차 ₩{Math.round(metrics.yearlyGap).toLocaleString()}</span>
              <span>
                예상 달성일 {metrics.daysToTarget === 0 ? "오늘" : `${metrics.daysToTarget}일`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type RateFieldsetProps = {
  title: string;
  value: number;
  unit: RateUnit;
  onValueChange: (value: number) => void;
  onUnitChange: (unit: RateUnit) => void;
};

function RateFieldset({ title, value, unit, onValueChange, onUnitChange }: RateFieldsetProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold text-neutral-700">{title}</Label>
      <div className="grid gap-3 md:grid-cols-[2fr,1fr]">
        <Input
          type="number"
          min={0}
          step={1000}
          value={value}
          onChange={(event) => onValueChange(Number(event.target.value))}
          className="h-11 rounded-lg"
        />
        <select
          value={unit}
          onChange={(event) => onUnitChange(event.target.value as RateUnit)}
          className="h-11 rounded-lg border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-700"
        >
          {rateOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function RateComparison({
  metricsType,
  rates,
  highlight,
  accent
}: {
  metricsType: string;
  rates: { hourly: number; daily: number; monthly: number; yearly: number };
  highlight?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-lg border p-4 transition",
        highlight ? "border-primary/40 bg-primary/5" : "",
        accent ? "border-secondary/40 bg-secondary/5" : ""
      ].join(" ")}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{metricsType}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-neutral-600 md:grid-cols-4">
        <Metric label="시급" value={rates.hourly} />
        <Metric label="일급" value={rates.daily} />
        <Metric label="월급" value={rates.monthly} />
        <Metric label="연봉" value={rates.yearly} />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-white/60 px-3 py-2 shadow-sm">
      <p className="text-[10px] uppercase tracking-wide text-neutral-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-neutral-900">₩{Math.round(value).toLocaleString()}</p>
    </div>
  );
}
