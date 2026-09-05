# Fuel Kitchen — High-Protein Recipe Builder

A recipe builder for gym-goers and healthy eaters, inspired by (and improving on) the "Spice & Protein" prototype. Broader cuisines, stronger macro focus, no accounts required.

## Pages

- **Home (`/`)** — bold landing: hero, how it works, macro-focused value props, entry points to Browse and Fridge Matcher.
- **Browse Recipes (`/recipes`)** — ~40 seeded recipes across Indian, Mediterranean, Mexican, Asian, and American cuisines. Filter chips: diet (meat / vegetarian / vegan), cuisine, min-protein slider, max-time. Each card shows protein g, calories, cook time, diet tag.
- **Recipe Detail (`/recipes/$id`)** — full recipe: macros (protein/carbs/fat/calories), ingredients with quantities, numbered steps, tags.
- **What's In My Fridge (`/fridge`)** — improved version of the prototype's core: grouped ingredient picker (proteins, veggies, pantry, spices, dairy), live match-ranked recipe list (matched by % of ingredients you have), one-tap "Surprise me" suggestions.
- **Meal Plan (`/plan`)** — save recipes to a day-by-day weekly plan (stored in browser localStorage, no login). Shows daily + weekly protein/calorie totals so gym users can hit targets. Favorites can also be saved from any recipe card.

## Data

- Built-in curated recipe dataset (~40 recipes) shipped in the app — instant, no backend needed. Each recipe carries full macros, ingredients, steps, cuisine, and diet tags.
- Fridge matcher ranks seeded recipes by ingredient coverage client-side.
- Favorites + meal plan persist in localStorage. (If you later want accounts, sync across devices, or AI-generated recipes, we can enable Lovable Cloud + Lovable AI in a follow-up.)

## Design

After plan approval, I'll generate 3 distinct visual directions (energetic fitness-editorial styles) for you to pick from, then build the chosen one faithfully — no generic AI look.

## Technical notes

- TanStack Start routes: `index.tsx`, `recipes.tsx`, `recipes.$id.tsx`, `fridge.tsx`, `plan.tsx`; shared header/nav in `__root.tsx`.
- Recipe dataset in `src/data/recipes.ts`; matcher logic in `src/lib/matcher.ts` with unit-tested ranking.
- Each route gets its own SEO `head()` metadata; semantic design tokens in `src/styles.css`.
