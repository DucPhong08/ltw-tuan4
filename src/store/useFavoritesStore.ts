import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '../types/product';

interface FavoritesState {
  favorites: Product[];
  toggleFavorite: (product: Product) => boolean; // returns true if added, false if removed
  removeFavorite: (productId: string) => void;
  clearFavorites: () => void;
  isFavorite: (productId: string) => boolean;
  getFavoriteCount: () => number;
  getTotalFavoritesValue: () => number;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product: Product) => {
        const currentFavorites = get().favorites;
        const exists = currentFavorites.some((item) => item.id === product.id);

        if (exists) {
          set({
            favorites: currentFavorites.filter((item) => item.id !== product.id),
          });
          return false; // Removed
        } else {
          set({
            favorites: [product, ...currentFavorites],
          });
          return true; // Added
        }
      },

      removeFavorite: (productId: string) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== productId),
        }));
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },

      isFavorite: (productId: string) => {
        return get().favorites.some((item) => item.id === productId);
      },

      getFavoriteCount: () => {
        return get().favorites.length;
      },

      getTotalFavoritesValue: () => {
        return get().favorites.reduce((total, item) => total + item.price, 0);
      },
    }),
    {
      name: 'ltw-favorites-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
