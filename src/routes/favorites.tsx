import { createFileRoute } from "@tanstack/react-router";
import { useFavorites } from "@/hooks/use-favorites";
import { recipes } from "@/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "My Favorites — Fridge To Fork" },
      { name: "description", content: "Your saved high-protein recipes from Fridge To Fork." },
      { property: "og:title", content: "My Favorites — Fridge To Fork" },
      { property: "og:description", content: "Your saved high-protein recipes from Fridge To Fork." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites, toggle, hydrated } = useFavorites();
  const saved = recipes.filter((r) => favorites.includes(r.id));

  if (!hydrated) return null;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-3xl text-foreground sm:text-4xl">My favorites</h1>
        <p className="mt-2 text-muted-foreground">
          {saved.length} saved recipe{saved.length === 1 ? "" : "s"}.
        </p>

        {saved.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border bg-secondary p-10 text-center">
            <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium text-foreground">No favorites yet</p>
            <p className="mt-2 text-muted-foreground">Browse recipes and tap the heart to save the ones you love.</p>
            <Button asChild className="mt-6">
              <Link to="/recipes">Browse recipes</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {saved.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite
                onToggleFavorite={toggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
