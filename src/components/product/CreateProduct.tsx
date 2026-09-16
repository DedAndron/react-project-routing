import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import type { CategoryType } from "@/types/CategoryType.ts";
import Category from "@/utils/Category.ts";
import Product from "@/utils/Product.ts";
import AppRoutes from "@/enums/AppRoutes.ts";

type ProductFormValues = {
    name: string;
    price: number;
    description: string;
    stockQty: number;
    category_id: number;
    image: string;
    is_active: boolean;
};

const CreateProduct = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loadError, setLoadError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProductFormValues>({
        defaultValues: { is_active: true, stockQty: 0 },
    });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await Category.GetAllCategories();
                if (data) {
                    setCategories(data);
                    return;
                }
                setLoadError("Не вдалося завантажити категорії.");
            } catch {
                setLoadError("Не вдалося завантажити категорії.");
            }
        };

        void loadCategories();
    }, []);

    const onSubmit = async ({ image, ...values }: ProductFormValues) => {
        setSubmitError("");
        try {
            await Product.Create({ ...values, images: image ? [image] : [] });
            navigate(AppRoutes.PRODUCTS);
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : "Не вдалося створити товар.");
        }
    };

    return (
        <section className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Створити товар</h1>
    <p className="mt-1 text-sm text-slate-600">Новий товар буде збережено в базі даних.</p>
    </div>
    <Link className="text-sm font-medium text-blue-700 hover:text-blue-900" to={AppRoutes.PRODUCTS}>До товарів</Link>
    </div>
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
    <FormField label="Назва товару" error={errors.name?.message}>
    <input className="form-input" {...register("name", { required: "Вкажіть назву товару." })} />
    </FormField>
    <div className="grid gap-5 sm:grid-cols-2">
    <FormField label="Ціна" error={errors.price?.message}>
    <input className="form-input" type="number" min="0" step="0.01" {...register("price", { required: "Вкажіть ціну.", valueAsNumber: true, min: { value: 0, message: "Ціна не може бути від'ємною." } })} />
    </FormField>
    <FormField label="Кількість" error={errors.stockQty?.message}>
    <input className="form-input" type="number" min="0" {...register("stockQty", { required: "Вкажіть кількість.", valueAsNumber: true, min: { value: 0, message: "Кількість не може бути від'ємною." } })} />
    </FormField>
    </div>
    <FormField label="Категорія" error={errors.category_id?.message}>
    <select className="form-input" defaultValue="" {...register("category_id", { required: "Оберіть категорію.", valueAsNumber: true })} disabled={categories.length === 0}>
    <option value="" disabled>{loadError || "Оберіть категорію"}</option>
    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        </FormField>
        <FormField label="Опис" error={errors.description?.message}>
    <textarea className="form-input min-h-28" {...register("description", { required: "Додайте опис товару." })} />
    </FormField>
    <FormField label="URL зображення (необов'язково)" error={errors.image?.message}>
    <input className="form-input" type="url" placeholder="https://example.com/image.jpg" {...register("image")} />
    </FormField>
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" {...register("is_active")} /> Активний товар</label>
    {submitError && <p className="form-error" role="alert">{submitError}</p>}
        <button className="rounded-md bg-blue-700 px-5 py-2.5 font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400" disabled={isSubmitting} type="submit">{isSubmitting ? "Збереження..." : "Створити товар"}</button>
        </form>
        </section>
    );
    };

        const FormField = ({ label, error, children }: { label: string; error?: string; children: ReactNode }) => <label className="block text-sm font-medium text-slate-700"><span className="mb-1 block">{label}</span>{children}{error && <span className="form-error" role="alert">{error}</span>}</label>;

    export default CreateProduct;