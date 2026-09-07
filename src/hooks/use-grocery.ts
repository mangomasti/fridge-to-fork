import { useCallback, useEffect, useState } from "react";
import type { Recipe } from "@/data/recipes";
import { categoryOf } from "@/lib/categories";
import type { IngredientCategory } from "@/data/recipes";

const STORAGE_KEY = "f2f-grocery";

export interface GroceryItem {
  name: string;
  amounts: string[];
  category: IngredientCategory;
  recipes: string[];
  checked: boolean;
}

export function useGroceryList() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed as GroceryItem[]);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addRecipe = useCallback((recipe: Recipe, factor = 1, scale?: (a: string, f: number) => string) => {
    setItems((prev) => {
      const next = [...prev];
      for (const ing of recipe.ingredients) {
        const amount = scale ? scale(ing.amount, factor) : ing.amount;
        const existing = next.find((i) => i.name.toLowerCase() === ing.name.toLowerCase());
        if (existing) {
          if (!existing.amounts.includes(amount)) existing.amounts = [...existing.amounts, amount];
          if (!existing.recipes.includes(recipe.title)) {
            existing.recipes = [...existing.recipes, recipe.title];
          }
        } else {
          next.push({
            name: ing.name,
            amounts: [amount],
            category: categoryOf(ing.name),
            recipes: [recipe.title],
            checked: false,
          });
        }
      }
      return next;
    });
  }, []);

  const addItem = useCallback((name: string) => {
    setItems((prev) =>
      prev.some((i) => i.name.toLowerCase() === name.toLowerCase())
        ? prev
        : [...prev, { name, amounts: [], category: categoryOf(name), recipes: [], checked: false }]
    );
  }, []);

  const toggleChecked = useCallback((name: string) => {
    setItems((prev) =>
      prev.map((i) => (i.name === name ? { ...i, checked: !i.checked } : i))
    );
  }, []);

  const removeItem = useCallback((name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  }, []);

  const clearChecked = useCallback(() => {
    setItems((prev) => prev.filter((i) => !i.checked));
  }, []);

  const clearAll = useCallback(() => setItems([]), []);

  return { items, hydrated, addRecipe, addItem, toggleChecked, removeItem, clearChecked, clearAll };
}
