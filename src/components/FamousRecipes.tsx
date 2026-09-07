import { Link } from "@tanstack/react-router";
import { Clock, Dumbbell, ExternalLink } from "lucide-react";
import { recipes } from "@/data/recipes";
import { recipeImages } from "@/data/recipe-images";

export function FamousRecipes({ limit = 6 }: { limit?: number }) {
  const famous = recipes.filter((r) => r.chef).slice(0, limit);
  if (famous.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="mb-4">
        <h2 className="font-display text-2xl text-foreground">Famous recipes</h2>
        <p className="mt-1 text-muted-foreground">
          Classics inspired by world-renowned chefs, rebuilt for protein.
        </p>
      </div>
      <ul className="divide-y divide-border">
        {famous.map((recipe) => (
          <li key={recipe.id} className="flex items-center gap-4 py-3">
            {recipeImages[recipe.id] && (
              <img
                src={recipeImages[recipe.id]}
                alt={`${recipe.title} — ${recipe.cuisine} recipe`}
                width={768}
                height={512}
                loading="lazy"
                className="h-14 w-20 shrink-0 rounded-lg object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              <Link
                to="/recipes/$id"
                params={{ id: recipe.id }}
                className="font-medium text-foreground hover:text-primary"
              >
                {recipe.title}
              </Link>
              {recipe.chef && (
                <p className="truncate text-xs text-muted-foreground">
                  Inspired by {recipe.chef.name}
                  <a
                    href={recipe.chef.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 inline-flex items-center text-primary hover:underline"
                    aria-label={`Source for ${recipe.chef.name}`}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 font-semibold text-foreground">
                <Dumbbell className="h-4 w-4 text-primary" />
                {recipe.protein}g protein
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {recipe.timeMinutes}m
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
