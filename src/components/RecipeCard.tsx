import { Link } from "@tanstack/react-router";
import { Clock, Dumbbell, ChefHat, Heart, Star, PlusCircle, Wind } from "lucide-react";
import { isAirFryerFriendly } from "@/lib/airfryer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { difficultyLabels, type Recipe } from "@/data/recipes";
import { recipeImages } from "@/data/recipe-images";
import { useGroceryList } from "@/hooks/use-grocery";
import { toast } from "sonner";


interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  matchRatio?: number | undefined;
  missingIngredients?: string[] | undefined;
  onAddIngredient?: ((name: string) => void) | undefined;
}

export function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  matchRatio,
  missingIngredients,
  onAddIngredient,
}: RecipeCardProps) {
  const { addRecipe, addItem } = useGroceryList();
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link to="/recipes/$id" params={{ id: recipe.id }} className="relative block">
        {recipeImages[recipe.id] ? (
          <img
            src={recipeImages[recipe.id]}
            alt={`${recipe.title} — ${recipe.cuisine} high-protein recipe`}
            width={768}
            height={512}
            loading="lazy"
            className="h-40 w-full object-cover"
          />
        ) : (
          <div
            className={cn(
              "flex h-40 items-center justify-center bg-gradient-to-br text-3xl font-bold text-white/90",
              recipe.imageGradient
            )}
          >
            {recipe.title.slice(0, 2).toUpperCase()}
          </div>
        )}
        {typeof matchRatio === "number" && (
          <div className="absolute left-3 top-3 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold text-foreground shadow">
            {Math.round(matchRatio * 100)}% match
          </div>
        )}
        <div className="absolute right-3 top-3">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/90 backdrop-blur hover:bg-background"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(recipe.id);
            }}
            aria-label={isFavorite ? "Remove from saved" : "Save this dish"}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
              )}
            />
          </Button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {recipe.cuisine}
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "text-xs capitalize",
              recipe.diet === "vegan" && "border-green-600 text-green-700",
              recipe.diet === "vegetarian" && "border-amber-600 text-amber-700",
              recipe.diet === "meat" && "border-rose-600 text-rose-700"
            )}
          >
            {recipe.diet}
          </Badge>
          {isAirFryerFriendly(recipe) && (
            <Badge variant="outline" className="gap-1 border-primary/50 text-xs text-primary">
              <Wind className="h-3 w-3" />
              Air fryer
            </Badge>
          )}
        </div>


        <Link to="/recipes/$id" params={{ id: recipe.id }}>
          <h3 className="font-display text-lg leading-tight text-foreground transition-colors group-hover:text-primary">
            {recipe.title}
          </h3>
        </Link>

        {recipe.chef && (
          <p className="mt-1 text-xs text-muted-foreground">
            Inspired by {recipe.chef.name}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <Dumbbell className="h-4 w-4 text-primary" />
              {recipe.protein}g protein
            </span>
            <span className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              {recipe.calories}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {recipe.timeMinutes}m
          </span>
        </div>

        {recipe.difficulty && (
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            {[1, 2, 3].map((n) => (
              <Star
                key={n}
                className={cn(
                  "h-3.5 w-3.5",
                  n <= (recipe.difficulty ?? 0) ? "fill-primary text-primary" : "text-muted-foreground/40"
                )}
              />
            ))}
            <span className="ml-1">{difficultyLabels[recipe.difficulty]}</span>
          </div>
        )}

        {missingIngredients && missingIngredients.length > 0 && (
          <div className="mt-3 rounded-xl border border-dashed border-border bg-secondary/40 p-3">
            <p className="text-xs font-semibold text-foreground">
              You still need {missingIngredients.length} item{missingIngredients.length === 1 ? "" : "s"}
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {missingIngredients.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onAddIngredient) {
                        onAddIngredient(name);
                        toast.success(`${name} added to your fridge`);
                      } else {
                        addItem(name);
                        toast.success(`${name} added to your grocery list`);
                      }
                    }}
                    className="flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1 text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
                    aria-label={onAddIngredient ? `Add ${name} to my fridge` : `Add ${name} to grocery list`}
                  >
                    {name}
                    <PlusCircle className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}
