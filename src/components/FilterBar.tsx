import { Search, ChefHat } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cuisines, dietLabels } from "@/data/recipes";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  diet: string;
  onDietChange: (value: string) => void;
  cuisine: string;
  onCuisineChange: (value: string) => void;
  minProtein: number;
  onMinProteinChange: (value: number) => void;
  maxTime: number;
  onMaxTimeChange: (value: number) => void;
  chefOnly: boolean;
  onChefOnlyChange: (value: boolean) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

const dietOptions = [
  { value: "all", label: "All diets" },
  { value: "meat", label: dietLabels.meat },
  { value: "vegetarian", label: dietLabels.vegetarian },
  { value: "vegan", label: dietLabels.vegan },
];

export function FilterBar({
  diet,
  onDietChange,
  cuisine,
  onCuisineChange,
  minProtein,
  onMinProteinChange,
  maxTime,
  onMaxTimeChange,
  chefOnly,
  onChefOnlyChange,
  search,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search recipes, ingredients, tags..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {dietOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onDietChange(opt.value)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              diet === opt.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {opt.label}
          </button>
        ))}

        <div className="mx-2 hidden h-6 w-px bg-border sm:block" />

        <select
          value={cuisine}
          onChange={(e) => onCuisineChange(e.target.value)}
          className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All cuisines</option>
          {cuisines.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          onClick={() => onChefOnlyChange(!chefOnly)}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            chefOnly
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          <ChefHat className="h-4 w-4" />
          Chef inspired
        </button>
      </div>

      <div className="grid gap-6 border-t border-border pt-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Min protein</span>
            <Badge variant="secondary">{minProtein}g+</Badge>
          </div>
          <Slider
            value={[minProtein]}
            onValueChange={(v) => onMinProteinChange(v[0] ?? 0)}
            min={0}
            max={60}
            step={5}
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Max cook time</span>
            <Badge variant="secondary">{maxTime}m</Badge>
          </div>
          <Slider
            value={[maxTime]}
            onValueChange={(v) => onMaxTimeChange(v[0] ?? 120)}
            min={15}
            max={120}
            step={5}
          />
        </div>
      </div>
    </div>
  );
}
