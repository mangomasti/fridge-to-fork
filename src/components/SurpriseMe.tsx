import { Sparkles } from "lucide-react";
import { suggestSurprise } from "@/lib/matcher";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";

interface SurpriseMeProps {
  selected: string[];
  onRecipeClick?: (id: string) => void;
}

export function SurpriseMe({ selected }: SurpriseMeProps) {
  const suggestions = suggestSurprise(selected, 3);

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-display text-lg text-foreground">Surprise me</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {suggestions.map(({ recipe, matchRatio }) => (
          <Link
            key={recipe.id}
            to="/recipes/$id"
            params={{ id: recipe.id }}
            className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary"
          >
            {recipe.title}
            <Badge variant="secondary" className="text-xs">
              {Math.round(matchRatio * 100)}%
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
