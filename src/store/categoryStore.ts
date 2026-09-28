import { create } from "zustand";
import type { CategoryType } from "@/types/CategoryType";

type CategoryStore = {
    categories: CategoryType[];
    loading: boolean;
    error: string | null;
    getCategories: () => Promise<void>;
};

export const categoryStore = create<CategoryStore>((set) => ({
    categories: [],
    loading: false,
    error: null,
    getCategories: async () => {
        try {
            set({
                loading: true,
                error: null,
            });
            const response = await fetch(
                import.meta.env.VITE_PATH_TO_SERVER + "/categories",
            );
            if (!response.ok) {
                throw new Error("Помилка отримання даних");
            }
            const data: CategoryType[] = await response.json();
            set({
                loading: false,
                error: null,
                categories: data,
            });
        } catch (error) {
            set({
                loading: false,
                error: "Не вдалось отримати категорії " + error,
            });
        }
    },
}));
