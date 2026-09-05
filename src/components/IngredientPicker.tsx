import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IngredientPickerProps {
  catalog: Record<string, string[]>;
  selected: string[];
  onChange: (selected: string[]) => void;
}

const groupLabels: Record<string, string> = {
  proteins: "Proteins",
  veggies: "Vegetables",
  pantry: "Pantry & Grains",
  spices: "Spices",
  dairy: "Dairy",
};

export function IngredientPicker({ catalog, selected, onChange }: IngredientPickerProps) {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const all = Object.entries(catalog).flatMap(([group, items]) =>
    items.map((name) => ({ group, name }))
  );

  const uniqueItems = Array.from(new Map(all.map((item) => [item.name, item])).values());

  const filtered = uniqueItems.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
    const matchesGroup = activeGroup ? item.group === activeGroup : true;
    return matchesQuery && matchesGroup;
  });

  const toggle = (name: string) => {
    onChange(
      selected.includes(name) ? selected.filter((s) => s !== name) : [...selected, name]
    );
  };

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search ingredients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveGroup(null)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              activeGroup === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            All
          </button>
          {Object.keys(catalog).map((group) => (
            <button
              key={group}
              onClick={() => setActiveGroup(group === activeGroup ? null : group)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                activeGroup === group
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {groupLabels[group] || group}
            </button>
          ))}
        </div>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
          {selected.map((name) => (
            <Badge key={name} variant="secondary" className="gap-1 pr-1">
              {name}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 rounded-full"
                onClick={() => toggle(name)}
                aria-label={`Remove ${name}`}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {filtered.map((item) => {
          const isSelected = selected.includes(item.name);
          return (
            <button
              key={item.name}
              onClick={() => toggle(item.name)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-secondary"
              )}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
