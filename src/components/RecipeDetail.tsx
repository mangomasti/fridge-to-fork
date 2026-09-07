import { ChefHat, Clock, ArrowLeft, Heart, ExternalLink, Utensils, Star, Lightbulb } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MacroPanel } from "@/components/MacroPanel";
import { useFavorites } from "@/hooks/use-favorites";
import { useMealPlan, type Day } from "@/hooks/use-meal-plan";
import { collectionLabels, difficultyLabels, type Recipe } from "@/data/recipes";
import { recipeImages } from "@/data/recipe-images";
import { cn } from "@/lib/utils";


const days: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface RecipeDetailProps {
  recipe: Recipe;
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const { favorites, toggle } = useFavorites();
  const { addToDay } = useMealPlan();
  const isFav = favorites.includes(recipe.id);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Button asChild variant="ghost" className="mb-4 gap-2 pl-0">
          <Link to="/recipes">
            <ArrowLeft className="h-4 w-4" />
            Back to recipes
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {recipeImages[recipe.id] ? (
              <img
                src={recipeImages[recipe.id]}
                alt={`${recipe.title} — ${recipe.cuisine} high-protein recipe`}
                width={768}
                height={512}
                className="h-64 w-full rounded-3xl object-cover sm:h-80"
              />
            ) : (
              <div
                className={cn(
                  "flex h-64 items-center justify-center rounded-3xl bg-gradient-to-br text-5xl font-bold text-white/90 sm:h-80",
                  recipe.imageGradient
                )}
              >
                {recipe.title.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {recipe.collection && (
                <Badge className="bg-primary text-primary-foreground">
                  {collectionLabels[recipe.collection]}
                </Badge>
              )}
              <Badge variant="secondary">{recipe.cuisine}</Badge>
              <Badge
                variant="outline"

                className={cn(
                  "capitalize",
                  recipe.diet === "vegan" && "border-green-600 text-green-700",
                  recipe.diet === "vegetarian" && "border-amber-600 text-amber-700",
                  recipe.diet === "meat" && "border-rose-600 text-rose-700"
                )}
              >
                {recipe.diet}
              </Badge>
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
              {recipe.title}
            </h1>

            {recipe.chef && (
              <p className="mt-2 text-sm text-muted-foreground">
                {recipe.chef.note} by{" "}
                <a
                  href={recipe.chef.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  {recipe.chef.name}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {recipe.timeMinutes} minutes
              </span>
              <span className="flex items-center gap-1">
                <Utensils className="h-4 w-4" />
                {recipe.servings} serving{recipe.servings === 1 ? "" : "s"}
              </span>
              {recipe.difficulty && (
                <span className="flex items-center gap-1">
                  {[1, 2, 3].map((n) => (
                    <Star
                      key={n}
                      className={cn(
                        "h-4 w-4",
                        n <= (recipe.difficulty ?? 0)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/40"
                      )}
                    />
                  ))}
                  <span className="ml-1">{difficultyLabels[recipe.difficulty]}</span>
                </span>
              )}
            </div>

            <div className="mt-8">
              <h2 className="font-display text-2xl text-foreground">Ingredients</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {recipe.ingredients.map((ing, idx) => (
                  <li
                    key={idx}
                    className="flex items-start justify-between rounded-xl border border-border bg-card p-3"
                  >
                    <span className="font-medium text-foreground">{ing.name}</span>
                    <span className="text-sm text-muted-foreground">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            {recipe.technique && (
              <div className="mt-6 flex gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-display text-lg text-foreground">Chef technique</p>
                  <p className="mt-1 text-sm text-foreground/80">{recipe.technique}</p>
                </div>
              </div>
            )}


            <div className="mt-8">
              <h2 className="font-display text-2xl text-foreground">Instructions</h2>
              <ol className="mt-4 space-y-4">
                {recipe.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {idx + 1}
                    </span>
                    <p className="mt-1 text-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-1">
            <MacroPanel recipe={recipe} />

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-display text-lg text-foreground">Actions</h3>
              <div className="mt-4 flex flex-col gap-2">
                <Button
                  variant={isFav ? "default" : "outline"}
                  className="w-full gap-2"
                  onClick={() => toggle(recipe.id)}
                >
                  <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
                  {isFav ? "Saved to favorites" : "Add to favorites"}
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-display text-lg text-foreground">Add to meal plan</h3>
              <p className="mt-1 text-sm text-muted-foreground">Pick a day to add this recipe.</p>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {days.map((day) => (
                  <Button
                    key={day}
                    variant="secondary"
                    size="sm"
                    onClick={() => addToDay(day, recipe)}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
