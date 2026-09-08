# More sauces for Sauces & Bases

Today the Sauces & Bases collection has 4 entries: Tomato Sauce, Vinaigrette, Garlic Aioli, Chimichurri. This adds 12 more, so the collection covers everyday cooking, dips, dressings and finishing sauces.

## New sauces

Creamy and dip style
1. Tzatziki — yogurt, cucumber, garlic, dill (5 min, no-cook)
2. Hummus — chickpeas, tahini, lemon, garlic (10 min)
3. Ranch Dressing — buttermilk, yogurt, herbs (5 min)
4. Peanut Satay Sauce — peanut butter, soy, lime, chili (10 min)

Warm and pan sauces
5. Béchamel (White Sauce) — butter, flour, milk (15 min)
6. Cheese Sauce — béchamel plus cheddar (15 min)
7. Mushroom Cream Pan Sauce — mushrooms, cream, thyme (15 min)
8. Curry Base (Onion Tomato Masala) — onion, tomato, ginger, garlic, spices (30 min, freezer friendly)

Fresh, spicy and finishing
9. Pesto — basil, pine nuts, parmesan, olive oil (10 min)
10. Salsa Verde / Green Chutney — coriander, mint, chili, lime (10 min)
11. Pico de Gallo — tomato, onion, jalapeño, lime (10 min)
12. Chili Garlic Crisp Oil — chili flakes, garlic, hot oil (15 min)

Each gets the same treatment as existing recipes: photo, ingredients with amounts, macros per serving, a chef technique tip, difficulty rating, 6-9 detailed steps, tags, and the serving-size adjuster.

## Notes
- Sauces mostly serve 4-6, so the servings adjuster scales usable amounts.
- Sauce ingredients (tahini, peanut butter, buttermilk, chili flakes, pine nuts, coriander, mint, jalapeño) get added to the fridge picker under the right groups (dairy, pantry, herbs & spices, produce), so fridge matching still works.
- Air fryer section stays off for sauces, since it does not apply.

## Technical
- Append the 12 recipes to `src/data/recipes-collections.ts` with `collection: "sauces"`.
- Generate 12 photos into `src/assets/recipes/` and register them in `src/data/recipe-images.ts`.
- Extend the ingredient catalog in `src/data/recipes.ts` with any missing sauce ingredients.
- Run typecheck and existing tests.
