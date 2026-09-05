import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "fuel-kitchen-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setFavorites(parsed.filter((id): id is string => typeof id === "string"));
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const toggle = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const add = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const remove = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((x) => x !== id));
  }, []);

  return { favorites, toggle, isFavorite, add, remove, hydrated };
}
