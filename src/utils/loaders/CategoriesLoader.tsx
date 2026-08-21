import Categories from "@/utils/Category";
import Products from "@/utils/Product";

export async function CategoriesLoader({ params }: { params: { id?: string } }) {
    if (!params.id) {
        const data = await Categories.GetAllCategories();

        return {
            categories: data?.filter(category => category.parentId === null) ?? [],
            products: []
        };
    }

    const categoryId = Number(params.id);

    const subCategories = await Categories.GetSubCategoryById(categoryId);

    if (subCategories && subCategories.length > 0) {
        return {
            categories: subCategories,
            products: []
        };
    }

    const products = await Products.GetProductsByCategoryId(categoryId);

    return {
        categories: [],
        products: products ?? []
    };
}