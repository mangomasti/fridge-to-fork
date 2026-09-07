import type { Recipe } from "@/data/recipes";

export interface AirFryerMethod {
  /** Main ingredient the air fryer instructions are written for. */
  focus: string;
  /** Temperature in Celsius. */
  tempC: number;
  /** Temperature in Fahrenheit. */
  tempF: number;
  /** Total cook time in minutes. */
  minutes: number;
  steps: string[];
}

interface Rule {
  match: RegExp;
  focus: string;
  tempC: number;
  minutes: number;
  steps: string[];
}

/** Ordered rules — the first ingredient match wins. */
const rules: Rule[] = [
  {
    match: /chicken (breast|fillet|cutlet)/,
    focus: "chicken breast",
    tempC: 190,
    minutes: 16,
    steps: [
      "Pat the chicken dry and rub with oil and the recipe seasoning.",
      "Preheat the air fryer 3 min at 190C / 375F.",
      "Lay the pieces in one layer, not touching.",
      "Cook 8 min, flip, then cook 6-8 min more.",
      "Check it reads 74C / 165F in the thickest part.",
      "Rest 5 min before slicing, then finish the recipe as written.",
    ],
  },
  {
    match: /chicken (thigh|drumstick|wing)|whole chicken/,
    focus: "chicken thighs",
    tempC: 200,
    minutes: 20,
    steps: [
      "Pat dry, oil lightly and season all over.",
      "Preheat the air fryer 3 min at 200C / 400F.",
      "Cook skin side down 10 min.",
      "Flip and cook 8-10 min until the skin is crisp.",
      "Check it reads 75C / 170F at the bone.",
      "Rest 5 min, then continue with the sauce or bowl.",
    ],
  },
  {
    match: /turkey|chicken mince|ground chicken|meatball|kofta|kebab|patt(y|ies)|burger/,
    focus: "meatballs and patties",
    tempC: 190,
    minutes: 12,
    steps: [
      "Shape evenly so everything cooks at the same rate.",
      "Preheat the air fryer 3 min at 190C / 375F.",
      "Spray lightly with oil and space them apart.",
      "Cook 6 min, turn, then 5-6 min more.",
      "Check they read 74C / 165F in the middle.",
      "Add to the sauce or bun and serve.",
    ],
  },
  {
    match: /salmon|cod|tilapia|halibut|sea bass|white fish|fish fillet/,
    focus: "fish fillets",
    tempC: 190,
    minutes: 10,
    steps: [
      "Pat the fillets dry, oil lightly and season.",
      "Preheat the air fryer 3 min at 190C / 375F.",
      "Cook skin side down 8-10 min, no flipping.",
      "It is done when the flesh flakes with a fork.",
      "Rest 2 min, then plate as the recipe says.",
    ],
  },
  {
    match: /shrimp|prawn|scallop|squid|calamari/,
    focus: "shrimp and shellfish",
    tempC: 200,
    minutes: 7,
    steps: [
      "Toss with oil and the seasoning until coated.",
      "Preheat the air fryer 3 min at 200C / 400F.",
      "Spread in one layer.",
      "Cook 5-7 min, shaking the basket halfway.",
      "Pull them out as soon as they turn opaque and curl.",
    ],
  },
  {
    match: /steak|sirloin|ribeye|beef strip|lamb chop|pork chop|pork tenderloin/,
    focus: "steaks and chops",
    tempC: 200,
    minutes: 12,
    steps: [
      "Take the meat out of the fridge 20 min ahead and season well.",
      "Preheat the air fryer 5 min at 200C / 400F.",
      "Cook 5 min, flip, then 4-6 min more.",
      "Aim for 54C / 130F rare, 60C / 140F medium.",
      "Rest 5 min before slicing against the grain.",
    ],
  },
  {
    match: /ground beef|beef mince|ground lamb|ground pork|bacon|sausage/,
    focus: "sausage and bacon",
    tempC: 190,
    minutes: 10,
    steps: [
      "Lay the pieces flat in one layer.",
      "Preheat the air fryer 3 min at 190C / 375F.",
      "Cook 5 min, turn, then 4-5 min more.",
      "Drain the fat from the drawer before serving.",
    ],
  },
  {
    match: /tofu|tempeh|paneer|halloumi/,
    focus: "tofu and paneer",
    tempC: 200,
    minutes: 14,
    steps: [
      "Press out the water, cut into 2 cm cubes and pat dry.",
      "Toss with oil, a spoon of cornflour and the seasoning.",
      "Preheat the air fryer 3 min at 200C / 400F.",
      "Cook 14 min, shaking the basket every 5 min.",
      "Add to the bowl or sauce right before serving.",
    ],
  },
  {
    match: /potato|sweet potato|fries|wedges/,
    focus: "potatoes",
    tempC: 200,
    minutes: 20,
    steps: [
      "Cut into even 1.5 cm pieces and dry them well.",
      "Toss with oil and salt.",
      "Preheat the air fryer 3 min at 200C / 400F.",
      "Cook 20 min, shaking the basket every 7 min.",
      "Season again straight out of the basket.",
    ],
  },
  {
    match: /chickpea|cauliflower|broccoli|brussels|zucchini|courgette|eggplant|aubergine|pepper|mushroom|carrot|asparagus|green bean/,
    focus: "vegetables",
    tempC: 190,
    minutes: 12,
    steps: [
      "Cut everything the same size so it cooks evenly.",
      "Toss with oil and the seasoning.",
      "Preheat the air fryer 3 min at 190C / 375F.",
      "Cook 10-12 min, shaking the basket halfway.",
      "Look for browned edges and tender centres.",
    ],
  },
];

const skip = /^(sauce|dressing|smoothie|salad|soup|stew|dip|shake|overnight)/i;

/**
 * Derive air fryer instructions for a recipe from its main ingredient.
 * Returns null for recipes with nothing to air fry (sauces, salads, smoothies).
 */
export function getAirFryerMethod(recipe: Recipe): AirFryerMethod | null {
  if (recipe.collection === "sauces") return null;
  if (skip.test(recipe.title)) return null;
  if (recipe.tags.some((t) => /no-cook|smoothie|salad|soup|sauce/i.test(t))) return null;

  const haystack = recipe.ingredients.map((i) => i.name.toLowerCase());

  for (const rule of rules) {
    const hit = haystack.find((name) => rule.match.test(name));
    if (!hit) continue;
    return {
      focus: rule.focus,
      tempC: rule.tempC,
      tempF: Math.round((rule.tempC * 9) / 5 + 32),
      minutes: rule.minutes,
      steps: rule.steps,
    };
  }
  return null;
}

export function isAirFryerFriendly(recipe: Recipe): boolean {
  return getAirFryerMethod(recipe) !== null;
}
