const WORK_HOURS_PER_DAY = 6;
const WORK_DAYS_PER_MONTH = 22;
const MONTHS_PER_YEAR = 12;

export type RateUnit = "hour" | "day" | "month" | "year";

export type RateSnapshot = {
  hourly: number;
  daily: number;
  monthly: number;
  yearly: number;
};

export type RateInput = {
  value: number;
  unit: RateUnit;
};

const clamp = (value: number) => (Number.isFinite(value) ? value : 0);

export function toHourly(value: number, unit: RateUnit) {
  switch (unit) {
    case "day":
      return clamp(value / WORK_HOURS_PER_DAY);
    case "month":
      return clamp(value / (WORK_HOURS_PER_DAY * WORK_DAYS_PER_MONTH));
    case "year":
      return clamp(value / (WORK_HOURS_PER_DAY * WORK_DAYS_PER_MONTH * MONTHS_PER_YEAR));
    case "hour":
    default:
      return clamp(value);
  }
}

export function fromHourly(hourly: number): RateSnapshot {
  const safeHourly = clamp(hourly);
  const daily = safeHourly * WORK_HOURS_PER_DAY;
  const monthly = daily * WORK_DAYS_PER_MONTH;
  const yearly = monthly * MONTHS_PER_YEAR;
  return {
    hourly: safeHourly,
    daily,
    monthly,
    yearly
  };
}

export function normalizeRate(input: RateInput): RateSnapshot {
  return fromHourly(toHourly(input.value, input.unit));
}

export type GoalMetricsInput = {
  current: RateInput;
  target: RateInput;
  focusEfficiency: number;
};

export type GoalMetrics = {
  current: RateSnapshot;
  target: RateSnapshot;
  gap: RateSnapshot;
  yearlyGap: number;
  focusMinutesPerDay: number;
  daysToTarget: number;
  progress: number;
};

export function calculateGoalMetrics({ current, target, focusEfficiency }: GoalMetricsInput): GoalMetrics {
  const currentRates = normalizeRate(current);
  const targetRates = normalizeRate(target);
  const gapHourly = Math.max(0, targetRates.hourly - currentRates.hourly);
  const gapRates = fromHourly(gapHourly);
  const yearlyGap = Math.max(0, targetRates.yearly - currentRates.yearly);

  const effectiveEfficiency = Math.max(0.1, focusEfficiency || 0.1);
  const extraDailyGain = gapHourly * WORK_HOURS_PER_DAY * effectiveEfficiency;
  const focusMinutesPerDay = gapHourly <= 0 ? 0 : Math.round((gapHourly / effectiveEfficiency) * 60);
  const daysToTarget = extraDailyGain <= 0 ? 0 : Math.ceil(yearlyGap / extraDailyGain);
  const progress = targetRates.yearly === 0 ? 0 : Math.min(1, currentRates.yearly / targetRates.yearly);

  return {
    current: currentRates,
    target: targetRates,
    gap: gapRates,
    yearlyGap,
    focusMinutesPerDay,
    daysToTarget,
    progress
  };
}

export const PAYROLL_CONSTANTS = {
  WORK_HOURS_PER_DAY,
  WORK_DAYS_PER_MONTH,
  MONTHS_PER_YEAR
};
