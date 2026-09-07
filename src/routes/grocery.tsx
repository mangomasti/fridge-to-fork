import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart, Trash2, Plus } from "lucide-react";
import { useGroceryList } from "@/hooks/use-grocery";
import { ingredientCategoryLabels, type IngredientCategory } from "@/data/recipes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/grocery")({
  head: () => ({
    meta: [
      { title: "Grocery List — Fridge To Fork" },
      { name: "description", content: "Your grocery wishlist of ingredients to pick up, grouped by aisle." },
      { property: "og:title", content: "Grocery List — Fridge To Fork" },
      { property: "og:description", content: "Your grocery wishlist of ingredients to pick up, grouped by aisle." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GroceryPage,
});

function GroceryPage() {
  const { items, hydrated, addItem, toggleChecked, removeItem, clearChecked, clearAll } =
    useGroceryList();
  const [draft, setDraft] = useState("");

  if (!hydrated) return null;

  const categories = Object.keys(ingredientCategoryLabels) as IngredientCategory[];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl text-foreground sm:text-4xl">Grocery list</h1>
        <p className="mt-2 text-muted-foreground">
          {items.length} item{items.length === 1 ? "" : "s"} to pick up, grouped by aisle.
        </p>

        <form
          className="mt-6 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (draft.trim()) addItem(draft.trim());
            setDraft("");
          }}
        >
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add something you need..."
          />
          <Button type="submit" className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </form>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border bg-secondary p-10 text-center">
            <ShoppingCart className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium text-foreground">Your list is empty</p>
            <p className="mt-2 text-muted-foreground">
              Add a recipe's ingredients from any recipe card to fill this up.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 space-y-6">
              {categories.map((category) => {
                const group = items.filter((i) => i.category === category);
                if (group.length === 0) return null;
                return (
                  <div key={category} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <h2 className="font-display text-lg text-foreground">
                      {ingredientCategoryLabels[category]}
                    </h2>
                    <ul className="mt-3 divide-y divide-border">
                      {group.map((item) => (
                        <li key={item.name} className="flex items-center gap-3 py-2">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleChecked(item.name)}
                            className="h-4 w-4 accent-[hsl(var(--primary))]"
                            aria-label={`Mark ${item.name} as bought`}
                          />
                          <div className="min-w-0 flex-1">
                            <p
                              className={cn(
                                "font-medium text-foreground",
                                item.checked && "text-muted-foreground line-through"
                              )}
                            >
                              {item.name}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {[item.amounts.join(" + "), item.recipes.join(", ")]
                                .filter(Boolean)
                                .join(" · ")}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.name)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="outline" onClick={clearChecked}>
                Clear bought items
              </Button>
              <Button variant="ghost" onClick={clearAll}>
                Clear everything
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
