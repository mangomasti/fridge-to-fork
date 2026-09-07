import { useCallback, useEffect, useState } from "react";
import type { Recipe } from "@/data/recipes";

export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
export const days: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export interface MealSlot {
  recipeId: string;
  title: string;
  servings: number;
  protein: number;
  calories: number;
  carbs: number;
  fat: number;
}

export type MealPlan = Record<Day, MealSlot[]>;

const STORAGE_KEY = "fuel-kitchen-meal-plan";

function emptyPlan(): MealPlan {
  return days.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {} as MealPlan);
}

export function useMealPlan() {
  const [plan, setPlan] = useState<MealPlan>(emptyPlan());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          const restored = emptyPlan();
          for (const day of days) {
            if (Array.isArray(parsed[day])) {
              restored[day] = parsed[day].filter(
                (slot: unknown): slot is MealSlot =>
                  typeof slot === "object" &&
                  slot !== null &&
                  "recipeId" in slot &&
                  typeof (slot as MealSlot).recipeId === "string"
              );
            }
          }
          setPlan(restored);
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  const addToDay = useCallback((day: Day, recipe: Recipe) => {
    const slot: MealSlot = {
      recipeId: recipe.id,
      title: recipe.title,
      protein: recipe.protein,
      calories: recipe.calories,
      carbs: recipe.carbs,
      fat: recipe.fat,
    };
    setPlan((prev) => ({
      ...prev,
      [day]: [...prev[day], slot],
    }));
  }, []);

  const removeFromDay = useCallback((day: Day, recipeId: string) => {
    setPlan((prev) => ({
      ...prev,
      [day]: prev[day].filter((slot) => slot.recipeId !== recipeId),
    }));
  }, []);

  const clearDay = useCallback((day: Day) => {
    setPlan((prev) => ({ ...prev, [day]: [] }));
  }, []);

  const clearPlan = useCallback(() => {
    setPlan(emptyPlan());
  }, []);

  const totals = useCallback(() => {
    const weekly = days.reduce(
      (acc, day) => {
        for (const slot of plan[day]) {
          acc.protein += slot.protein;
          acc.calories += slot.calories;
          acc.carbs += slot.carbs;
          acc.fat += slot.fat;
        }
        return acc;
      },
      { protein: 0, calories: 0, carbs: 0, fat: 0 }
    );

    const daily = days.map((day) =>
      plan[day].reduce(
        (acc, slot) => ({
          protein: acc.protein + slot.protein,
          calories: acc.calories + slot.calories,
          carbs: acc.carbs + slot.carbs,
          fat: acc.fat + slot.fat,
        }),
        { protein: 0, calories: 0, carbs: 0, fat: 0 }
      )
    );

    return { weekly, daily };
  }, [plan]);

  return {
    plan,
    addToDay,
    removeFromDay,
    clearDay,
    clearPlan,
    totals,
    hydrated,
  };
}
