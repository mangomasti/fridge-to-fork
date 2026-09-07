import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ingredientCatalog, recipes } from "@/data/recipes";
import { rankRecipesByFridge } from "@/lib/matcher";
import { useFavorites } from "@/hooks/use-favorites";
import { IngredientPicker } from "@/components/IngredientPicker";
import { RecipeCard } from "@/components/RecipeCard";
import { SurpriseMe } from "@/components/SurpriseMe";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export const Route = createFileRoute("/fridge")({
  head: () => ({
    meta: [
      { title: "What's In My Fridge — Fridge To Fork" },
      { name: "description", content: "Pick the ingredients you have and find high-protein recipes you can make right now." },
      { property: "og:title", content: "What's In My Fridge — Fridge To Fork" },
      { property: "og:description", content: "Pick the ingredients you have and find high-protein recipes you can make right now." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FridgePage,
});

function FridgePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const { favorites, toggle, hydrated } = useFavorites();

  const matches = useMemo(
    () => rankRecipesByFridge(selected),
    [selected]
  );

  const readyNow = useMemo(() => matches.filter((m) => m.matchRatio >= 0.7), [matches]);
  const almostThere = useMemo(
    () => matches.filter((m) => m.matchRatio >= 0.4 && m.matchRatio < 0.7).slice(0, 12),
    [matches]
  );

  const clear = () => setSelected([]);
  const addIngredient = (name: string) =>
    setSelected((prev) => (prev.includes(name) ? prev : [...prev, name]));

  if (!hydrated) return null;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl text-foreground sm:text-4xl">What's in my fridge?</h1>
            <p className="mt-2 text-muted-foreground">
              Tap what you have. We'll rank recipes by how many ingredients you already own.
            </p>
          </div>
          {selected.length > 0 && (
            <Button variant="outline" onClick={clear} className="gap-2 self-start">
              <RotateCcw className="h-4 w-4" />
              Clear selection
            </Button>
          )}
        </div>

        <IngredientPicker
          catalog={ingredientCatalog}
          selected={selected}
          onChange={setSelected}
        />

        {selected.length > 0 && <SurpriseMe selected={selected} />}

        {selected.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-2xl text-foreground">Cook this tonight</h2>
            <p className="mt-1 text-muted-foreground">
              {readyNow.length === 0
                ? "Nothing is a full match yet — check the near-misses below."
                : `${readyNow.length} dish${readyNow.length === 1 ? "" : "es"} you can make with almost everything you already have`}
            </p>
            {readyNow.length > 0 && (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {readyNow.map(({ recipe, matchRatio, missingIngredients }) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={favorites.includes(recipe.id)}
                    onToggleFavorite={toggle}
                    matchRatio={matchRatio}
                    missingIngredients={missingIngredients}
                  />
                ))}
              </div>
            )}

            {almostThere.length > 0 && (
              <>
                <h2 className="mt-12 font-display text-2xl text-foreground">Almost there</h2>
                <p className="mt-1 text-muted-foreground">
                  Just a few items short — tap any missing ingredient to add it to your grocery list.
                </p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {almostThere.map(({ recipe, matchRatio, missingIngredients }) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      isFavorite={favorites.includes(recipe.id)}
                      onToggleFavorite={toggle}
                      matchRatio={matchRatio}
                      missingIngredients={missingIngredients}
                    />
                  ))}
                </div>
              </>
            )}

            {readyNow.length === 0 && almostThere.length === 0 && (
              <div className="mt-8 rounded-2xl border border-border bg-secondary p-8 text-center">
                <p className="text-lg font-medium text-foreground">No strong matches yet.</p>
                <p className="mt-2 text-muted-foreground">Add more ingredients to see ranked results.</p>
              </div>
            )}
          </div>
        )}

        {selected.length === 0 && (
          <div className="mt-10">
            <h2 className="font-display text-2xl text-foreground">All recipes</h2>
            <p className="mt-1 text-muted-foreground">{recipes.length} recipes to browse</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={favorites.includes(recipe.id)}
                  onToggleFavorite={toggle}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
