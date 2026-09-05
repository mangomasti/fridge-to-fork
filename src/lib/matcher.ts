import { allIngredients, recipes, type Recipe } from "@/data/recipes";

export function normalizeIngredient(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\b(canned|cooked|raw|fresh|frozen|diced|sliced|chopped|minced|ground)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function ingredientMatch(input: string, recipeIngredient: string): boolean {
  const a = normalizeIngredient(input);
  const b = normalizeIngredient(recipeIngredient);
  return a === b || b.includes(a) || a.includes(b);
}

export interface MatchResult {
  recipe: Recipe;
  matchedIngredients: string[];
  matchRatio: number;
}

export function rankRecipesByFridge(
  selectedIngredients: string[],
  options?: {
    minProtein?: number;
    cuisine?: string;
    diet?: string;
    maxTime?: number;
  }
): MatchResult[] {
  const selected = selectedIngredients.map((i) => normalizeIngredient(i));

  let filtered = recipes;

  if (options?.minProtein) {
    filtered = filtered.filter((r) => r.protein >= options.minProtein!);
  }
  if (options?.cuisine && options.cuisine !== "all") {
    filtered = filtered.filter((r) => r.cuisine === options.cuisine);
  }
  if (options?.diet && options.diet !== "all") {
    filtered = filtered.filter((r) => r.diet === options.diet);
  }
  if (options?.maxTime) {
    filtered = filtered.filter((r) => r.timeMinutes <= options.maxTime!);
  }

  const results: MatchResult[] = filtered.map((recipe) => {
    const matched = recipe.ingredients
      .map((ing) => ing.name)
      .filter((name) => selected.some((sel) => ingredientMatch(sel, name)));

    const uniqueMatched = Array.from(new Set(matched));
    const matchRatio = recipe.ingredients.length > 0
      ? uniqueMatched.length / recipe.ingredients.length
      : 0;

    return {
      recipe,
      matchedIngredients: uniqueMatched,
      matchRatio,
    };
  });

  return results.sort((a, b) => b.matchRatio - a.matchRatio);
}

export function suggestSurprise(
  selectedIngredients: string[],
  count = 3,
  options?: Parameters<typeof rankRecipesByFridge>[1]
): MatchResult[] {
  return rankRecipesByFridge(selectedIngredients, options)
    .filter((r) => r.matchRatio > 0)
    .slice(0, count);
}

export function validateIngredients(inputs: string[]): string[] {
  const valid = new Set(allIngredients.map((i) => normalizeIngredient(i)));
  return inputs.filter((i) => valid.has(normalizeIngredient(i)));
}
