import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { recipes, cuisines, dietLabels } from "@/data/recipes";
import { useFavorites } from "@/hooks/use-favorites";
import { RecipeCard } from "@/components/RecipeCard";
import { FilterBar } from "@/components/FilterBar";

export const Route = createFileRoute("/recipes")({
  head: () => ({
    meta: [
      { title: "Browse Recipes — Fuel Kitchen" },
      { name: "description", content: "Browse 40+ high-protein recipes. Filter by cuisine, diet, protein, cook time, and chef-inspired dishes." },
      { property: "og:title", content: "Browse Recipes — Fuel Kitchen" },
      { property: "og:description", content: "Browse 40+ high-protein recipes. Filter by cuisine, diet, protein, cook time, and chef-inspired dishes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecipesPage,
});

function RecipesPage() {
  const { favorites, toggle, hydrated } = useFavorites();
  const [diet, setDiet] = useState<string>("all");
  const [cuisine, setCuisine] = useState<string>("all");
  const [minProtein, setMinProtein] = useState<number>(0);
  const [maxTime, setMaxTime] = useState<number>(120);
  const [chefOnly, setChefOnly] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (diet !== "all" && r.diet !== diet) return false;
      if (cuisine !== "all" && r.cuisine !== cuisine) return false;
      if (r.protein < minProtein) return false;
      if (r.timeMinutes > maxTime) return false;
      if (chefOnly && !r.chef) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.ingredients.some((i) => i.name.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [diet, cuisine, minProtein, maxTime, chefOnly, search]);

  if (!hydrated) return null;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-foreground sm:text-4xl">Browse recipes</h1>
          <p className="mt-2 text-muted-foreground">
            {filtered.length} macro-friendly recipes across {cuisines.length} cuisines.
          </p>
        </div>

        <FilterBar
          diet={diet}
          onDietChange={setDiet}
          cuisine={cuisine}
          onCuisineChange={setCuisine}
          minProtein={minProtein}
          onMinProteinChange={setMinProtein}
          maxTime={maxTime}
          onMaxTimeChange={setMaxTime}
          chefOnly={chefOnly}
          onChefOnlyChange={setChefOnly}
          search={search}
          onSearchChange={setSearch}
        />

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-border bg-secondary p-8 text-center">
            <p className="text-lg font-medium text-foreground">No recipes match your filters.</p>
            <p className="mt-2 text-muted-foreground">Try relaxing protein, time, or cuisine settings.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={toggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
