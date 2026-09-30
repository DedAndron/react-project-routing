import { useEffect, useState } from "react";
import { useParams } from "react-router";

import type { CategoryType } from "@/types/CategoryType";
import type { ProductType } from "@/types/ProductType";

import Category from "@/components/categories/Category";
import Product from "@/components/product/Product";

import Categories from "@/utils/Category";
import Products from "@/utils/Product";

const CategoriesList = () => {
    const { id } = useParams();

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);

            try {
                const allCategories =
                    await Categories.GetAllCategories();

                if (!allCategories) {
                    setCategories([]);
                    setProducts([]);
                    return;
                }

                // Обычная страница категорий
                if (!id) {
                    setCategories(allCategories);
                    setProducts([]);
                    return;
                }

                const categoryId = Number(id);

                // Ищем дочерние категории
                const subCategories = allCategories.filter(
                    category =>
                        category.parentId === categoryId
                );

                if (subCategories.length > 0) {
                    setCategories(subCategories);
                    setProducts([]);
                    return;
                }

                // Если дочерних категорий нет —
                // показываем товары этой категории.
                const categoryProducts =
                    await Products.GetProductsByCategoryId(
                        categoryId
                    );

                setCategories([]);
                setProducts(categoryProducts ?? []);
            } finally {
                setLoading(false);
            }
        };

        void load();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

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