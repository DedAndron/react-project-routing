import { useState } from "react";
import { useProducts } from "../../../hooks/useProducts.ts";
import type {SubmitEvent} from "react";
import type { ProductType } from "../../../types/ProductType.ts";

const CreateProduct = () => {
    const { products, setProducts } = useProducts();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [count, setCount] = useState(0);
    const [id_category, setCategory] = useState(1);
    const [is_active, setIsActive] = useState(true);

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newProduct: ProductType = {
            id: products.length + 1,
            title,
            image,
            price,
            count,
            id_category,
            is_active,
        };

        setProducts([...products, newProduct]);

        setTitle("");
        setPrice(0);
        setImage("");
        setCount(0);
        setCategory(1);
        setIsActive(true);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-1/2 bg-white p-8 rounded-xl shadow-lg space-y-4"
            >
                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Назва товару
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Введіть назву"
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Ціна
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Зображення (URL)
                    </label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Кількість
                    </label>
                    <input
                        type="number"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Категорія
                    </label>
                    <select
                        value={id_category}
                        onChange={(e) => setCategory(Number(e.target.value))}
                        className="w-full px-3 py-2 border rounded-lg"
                    >
                        <option value={1}>Ноутбуки</option>
                        <option value={2}>Смартфони</option>
                        <option value={3}>Навушники</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={is_active}
                        onChange={(e) => setIsActive(e.target.checked)}
                        id="is_active"
                    />
                    <label htmlFor="is_active">
                        Активний товар
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-lg"
                >
                    Створити товар
                </button>
            </form>
        </div>
    );
};
export default CreateProduct;


