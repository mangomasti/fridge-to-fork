import { ingredientCatalog, type IngredientCategory } from "@/data/recipes";

const lookup = new Map<string, IngredientCategory>();
for (const [category, items] of Object.entries(ingredientCatalog)) {
  for (const name of items as string[]) {
    if (!lookup.has(name.toLowerCase())) {
      lookup.set(name.toLowerCase(), category as IngredientCategory);
    }
  }
}

const keywordRules: Array<[RegExp, IngredientCategory]> = [
  [/chicken|turkey|beef|steak|pork|lamb|bacon|sausage|ham|mince/i, "meat"],
  [/salmon|shrimp|prawn|tuna|cod|tilapia|scallop|fish|squid|crab/i, "seafood"],
  [/egg|yogurt|milk|cheese|cream|butter|paneer|feta|parmesan|mozzarella/i, "eggsDairy"],
  [/tofu|tempeh|bean|lentil|chickpea|seitan/i, "plantProtein"],
  [/pepper$|onion|garlic|tomato|spinach|broccoli|carrot|zucchini|lettuce|cabbage|herb|basil|parsley|cilantro|potato|corn|celery|cucumber|greens|mushroom/i, "veggies"],
  [/cumin|masala|turmeric|paprika|chili|cayenne|curry|oregano|thyme|cinnamon|saffron|seasoning|spice|salt|pepper/i, "spices"],
];

export function categoryOf(name: string): IngredientCategory {
  const direct = lookup.get(name.toLowerCase());
  if (direct) return direct;
  for (const [pattern, category] of keywordRules) {
    if (pattern.test(name)) return category;
  }
  return "pantry";
}
