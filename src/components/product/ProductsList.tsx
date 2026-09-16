import { useEffect, useState } from "react";
import Product from "./Product";
import type { ProductType } from "@/types/ProductType";
import Products from "@/utils/Product.ts";

const ProductsList = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await Products.GetAllProducts();
                setProducts(data ?? []);
            } finally {
                setLoading(false);
            }
        };

        void loadProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (products.length === 0) {
        return <div className="p-8 text-center text-gray-500">Список товарів порожній</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map(product => <Product key={product.id} product={product} />)}
            </div>
        </div>
    );
};

export default ProductsList;