# Fridge To Fork — servings, grouped fridge picker, grocery list

## 1. Rename the site to Fridge To Fork

- New name everywhere it shows: header logo, footer, page titles and descriptions on every page, and the browser tab.
- Saved favorites, meal plans and other stored data carry over so nothing a visitor already saved is lost.

## 2. Serving-size adjuster on each recipe

- A small "Servings" control at the top of every recipe page: minus / number / plus, from 1 up to 12, starting at the recipe's own serving count.
- Every ingredient amount rescales live (2 chicken breasts → 1, 400 g tomatoes → 200 g), including spices and small amounts, rounded to sensible cooking numbers (quarters for spoons, whole grams).
- Calories and protein/carbs/fat show both per serving (unchanged) and the new batch total.
- The chosen serving count is remembered per recipe while browsing, and adding to the meal plan or grocery list uses that count.
- Amounts that can't be scaled (for example "to taste", "a pinch") stay as written.

## 3. Fridge picker organized and easier to select

- Ingredients grouped into clear labelled sections stacked down the page: Meat & Poultry, Fish & Seafood, Eggs & Dairy, Vegetables, Pantry & Grains, Spices & Herbs.
- Each section is collapsible with a count of how many you picked in it, so long lists don't overwhelm.
- Selected items get a filled colour plus a checkmark, larger tap targets, and a sticky bar at the bottom showing "N ingredients selected" with Clear all and a jump to matches.
- Search still filters across all groups; a "Selected" chip row stays visible at the top.

## 4. Save dishes + grocery wishlist

- The existing heart becomes the single "Saved" action, and every recipe card, famous-recipe row and recipe page also gets an "Add to grocery list" button.
- New **Grocery list** page in the main navigation:
  - Items grouped by the same categories as the fridge picker.
  - Quantities combine when two recipes need the same ingredient, scaled by each recipe's chosen servings.
  - Tick items off, remove single items, clear checked, clear all.
  - Shows which recipes each item came from.
- Everything is stored on the device, no account needed.

## Technical notes

- `src/lib/scale.ts`: parse leading quantity from `Ingredient.amount` (integers, decimals, fractions like `1/2`, ranges), scale by `servings / recipe.servings`, re-render with the original unit; non-numeric amounts pass through untouched.
- New `useServings(recipe)` hook (localStorage `f2f-servings`) and `useGroceryList()` hook (localStorage `f2f-grocery`) storing `{ ingredientName, amounts[], category, recipeIds[], checked }`.
- Rename storage keys with a one-time migration from the `fuel-kitchen-*` keys.
- Extend `ingredientCatalog` grouping in `src/data/recipes.ts` to the six categories above; add a `categoryOf(name)` helper in `src/lib/meat.ts` or a new `src/lib/categories.ts` reused by the picker and grocery list.
- `IngredientPicker.tsx` rewritten with collapsible sections (shadcn Accordion) and a sticky selection bar.
- New route `src/routes/grocery.tsx` with its own `head()` metadata; add nav entry in `Header.tsx`.
- Update `head()` titles/descriptions on all routes for the new name.
