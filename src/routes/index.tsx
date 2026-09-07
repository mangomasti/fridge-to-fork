import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChefHat, Flame, Refrigerator, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";
import { FamousRecipes } from "@/components/FamousRecipes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fuel Kitchen — High-Protein Recipes for Gym Lovers" },
      { name: "description", content: "Build high-protein meals from what's in your fridge. Browse macro-friendly recipes, save favorites, and plan your week." },
      { property: "og:title", content: "Fuel Kitchen — High-Protein Recipes for Gym Lovers" },
      { property: "og:description", content: "Build high-protein meals from what's in your fridge. Browse macro-friendly recipes, save favorites, and plan your week." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col">
      <section
        className="relative overflow-hidden bg-background px-4 py-24 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255,252,245,0.85), rgba(255,252,245,0.95)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm font-medium text-secondary-foreground backdrop-blur">
            <Flame className="h-4 w-4 text-primary" />
            Built for gym lovers and healthy eaters
          </div>
          <h1 className="font-display text-4xl font-normal leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Cook high-protein meals from whatever is in your fridge.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Browse 40+ macro-friendly recipes across Indian, Mediterranean, Mexican, Asian, and American cuisines. Match ingredients, save favorites, and plan your week.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link to="/fridge">
                <Refrigerator className="h-5 w-5" />
                What's in my fridge?
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/recipes">
                <Search className="h-5 w-5" />
                Browse recipes
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Refrigerator className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl text-foreground">Fridge matcher</h3>
              <p className="mt-2 text-muted-foreground">
                Tap the ingredients you have and see recipes ranked by how much you can already make.
              </p>
              <Link to="/fridge" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Match ingredients <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Flame className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl text-foreground">Macro-first recipes</h3>
              <p className="mt-2 text-muted-foreground">
                Every recipe shows protein, calories, carbs, and fat — plus per-ingredient contributions.
              </p>
              <Link to="/recipes" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Browse by macro <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ChefHat className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl text-foreground">Weekly meal plan</h3>
              <p className="mt-2 text-muted-foreground">
                Save recipes to a day-by-day plan and track daily and weekly protein and calorie totals.
              </p>
              <Link to="/plan" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Build a plan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-2xl text-foreground">What's in your fridge?</h2>
            <p className="mt-2 text-muted-foreground">
              Tick off the ingredients you already have and we'll rank every recipe by how much of it you can cook tonight.
            </p>
            <Button asChild className="mt-6 gap-2">
              <Link to="/fridge">
                <Refrigerator className="h-5 w-5" />
                Start with my ingredients
              </Link>
            </Button>
          </div>
          <FamousRecipes limit={5} />
        </div>
        <div className="mx-auto mt-10 max-w-4xl text-center">
          <p className="text-muted-foreground">
            Dishes inspired by world-famous chefs — reimagined with high-protein macros, plus chicken, turkey, beef, lamb, pork and seafood options.
          </p>
          <Button asChild className="mt-6 gap-2">
            <Link to="/recipes">
              <Search className="h-5 w-5" />
              Explore recipes
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
