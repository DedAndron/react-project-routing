import { useEffect, useState } from "react";
import { useParams } from "react-router";

import type { CategoryType } from "@/types/CategoryType";
import Category from "@/components/categories/Category";
import Categories from "@/utils/Category";
import Products from "@/utils/Product";
import type {ProductType} from "@/types/ProductType.ts";
import Product from "@/components/product/Product";

const CategoriesList = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const loadCategories = async () => {
            setLoading(true);

            try {
                const data = await Categories.GetAllCategories();

                if (data) {
                    setProducts([]);
                    setCategories(
                        data.filter(category => category.parentId === null)
                    );
                }
            }
            finally {
                setLoading(false);
            }
        };
        const loadSubCategories = async (categoryId: number) => {
            setLoading(true);

            try {
                const data = await Categories.GetSubCategoryById(categoryId);

                if (data && data.length > 0) {
                    setProducts([]);
                    setCategories(data);
                } else {
                    const products = await Products.GetProductsByCategoryId(categoryId);
                    setCategories([]);
                    setProducts(products ?? []);
                }
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            loadSubCategories(Number(id));
        } else {
            loadCategories();
        }

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