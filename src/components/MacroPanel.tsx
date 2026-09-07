import { Dumbbell, ChefHat, Wheat, Droplet } from "lucide-react";
import type { Recipe } from "@/data/recipes";

interface MacroPanelProps {
  recipe: Recipe;
}

export function MacroPanel({ recipe }: MacroPanelProps) {
  const perIngredient = recipe.ingredients.filter((i) => i.macros);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="font-display text-lg text-foreground">Macros per serving</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-secondary p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{recipe.protein}g</p>
          <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Dumbbell className="h-3 w-3 text-primary" /> Protein
          </p>
        </div>
        <div className="rounded-xl bg-secondary p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{recipe.calories}</p>
          <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <ChefHat className="h-3 w-3" /> Calories
          </p>
        </div>
        <div className="rounded-xl bg-secondary p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{recipe.carbs}g</p>
          <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Wheat className="h-3 w-3" /> Carbs
          </p>
        </div>
        <div className="rounded-xl bg-secondary p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{recipe.fat}g</p>
          <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Droplet className="h-3 w-3" /> Fat
          </p>
        </div>
      </div>

      {perIngredient.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-foreground">Top contributors</h4>
          <div className="mt-3 space-y-2">
            {perIngredient.slice(0, 6).map((ing, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-sm"
              >
                <span className="text-foreground">{ing.name}</span>
                <span className="text-muted-foreground">
                  {ing.macros!.protein}g protein · {ing.macros!.calories} kcal
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
