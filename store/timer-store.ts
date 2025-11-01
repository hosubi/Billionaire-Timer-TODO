"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { TimerSnapshot } from "@/lib/types";
import { getClientStorage } from "@/lib/storage";

type TimerState = {
  snapshot: TimerSnapshot;
  timeLeft: number;
  activeDuration: number;
  status: "idle" | "running" | "paused";
  intervalId: ReturnType<typeof setInterval> | null;
  initialize: (snapshot: TimerSnapshot) => void;
  updateSnapshot: (updater: (snapshot: TimerSnapshot) => TimerSnapshot) => void;
  advancePhase: () => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

const defaultSnapshot: TimerSnapshot = {
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

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      snapshot: defaultSnapshot,
      timeLeft: defaultSnapshot.totalMinutes * 60,
      activeDuration: defaultSnapshot.totalMinutes * 60,
      status: "idle",
      intervalId: null,
      updateSnapshot: (updater) => {
        const { snapshot, intervalId } = get();
        if (intervalId) {
          clearInterval(intervalId);
        }
        const nextSnapshot = updater(snapshot);
        const duration = getDurationForPhase(nextSnapshot);
        set({
          snapshot: nextSnapshot,
          timeLeft: duration,
          activeDuration: duration,
          status: "idle",
          intervalId: null
        });
      },
      initialize: (snapshot) => {
        const duration = getDurationForPhase(snapshot);
        const current = get();
        if (current.intervalId) {
          clearInterval(current.intervalId);
        }
        set({
          snapshot,
          timeLeft: duration,
          activeDuration: duration,
          status: "idle",
          intervalId: null
        });
      },
      advancePhase: () => {
        const state = get();
        const nextSnapshot =
          state.snapshot.phase === "focus"
            ? {
                ...state.snapshot,
                phase: "break",
                completedRounds: state.snapshot.completedRounds + 1
              }
            : { ...state.snapshot, phase: "focus" };

        const duration = getDurationForPhase(nextSnapshot);
        if (state.intervalId) {
          clearInterval(state.intervalId);
        }

        set({
          snapshot: nextSnapshot,
          timeLeft: duration,
          activeDuration: duration,
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
          const state = get();
          const next = state.timeLeft - 1;
          if (next <= 0) {
            clearInterval(get().intervalId ?? id);
            set({ timeLeft: 0, status: "idle", intervalId: null });
            setTimeout(() => {
              get().advancePhase();
            }, 250);
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
        const duration = getDurationForPhase(snapshot);
        set({
          timeLeft: duration,
          activeDuration: duration,
          status: "idle",
          intervalId: null
        });
      }
    }),
    {
      name: "billionaire-timer-timer",
      storage: createJSONStorage(() => getClientStorage()),
      partialize: (state) => ({
        snapshot: state.snapshot,
        timeLeft: state.timeLeft,
        activeDuration: state.activeDuration,
        status: state.status
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.intervalId = null;
        if (!state.activeDuration) {
          state.activeDuration = getDurationForPhase(state.snapshot);
        }
      }
    }
  )
);

function getDurationForPhase(snapshot: TimerSnapshot) {
  if (snapshot.phase === "break") {
    const nextRound = snapshot.completedRounds;
    const isLongBreak = nextRound > 0 && nextRound % snapshot.roundsUntilLongBreak === 0;
    return (isLongBreak ? snapshot.longBreakMinutes : snapshot.shortBreakMinutes) * 60;
  }
  return snapshot.totalMinutes * 60;
}
