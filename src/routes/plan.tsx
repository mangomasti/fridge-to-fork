import { createFileRoute } from "@tanstack/react-router";
import { MealPlanBuilder } from "@/components/MealPlanBuilder";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: "Meal Plan — Fuel Kitchen" },
      { name: "description", content: "Build a weekly high-protein meal plan and track daily and weekly macros." },
      { property: "og:title", content: "Meal Plan — Fuel Kitchen" },
      { property: "og:description", content: "Build a weekly high-protein meal plan and track daily and weekly macros." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlanPage,
});

function PlanPage() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-foreground sm:text-4xl">Weekly meal plan</h1>
          <p className="mt-2 text-muted-foreground">
            Add recipes to each day and watch your protein and calorie totals add up.
          </p>
        </div>
        <MealPlanBuilder />
      </div>
    </div>
  );
}
