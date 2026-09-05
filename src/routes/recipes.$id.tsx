import { createFileRoute, notFound } from "@tanstack/react-router";
import { recipes, type Recipe } from "@/data/recipes";
import { RecipeDetail } from "@/components/RecipeDetail";

export const Route = createFileRoute("/recipes/$id")({
  head: ({ loaderData }) => {
    const recipe = loaderData;
    if (!recipe) {
      return {
        meta: [
          { title: "Recipe — Fuel Kitchen" },
          { name: "description", content: "High-protein recipe from Fuel Kitchen." },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${recipe.title} — Fuel Kitchen` },
        { name: "description", content: `High-protein ${recipe.cuisine} recipe with ${recipe.protein}g protein and ${recipe.calories} calories per serving.` },
        { property: "og:title", content: `${recipe.title} — Fuel Kitchen` },
        { property: "og:description", content: `High-protein ${recipe.cuisine} recipe with ${recipe.protein}g protein and ${recipe.calories} calories per serving.` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  loader: async ({ params }): Promise<Recipe> => {
    const recipe = recipes.find((r) => r.id === params.id);
    if (!recipe) throw notFound();
    return recipe;
  },
  component: RecipeDetailPage,
});

function RecipeDetailPage() {
  const recipe = Route.useLoaderData();
  return <RecipeDetail recipe={recipe!} />;
}
