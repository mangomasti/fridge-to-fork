import { useState } from "react";
import { Search, X, Check, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ingredientCategoryLabels } from "@/data/recipes";
import { cn } from "@/lib/utils";

interface IngredientPickerProps {
  catalog: Record<string, string[]>;
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function IngredientPicker({ catalog, selected, onChange }: IngredientPickerProps) {
  const [query, setQuery] = useState("");
  const groups = Object.keys(catalog);
  const [collapsed, setCollapsed] = useState<string[]>([]);

  const toggle = (name: string) => {
    onChange(
      selected.includes(name) ? selected.filter((s) => s !== name) : [...selected, name]
    );
  };

  const toggleGroup = (group: string) =>
    setCollapsed((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );

  const label = (group: string) =>
    ingredientCategoryLabels[group as keyof typeof ingredientCategoryLabels] ?? group;

  return (
    <div className="space-y-5 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search ingredients..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl bg-secondary p-3">
          <span className="text-sm font-medium text-foreground">
            {selected.length} selected
          </span>
          {selected.map((name) => (
            <Badge key={name} variant="default" className="gap-1 pr-1">
              {name}
              <button
                onClick={() => toggle(name)}
                className="rounded-full p-0.5 hover:bg-primary-foreground/20"
                aria-label={`Remove ${name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={() => onChange([])}>
            Clear all
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {groups.map((group) => {
          const items = (catalog[group] ?? []).filter((name) =>
            name.toLowerCase().includes(query.toLowerCase())
          );
          if (items.length === 0) return null;
          const isOpen = !collapsed.includes(group);
          const count = items.filter((i) => selected.includes(i)).length;

          return (
            <div key={group} className="rounded-xl border border-border">
              <button
                onClick={() => toggleGroup(group)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  {label(group)}
                  {count > 0 && (
                    <Badge variant="secondary" className="text-xs">{count}</Badge>
                  )}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    !isOpen && "-rotate-90"
                  )}
                />
              </button>
              {isOpen && (
                <div className="flex flex-wrap gap-2 border-t border-border p-4">
                  {items.map((name) => {
                    const isSelected = selected.includes(name);
                    return (
                      <button
                        key={name}
                        onClick={() => toggle(name)}
                        aria-pressed={isSelected}
                        className={cn(
                          "flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium transition-colors",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-secondary"
                        )}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5" />}
                        {name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
