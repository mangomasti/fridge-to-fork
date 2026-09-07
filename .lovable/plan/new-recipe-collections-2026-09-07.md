# New Recipe Collections

Adds 21 new recipes in five collections, keeping the current design and layout.

## Collections

- **Fridge Rescue** — Egg Fried Rice, Garlic Butter Pasta, Veggie Frittata, Chickpea Skillet
- **World Classics Simplified** — Carbonara, Shakshuka (simplified), Chicken Tikka, Pad Thai, Coq au Vin, Miso Soup
- **5-Ingredient Wonders** — Tomato Confit Pasta, Honey Garlic Salmon, Caprese Toast, Roasted Chickpea Bowl
- **One-Pan Meals** — Sheet Pan Chicken & Veg, Skillet Gnocchi, Baked Feta Pasta
- **Sauces & Bases** — Tomato Sauce, Vinaigrette, Garlic Aioli, Chimichurri

## What each recipe gets

- Name, cuisine/origin, full ingredient list (with amounts), difficulty shown as 1–3 stars, cook time, and a "Chef technique" tip.
- Full cooking steps and macros per serving so they work with the existing macro panel, meal plan and fridge matcher.
- A generated dish photo in the same warm style as the existing 57 photos.
- Sauces get short times and yields (Tomato Sauce 30 min, Vinaigrette 5 min, Garlic Aioli 10 min, Chimichurri 10 min); they are tagged as sauces so they don't skew protein filters.

## How they show up

- All new recipes join the existing Browse grid and the fridge matcher — no new pages.
- Browse gains a **Collection** chip row (All, Fridge Rescue, World Classics, 5-Ingredient, One-Pan, Sauces & Bases) alongside the existing cuisine and protein chips.
- Recipe cards keep the current look and add a small difficulty star rating next to the cook time.
- Recipe pages show the collection badge and a "Chef technique" callout under the ingredients.
- Home page gets a row of collection shortcut cards linking into Browse pre-filtered.

## Notes on overlaps

- A Shakshuka already exists; the new one is added as the simplified 25-minute version with a distinct name ("Shakshuka, Simplified") so both stay browsable.
- A Caprese Chicken already exists; Caprese Toast is separate.

## Technical notes

- New `src/data/recipes-collections.ts` exporting `collectionRecipes: Recipe[]`, appended in `src/data/recipes.ts` alongside `extraRecipes`.
- `Recipe` type gains optional `collection?: Collection`, `difficulty?: 1 | 2 | 3`, `technique?: string`; `Cuisine` union extends with French, Thai, Japanese, Argentinian.
- New `collections` / `collectionLabels` exports drive the FilterBar chip row and `recipes.index.tsx` filter state.
- Photos generated to `src/assets/recipes/*.jpg` (768x512) and registered in `src/data/recipe-images.ts`.
- `RecipeCard` renders stars + time; `RecipeDetail` renders the technique callout and collection badge.
