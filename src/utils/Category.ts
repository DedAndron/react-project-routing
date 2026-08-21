import type {CategoryType} from "@/types/CategoryType.ts";

class Category {
    private static readonly path:string = import.meta.env.VITE_PATH_TO_SERVER
        + import.meta.env.VITE_PATH_TO_API
        + "category/";
    public static async GetCategoryBySlug(slug: string):Promise<CategoryType|null> {
        const response = await fetch(
            Category.path + slug
        );
        if (!response.ok) {
            return null;
        }
        return await response.json();
    }

    public static async GetAllCategories():Promise<CategoryType[]|null> {
        const response = await fetch(
            Category.path
        );
        if (!response.ok) {
            return null;
        }
        return await response.json();
    }

    public static async GetSubCategoryById(id: number):Promise<CategoryType[]|null> {
        const response = await fetch(
            Category.path + 'sub/' + id
        );
        if (!response.ok) {
            return null;
        }
        return await response.json();
    }
}
export default Category;