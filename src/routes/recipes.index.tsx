import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { recipes, cuisines, collectionLabels, type Collection } from "@/data/recipes";
import { useFavorites } from "@/hooks/use-favorites";
import { RecipeCard } from "@/components/RecipeCard";
import { FilterBar } from "@/components/FilterBar";
import { getMeatType } from "@/lib/meat";


export const Route = createFileRoute("/recipes/")({
  validateSearch: (search: Record<string, unknown>): { collection?: string } =>
    typeof search['collection'] === "string" ? { collection: search['collection'] } : {},

  head: () => ({
    meta: [
      { title: "Browse Recipes — Fridge To Fork" },
      { name: "description", content: "Browse 75+ high-protein recipes. Filter by collection, cuisine, diet, protein, cook time, and chef-inspired dishes." },
      { property: "og:title", content: "Browse Recipes — Fridge To Fork" },
      { property: "og:description", content: "Browse 75+ high-protein recipes. Filter by collection, cuisine, diet, protein, cook time, and chef-inspired dishes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecipesPage,
});

function RecipesPage() {
  const { collection: collectionParam } = Route.useSearch();
  const { favorites, toggle, hydrated } = useFavorites();
  const [diet, setDiet] = useState<string>("all");
  const [cuisine, setCuisine] = useState<string>("all");
  const [minProtein, setMinProtein] = useState<number>(0);
  const [maxTime, setMaxTime] = useState<number>(120);
  const [chefOnly, setChefOnly] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [meat, setMeat] = useState<string>("all");
  const [collection, setCollection] = useState<string>(collectionParam ?? "all");

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (diet !== "all" && r.diet !== diet) return false;
      if (cuisine !== "all" && r.cuisine !== cuisine) return false;
      if (collection !== "all" && r.collection !== collection) return false;
      if (meat !== "all" && getMeatType(r) !== meat) return false;
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
  }, [diet, cuisine, minProtein, maxTime, chefOnly, search, meat, collection]);

  if (!hydrated) return null;

  const heading =
    collection !== "all" && collection in collectionLabels
      ? collectionLabels[collection as Collection]
      : "Browse recipes";

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-foreground sm:text-4xl">{heading}</h1>
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
          meat={meat}
          onMeatChange={setMeat}
          collection={collection}
          onCollectionChange={setCollection}
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
