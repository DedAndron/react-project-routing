import { useEffect, useState } from "react";
import {useParams} from "react-router";
import type { ProductType } from "@/types/ProductType";
import Product from "@/utils/Product.ts";
import { assetUrl } from "@/services/api.ts";

const ProductDetail = () => {
    const { id } = useParams(); //витягуємо slug з маршрута

    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!id) {
            return;
        }

        const loadProduct = async () => {
            try {
                const data = await Product.GetProductById(Number(id));

                setProduct(data);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };

        loadProduct();

    }, [id]);

    if (loading) {
        return (
            <div className="text-center text-2xl">
                Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center text-red-600 text-2xl">
                Product not found
            </div>
        );
    }

    const imageUrl = assetUrl(
        product.image,
        "products"
    );

    return (
        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow-lg">
            <div className="grid gap-10 md:grid-cols-2">

                <img
                    src={imageUrl}
                    alt={product.name}
                    className="h-96 w-full rounded-xl object-cover"
                />

                <div>

                    <h1 className="mb-6 text-5xl font-bold">
                        {product.name}
                    </h1>

                    <div className="space-y-4 text-lg">

                        <p>
                            <span className="font-semibold">Id:</span> {product.id}
                        </p>

                        <p>
                            <span className="font-semibold">Price:</span> {product.price}
                        </p>

                        <p>
                            <span className="font-semibold">Parent:</span>{" "}
                            {product.categoryId ?? "Root category"}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetail;