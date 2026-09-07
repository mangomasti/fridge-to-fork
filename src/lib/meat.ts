import type { Recipe } from "@/data/recipes";

export type MeatType = "chicken-turkey" | "red-meat" | "seafood" | "eggs-dairy-plant";

export const meatTypeLabels: Record<MeatType, string> = {
  "chicken-turkey": "Chicken & turkey",
  "red-meat": "Beef, lamb & pork",
  seafood: "Fish & seafood",
  "eggs-dairy-plant": "Eggs, dairy & plant",
};

export const meatTypes: MeatType[] = [
  "chicken-turkey",
  "red-meat",
  "seafood",
  "eggs-dairy-plant",
];

const groups: Array<{ type: MeatType; keywords: string[] }> = [
  { type: "chicken-turkey", keywords: ["chicken", "turkey"] },
  {
    type: "red-meat",
    keywords: ["beef", "steak", "lamb", "pork", "bacon", "carnitas", "sirloin", "ground beef"],
  },
  {
    type: "seafood",
    keywords: ["salmon", "shrimp", "prawn", "tuna", "cod", "tilapia", "scallop", "fish", "seafood"],
  },
];

export function getMeatType(recipe: Recipe): MeatType {
  const haystack = [
    recipe.title,
    ...recipe.ingredients.map((i) => i.name),
    ...recipe.tags,
  ]
    .join(" ")
    .toLowerCase();

  for (const group of groups) {
    if (group.keywords.some((k) => haystack.includes(k))) return group.type;
  }
  return "eggs-dairy-plant";
}
