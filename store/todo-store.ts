"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { TodoSnapshot } from "@/lib/types";
import { getClientStorage } from "@/lib/storage";

type TodoState = {
  todos: TodoSnapshot[];
  initialize: (seed: TodoSnapshot[]) => void;
  addTodo: (payload: { title: string; minutes: number }) => void;
  updateStatus: (id: string, status: TodoSnapshot["status"]) => void;
  removeTodo: (id: string) => void;
};

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      initialize: (seed) => {
        if (get().todos.length > 0 || seed.length === 0) return;
        set({ todos: seed });
      },
      addTodo: ({ title, minutes }) => {
        const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`;
        const newTodo: TodoSnapshot = {
          id,
          title,
          minutes,
          status: "pending"
        };
        set({ todos: [newTodo, ...get().todos] });
      },
      updateStatus: (id, status) => {
        set({
          todos: get().todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  status
                }
              : todo
          )
        });
      },
      removeTodo: (id) => {
        set({ todos: get().todos.filter((todo) => todo.id !== id) });
      }
    }),
    {
      name: "billionaire-timer-todos",
      storage: createJSONStorage(() => getClientStorage()),
      partialize: (state) => ({ todos: state.todos })
    }
  )
);
