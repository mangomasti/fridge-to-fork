import { Sparkles, PlusCircle } from "lucide-react";
import { suggestSurprise } from "@/lib/matcher";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { useGroceryList } from "@/hooks/use-grocery";
import { toast } from "sonner";

interface SurpriseMeProps {
  selected: string[];
  onRecipeClick?: (id: string) => void;
  onAddIngredient?: ((name: string) => void) | undefined;
}

export function SurpriseMe({ selected, onAddIngredient }: SurpriseMeProps) {
  const suggestions = suggestSurprise(selected, 3);
  const { addItem } = useGroceryList();

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-display text-lg text-foreground">Surprise me</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {suggestions.map(({ recipe, matchRatio, missingIngredients }) => (
          <div
            key={recipe.id}
            className="rounded-xl border border-border bg-background p-3 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <Link
                to="/recipes/$id"
                params={{ id: recipe.id }}
                className="font-medium text-foreground hover:text-primary"
              >
                {recipe.title}
              </Link>
              <Badge variant="secondary" className="shrink-0 text-xs">
                {Math.round(matchRatio * 100)}%
              </Badge>
            </div>
            {missingIngredients.length > 0 && (
              <>
                <p className="mt-2 text-xs text-muted-foreground">
                  Missing {missingIngredients.length} item
                  {missingIngredients.length === 1 ? "" : "s"}:
                </p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
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
                        className="flex items-center gap-1 rounded-full border border-border px-2 py-1 text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
                        aria-label={onAddIngredient ? `Add ${name} to my fridge` : `Add ${name} to grocery list`}
                      >
                        {name}
                        <PlusCircle className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
