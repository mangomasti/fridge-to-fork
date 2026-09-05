import { describe, it, expect } from "vitest";
import { rankRecipesByFridge, normalizeIngredient, ingredientMatch } from "./matcher";

describe("matcher", () => {
  it("normalizes ingredient names", () => {
    expect(normalizeIngredient("Canned Chickpeas")).toBe("chickpeas");
    expect(normalizeIngredient("  Ground Chicken  ")).toBe("chicken");
  });

  it("matches ingredient substrings", () => {
    expect(ingredientMatch("chicken", "chicken breast")).toBe(true);
    expect(ingredientMatch("tomato", "canned tomatoes")).toBe(true);
    expect(ingredientMatch("beef", "chickpeas")).toBe(false);
  });

  it("ranks recipes by ingredient coverage", () => {
    const results = rankRecipesByFridge(["chicken breast", "yogurt", "tomatoes", "cream", "butter"]);
    const top = results[0];
    expect(top.recipe.id).toBe("butter-chicken");
    expect(top.matchRatio).toBeGreaterThan(0.5);
  });

  it("filters by min protein", () => {
    const results = rankRecipesByFridge([], { minProtein: 40 });
    expect(results.every((r) => r.recipe.protein >= 40)).toBe(true);
  });

  it("filters by cuisine", () => {
    const results = rankRecipesByFridge([], { cuisine: "Mexican" });
    expect(results.every((r) => r.recipe.cuisine === "Mexican")).toBe(true);
  });
});
