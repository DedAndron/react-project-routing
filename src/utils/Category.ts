import type { CategoryType } from "@/types/CategoryType.ts";
import { apiUrl, getErrorMessage } from "@/services/api.ts";

class Category {
    private static readonly path = "Category/";

    public static async GetCategoryBySlug(
        slug: string
    ): Promise<CategoryType | null> {
        const response = await fetch(
            apiUrl(Category.path + slug)
        );

        if (!response.ok) {
            return null;
        }

        return await response.json();
    }

    public static async GetAllCategories(): Promise<CategoryType[] | null> {
        const response = await fetch(
            apiUrl(Category.path + "all")
        );

        if (!response.ok) {
            return null;
        }

        return await response.json();
    }

    public static async Create(
        category: Omit<CategoryType, "id">
    ): Promise<string> {
        const formData = new FormData();

        formData.append("name", category.name);
        formData.append("slug", category.slug);
        formData.append("url", category.url ?? "");

        if (category.parentId !== null) {
            formData.append(
                "parentId",
                String(category.parentId)
            );
        }

        const response = await fetch(
            apiUrl(Category.path + "create"),
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(
                await getErrorMessage(
                    response,
                    "Не вдалося створити категорію."
                )
            );
        }

        return await response.text();
    }
}

export default Category;