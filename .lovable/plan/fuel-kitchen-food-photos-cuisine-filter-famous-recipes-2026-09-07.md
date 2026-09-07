# Fuel Kitchen — Food Photos, Cuisine Filter & Famous Recipes

Adds real dish photos everywhere, makes the cuisine filter prominent, gives the fridge section a clearer home, and broadens the meat coverage.

## 1. A photo for every recipe

- Generate a unique dish photo for all 40 recipes (appetising, top-down/45-degree food photography, warm natural light, consistent style so the grid looks cohesive).
- Photos replace the coloured gradient tiles on recipe cards, and appear as a large banner on each recipe page.
- Photos are stored as hosted files so the app stays fast, with descriptive alt text for search engines.
- Recipe pages that show a photo also use it as the link preview image when shared.

## 2. Cuisine filter front and centre

- On the Browse page, cuisines become a row of tappable image/label chips at the top (All, Indian, Mediterranean, Mexican, Asian, American, Italian, Middle Eastern) instead of a dropdown.
- Existing filters (diet, minimum protein, cook time, chef-inspired, search) stay below.
- A meat-type filter is added: Chicken & turkey, Beef, lamb & pork, Fish & seafood, Eggs & dairy, Plant-based.

## 3. "What's in your fridge" section

- Stays its own page, with the ingredient picker restyled as one clearly labelled panel (proteins, veggies, pantry, spices, dairy) and matched recipes shown as photo cards with a match percentage.
- A compact teaser on the home page links straight to it.

## 4. Famous recipes list with cook times

- New "Famous recipes" section on the home page and a highlighted block on Browse: chef-inspired dishes listed with photo, dish name, chef, cook time, and protein.
- Each entry keeps its "inspired by" note and source link.

## 5. All types of meats

- Expand the recipe set so every meat group is well covered: chicken and turkey, beef, lamb, pork, fish and seafood, plus the existing egg, dairy and plant-protein options.
- Add roughly 12–16 new recipes to fill gaps (lamb, pork, turkey, more seafood), each with full macros, ingredients, steps and a photo.
- Each recipe gains a meat-type tag driving the new filter and the fridge matcher.

## Technical notes

- Images generated with the agent image tool into `src/assets/recipes/`, then externalised via `lovable-assets` pointers; `Recipe` gains an `image` field (gradient kept as fallback) and a `meatType` field.
- `RecipeCard` and `RecipeDetail` render `<img>` with lazy loading; `recipes.$id.tsx` head() adds `og:image` / `twitter:image` using the absolute CDN URL.
- `FilterBar` gains cuisine chips + meat-type chips; `recipes.index.tsx` and `matcher.ts` filter options extend with `meatType`.
- New `FamousRecipes` component reused on `/` and `/recipes`.
