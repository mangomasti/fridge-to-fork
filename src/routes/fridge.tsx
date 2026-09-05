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
      { title: "What's In My Fridge — Fuel Kitchen" },
      { name: "description", content: "Pick the ingredients you have and find high-protein recipes you can make right now." },
      { property: "og:title", content: "What's In My Fridge — Fuel Kitchen" },
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

  const clear = () => setSelected([]);

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

        <div className="mt-10">
          <h2 className="font-display text-2xl text-foreground">
            {selected.length === 0 ? "All recipes" : "Best matches"}
          </h2>
          <p className="mt-1 text-muted-foreground">
            {selected.length === 0
              ? `${recipes.length} recipes to browse`
              : `${matches.length} recipes match your fridge`}
          </p>

          {matches.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-border bg-secondary p-8 text-center">
              <p className="text-lg font-medium text-foreground">No strong matches yet.</p>
              <p className="mt-2 text-muted-foreground">Add more ingredients to see ranked results.</p>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(selected.length === 0
                ? recipes.map((r) => ({ recipe: r, matchedIngredients: [], matchRatio: undefined }))
                : matches
              ).map(({ recipe, matchRatio }) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={favorites.includes(recipe.id)}
                  onToggleFavorite={toggle}
                  matchRatio={matchRatio}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
