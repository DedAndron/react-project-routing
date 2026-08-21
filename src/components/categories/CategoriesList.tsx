import { useLoaderData } from "react-router-dom";

import type { CategoryType } from "@/types/CategoryType";
import type { ProductType } from "@/types/ProductType";

import Category from "@/components/categories/Category";
import Product from "@/components/product/Product";

type CategoriesLoaderData = {
    categories: CategoryType[];
    products: ProductType[];
};

const CategoriesList = () => {
    const { categories, products } =
        useLoaderData() as CategoriesLoaderData;

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map(category => (
                <Category
                    key={category.id}
                    category={category}
                />
            ))}

            {products.map(product => (
                <Product
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default CategoriesList;