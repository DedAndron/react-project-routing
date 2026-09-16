import type {CategoryType} from "@/types/CategoryType.ts";
import { apiUrl, getErrorMessage } from "@/services/api.ts";

class Category {
    private static readonly path = "category/";
    public static async GetCategoryBySlug(slug: string):Promise<CategoryType|null> {
        const response = await fetch(
            apiUrl(Category.path + slug)
        );
        if (!response.ok) {
            return null;
        }
        return await response.json();
    }

    public static async GetAllCategories():Promise<CategoryType[]|null> {
        const response = await fetch(
            apiUrl(Category.path)
        );
        if (!response.ok) {
            return null;
        }
        return await response.json();
    }

    public static async GetSubCategoryById(id: number):Promise<CategoryType[]|null> {
        const response = await fetch(
            apiUrl(Category.path + 'sub/' + id)
        );
        if (!response.ok) {
            return null;
        }
        return await response.json();
    }

    public static async Create(category: Omit<CategoryType, "id">): Promise<CategoryType> {
        const response = await fetch(apiUrl(Category.path), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(category),
        });

        if (!response.ok) {
            throw new Error(await getErrorMessage(response, "Не вдалося створити категорію."));
        }

        return await response.json();
    }
}
export default Category;