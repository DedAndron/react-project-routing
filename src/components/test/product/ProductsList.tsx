import Product from "./Product.tsx";
import { useProducts } from "../../../hooks/useProducts.ts";

const ProductsList = () => {
    const { products } = useProducts();

    if (products.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                Список товарів порожній
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-6 p-8 justify-center">
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductsList;
