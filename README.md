# 🍳 Fridge To Fork(https://anytimechef.lovable.app)

> **Cooking shouldn't feel like a chore.** Fridge To Fork eliminates kitchen decision fatigue, cuts food waste, and makes healthy, high-protein eating effortless.

[![Built with TanStack Start](https://img.shields.io/badge/Built%20with-TanStack%20Start-FF4154?style=flat-square)](https://tanstack.com/start)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square)](https://react.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square)](https://www.typescriptlang.org/)

---

## 💡 The Problem

- **Decision Fatigue**: Staring at a full fridge after a long workday with "nothing to eat."
- **Food Waste**: Produce spoiling because a recipe called for a tablespoon of something you never used again.
- **Overcomplicated Recipes**: Endless blog scroll, 20-step techniques, and rigid ingredient lists.
- **Nutrition Guesswork**: Hard to hit fitness or macro goals without tedious manual logging.

## ✨ How Fridge To Fork Simplifies Cooking

1. **Fridge Matcher ("Fridge Rescue")**
   Select the proteins, pantry items, and veggies you already have. The matching engine instantly surfaces dishes you can cook right now, ranking recipes by missing ingredients and letting you toggle additions with a single tap.

2. **One-Click Serving & Spice Scaling**
   Cooking for one or meal-prepping for six? Adjust the serving slider (1–12) and every ingredient, spice ratio, and macro count recalculates dynamically in real time.

3. **Air Fryer & One-Pan First**
   Over 50 recipes feature dedicated air-fryer workflows and one-pan methods for minimal cleanup and faster table-to-plate times.

4. **Curated Collections for Busy People**
   - **Fridge Rescue**: Transform leftover odds and ends into comforting meals.
   - **5-Ingredient Wonders**: Maximum flavor with minimalist pantry requirements.
   - **One-Pan Meals**: Minimal prep, single-vessel cleanup.
   - **Sauces & Bases**: 10-minute homemade sauces (tzatziki, pesto, chili crisp, chimichurri) that elevate basic proteins and grains.
   - **World Classics Simplified**: Restaurant favorites made approachable at home.

5. **Integrated Grocery Wishlist & Weekly Meal Planner**
   Plan breakfasts, lunches, and dinners across the week with cumulative macro tracking, and export missing ingredients directly into a consolidated grocery list.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack React 19 SSR/SSG on Vite 7)
- **Routing & State**: TanStack Router with type-safe loaders and params
- **Styling**: Tailwind CSS v4 with semantic tokens and dark-mode compatibility
- **Components**: Radix UI / shadcn accessible primitives & Lucide icons
- **Quality Assurance**: Vitest unit test suite + Playwright end-to-end browser workflows

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- [bun](https://bun.sh/) or [npm](https://docs.npmjs.com/)

### Local Setup

```sh
# Clone repository
git clone <repository-url>
cd fridge-to-fork

# Install dependencies
bun install
# or: npm install

# Start development server
bun run dev
# or: npm run dev
