import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import type { CategoryType } from "@/types/CategoryType.ts";
import Category from "@/utils/Category.ts";
import AppRoutes from "@/enums/AppRoutes.ts";

type CategoryFormValues = {
    name: string;
    slug: string;
    image: FileList;
    parentId: string;
};

const CreateCategory = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [submitError, setSubmitError] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CategoryFormValues>();

    useEffect(() => {
        void Category.GetAllCategories().then((data) => setCategories(data ?? []));
    }, []);

    const onSubmit = async ({
                                parentId,
                                image,
                                ...values
                            }: CategoryFormValues) => {
        setSubmitError("");

        try {
            await Category.Create(
                {
                    ...values,
                    parentId: parentId ? Number(parentId) : null,
                },
                image?.[0]
            );

            navigate(AppRoutes.CATEGORIES);
        } catch (error) {
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "Не вдалося створити категорію."
            );
        }
    };

    return <section className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
            <div><h1 className="text-2xl font-bold text-slate-900">Створити категорію</h1><p
                className="mt-1 text-sm text-slate-600">Категорія буде збережена в базі даних.</p></div>
            <Link className="text-sm font-medium text-blue-700 hover:text-blue-900" to={AppRoutes.CATEGORIES}>До
                категорій</Link></div>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate><CategoryField label="Назва"
                                                                                                error={errors.name?.message}><input
            className="form-input" {...register("name", {required: "Вкажіть назву категорії."})} /></CategoryField><CategoryField
            label="Slug" error={errors.slug?.message}><input className="form-input"
                                                             placeholder="electronics" {...register("slug", {
            required: "Вкажіть slug.",
            pattern: {value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: "Використовуйте латинські літери, цифри та дефіси."}
        })} /></CategoryField><CategoryField
            label="Зображення (необов'язково)"
            error={errors.image?.message}
        >
            <input
                className="form-input"
                type="file"
                accept="image/*"
                {...register("image")}
            />
        </CategoryField><CategoryField
            label="Батьківська категорія (необов'язково)" error={errors.parentId?.message}><select
            className="form-input" defaultValue="" {...register("parentId")}>
            <option value="">Без батьківської категорії</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select></CategoryField>{submitError && <p className="form-error" role="alert">{submitError}</p>}
            <button
                className="rounded-md bg-blue-700 px-5 py-2.5 font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                disabled={isSubmitting} type="submit">{isSubmitting ? "Збереження..." : "Створити категорію"}</button>
        </form>
    </section>;
};

const CategoryField = ({ label, error, children }: { label: string; error?: string; children: ReactNode }) => <label className="block text-sm font-medium text-slate-700"><span className="mb-1 block">{label}</span>{children}{error && <span className="form-error" role="alert">{error}</span>}</label>;

export default CreateCategory;