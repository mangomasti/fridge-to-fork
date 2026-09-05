# Fuel Kitchen — High-Protein Recipe Builder

A recipe builder for gym-goers and healthy eaters, inspired by (and improving on) the "Spice & Protein" prototype. Broader cuisines, stronger macro focus, no accounts required.

## Pages

- **Home (`/`)** — bold landing: hero, how it works, macro-focused value props, entry points to Browse and Fridge Matcher.
- **Browse Recipes (`/recipes`)** — ~40 seeded recipes across Indian, Mediterranean, Mexican, Asian, and American cuisines. A prominent **World-Famous Chefs** collection adds click-worthy discovery through recognizable chef names and dishes. Filter chips: diet (meat / vegetarian / vegan), cuisine, min-protein slider, max-time, and chef recipes. Each card shows protein g, calories, cook time, diet tag, and chef attribution where applicable.
- **Recipe Detail (`/recipes/$id`)** — full recipe with a prominent **Macros panel** listing calories, protein, carbs, and fat per serving, plus per-ingredient macro contributions. Ingredients with quantities, numbered steps, tags.
- **What's In My Fridge (`/fridge`)** — improved version of the prototype's core: grouped ingredient picker (proteins, veggies, pantry, spices, dairy), live match-ranked recipe list (matched by % of ingredients you have), one-tap "Surprise me" suggestions.
- **Meal Plan (`/plan`)** — save recipes to a day-by-day weekly plan (stored in browser localStorage, no login). Shows daily + weekly protein/calorie totals so gym users can hit targets. Favorites can also be saved from any recipe card.

## Data

- Built-in curated recipe dataset (~40 recipes) shipped in the app — instant, no backend needed. Each recipe carries full macros (calories, protein, carbs, fat per serving and per ingredient), ingredients, steps, cuisine, and diet tags.
- Chef content will use properly attributed public recipe references or original high-protein adaptations clearly labeled as “inspired by,” with a visible source link when a published recipe is referenced. The app will not copy protected editorial text or imply endorsement.
- Fridge matcher ranks seeded recipes by ingredient coverage client-side.
- Favorites + meal plan persist in localStorage. (If you later want accounts, sync across devices, or AI-generated recipes, we can enable Lovable Cloud + Lovable AI in a follow-up.)

## Design

After plan approval, I'll generate 3 distinct visual directions for you to pick from, all preserving the prototype's warm cream background, charcoal text, and spicy orange-red accents. The variations will explore more polished fitness-editorial layouts and typography without changing that familiar color identity.

## Technical notes

- TanStack Start routes: `index.tsx`, `recipes.tsx`, `recipes.$id.tsx`, `fridge.tsx`, `plan.tsx`; shared header/nav in `__root.tsx`.
- Recipe dataset in `src/data/recipes.ts`; matcher logic in `src/lib/matcher.ts` with unit-tested ranking.
- Each route gets its own SEO `head()` metadata; semantic design tokens in `src/styles.css`.
