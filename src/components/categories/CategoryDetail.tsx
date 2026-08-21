import { useEffect, useState } from "react";
import {useParams} from "react-router";
import type { CategoryType } from "@/types/CategoryType";
import Category from "@/utils/Category.ts";

const CategoryDetail = () => {
    const { slug } = useParams(); //витягуємо slug з маршрута

    const [category, setCategory] = useState<CategoryType | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!slug)
            return;

        const loadCategory = async () => {
            try {
                const data = await Category.GetCategoryBySlug(slug);

                setCategory(data);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };

        loadCategory();

    }, []);

    if (loading) {
        return (
            <div className="text-center text-2xl">
                Loading...
            </div>
        );
    }

    if (!category) {
        return (
            <div className="text-center text-red-600 text-2xl">
                Category not found
            </div>
        );
    }

    const imageUrl = import.meta.env.VITE_PATH_TO_SERVER+category.url;

    return (
        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow-lg">
            <div className="grid gap-10 md:grid-cols-2">

                <img
                    src={imageUrl}
                    alt={category.name}
                    className="h-96 w-full rounded-xl object-cover"
                />

                <div>

                    <h1 className="mb-6 text-5xl font-bold">
                        {category.name}
                    </h1>

                    <div className="space-y-4 text-lg">

                        <p>
                            <span className="font-semibold">Id:</span> {category.id}
                        </p>

                        <p>
                            <span className="font-semibold">Slug:</span> {category.slug}
                        </p>

                        <p>
                            <span className="font-semibold">Parent:</span>{" "}
                            {category.parentId ?? "Root category"}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CategoryDetail;