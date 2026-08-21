import type { ProductType } from "@/types/ProductType";

type Props = {
    product: ProductType;
};

const Product = ({ product }: Props) => {

    const image =
        product.images.length > 0
            ? `${import.meta.env.VITE_PATH_TO_SERVER}products/${product.images[0]}`
            : "https://placehold.co/600x400";

    return (
        <div className="group overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={product.name}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="flex h-[250px] flex-col p-5">

                <h2 className="line-clamp-2 text-lg font-semibold text-gray-900">
                    {product.name}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm text-gray-500">
                    {product.description}
                </p>

                <div className="mt-auto">

                    <div className="mb-4 flex items-center justify-between">

                        <span className="text-3xl font-bold text-indigo-600">
                            {product.price.toLocaleString()} ₴
                        </span>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                product.stockQty > 0
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {product.stockQty > 0
                                ? `${product.stockQty} шт`
                                : "Немає"}
                        </span>

                    </div>

                    <button
                        className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 active:scale-95"
                    >
                        Детальніше
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Product;