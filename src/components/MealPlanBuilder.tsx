import { useState } from "react";
import { Trash2, Plus, X, Flame, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useMealPlan, days, type Day } from "@/hooks/use-meal-plan";
import { recipes } from "@/data/recipes";

export function MealPlanBuilder() {
  const { plan, removeFromDay, clearDay, clearPlan, totals, hydrated } = useMealPlan();
  const [query, setQuery] = useState("");
  const [openDay, setOpenDay] = useState<Day | null>(null);
  const { addToDay } = useMealPlan();

  const { weekly, daily } = totals();

  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  if (!hydrated) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-foreground">{weekly.protein}g</p>
          <p className="text-sm text-muted-foreground">Weekly protein</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-foreground">{weekly.calories}</p>
          <p className="text-sm text-muted-foreground">Weekly calories</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-foreground">{weekly.carbs}g</p>
          <p className="text-sm text-muted-foreground">Weekly carbs</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-foreground">{weekly.fat}g</p>
          <p className="text-sm text-muted-foreground">Weekly fat</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {days.map((day, idx) => (
          <div key={day} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-foreground">{day}</h3>
              {plan[day].length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => clearDay(day)}
                  aria-label={`Clear ${day}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Flame className="h-3 w-3 text-primary" /> {daily[idx]?.protein ?? 0}g
              </span>
              <span className="flex items-center gap-1">
                <ChefHat className="h-3 w-3" /> {daily[idx]?.calories ?? 0}
              </span>
            </div>

            <div className="mt-3 min-h-[80px] space-y-2">
              {plan[day].length === 0 ? (
                <p className="rounded-xl bg-secondary py-4 text-center text-sm text-muted-foreground">
                  No meals yet
                </p>
              ) : (
                plan[day].map((slot) => (
                  <div
                    key={slot.recipeId}
                    className="flex items-center justify-between rounded-xl bg-secondary px-3 py-2"
                  >
                    <span className="truncate text-sm font-medium text-foreground">
                      {slot.title}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromDay(day, slot.recipeId)}
                      aria-label={`Remove ${slot.title}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full gap-1"
              onClick={() => setOpenDay(openDay === day ? null : day)}
            >
              <Plus className="h-4 w-4" />
              Add recipe
            </Button>

            {openDay === day && (
              <div className="mt-3 rounded-xl border border-border bg-background p-3">
                <Input
                  placeholder="Search recipes..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="mb-2"
                />
                <div className="max-h-40 space-y-1 overflow-y-auto pr-1">
                  {filteredRecipes.map((recipe) => (
                    <button
                      key={recipe.id}
                      onClick={() => {
                        addToDay(day, recipe);
                        setOpenDay(null);
                        setQuery("");
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm hover:bg-secondary"
                    >
                      <span className="truncate text-foreground">{recipe.title}</span>
                      <Badge variant="secondary" className="ml-2 shrink-0 text-xs">
                        {recipe.protein}g
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button variant="destructive" onClick={clearPlan}>
          Clear whole plan
        </Button>
      </div>
    </div>
  );
}
