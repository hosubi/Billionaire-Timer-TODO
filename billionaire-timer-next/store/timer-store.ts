"use client";

import { create } from "zustand";
import type { TimerSnapshot } from "@/lib/types";

type TimerState = {
  snapshot: TimerSnapshot;
  timeLeft: number;
  status: "idle" | "running" | "paused";
  intervalId: ReturnType<typeof setInterval> | null;
  initialize: (snapshot: TimerSnapshot) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

export const useTimerStore = create<TimerState>((set, get) => ({
  snapshot: {
    totalMinutes: 45,
    currentTask: null,
    expectedProfit: 0,
    expectedLoss: 0
  },
  timeLeft: 45 * 60,
  status: "idle",
  intervalId: null,
  initialize: (snapshot) => {
    const minutes = snapshot.totalMinutes * 60;
    const current = get();
    if (current.intervalId) {
      clearInterval(current.intervalId);
    }
    set({
      snapshot,
      timeLeft: minutes,
      status: "idle",
      intervalId: null
    });
  },
  start: () => {
    const { status, intervalId } = get();
    if (status === "running") return;
    if (intervalId) {
      clearInterval(intervalId);
    }
    set({ status: "running" });
    const id = setInterval(() => {
      const next = get().timeLeft - 1;
      if (next <= 0) {
        clearInterval(get().intervalId ?? id);
        set({ timeLeft: 0, status: "idle", intervalId: null });
        return;
      }
      set({ timeLeft: next });
    }, 1000);
    set({ intervalId: id });
  },
  pause: () => {
    const { status, intervalId } = get();
    if (status !== "running") return;
    if (intervalId) {
      clearInterval(intervalId);
    }
    set({ status: "paused", intervalId: null });
  },
  reset: () => {
    const { snapshot, intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
    }
    set({
      timeLeft: snapshot.totalMinutes * 60,
      status: "idle",
      intervalId: null
    });
  }
}));
