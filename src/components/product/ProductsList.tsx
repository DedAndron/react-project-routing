import Product from "./Product";
import type { ProductType } from "@/types/ProductType";

type Props = {
    products: ProductType[];
};

const ProductsList = ({ products }: Props) => {
    return (
        <div className="container mx-auto py-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {products.map(product => (
                    <Product
                        key={product.id}
                        product={product}
                    />
                ))}

            </div>

        </div>
    );
};

export default ProductsList;