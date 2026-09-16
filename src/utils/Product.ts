import type {ProductType} from "@/types/ProductType.ts";

class Product {
    private static readonly path:string = import.meta.env.VITE_PATH_TO_SERVER
        + import.meta.env.VITE_PATH_TO_API
        + "product/";
    public static async GetProductsByCategoryId(id: number):Promise<ProductType[]|null> {
        const response = await fetch(
            Product.path + 'by-category/'+id
        );
        if (!response.ok) {
            return null;
        }
        return await response.json();
    }

    public static async GetAllProducts(): Promise<ProductType[]|null> {
        const response = await fetch(Product.path);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    }

    public static async Create(product: Omit<ProductType, "id">): Promise<ProductType> {
        const response = await fetch(Product.path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error("Не вдалося створити товар.");
        }

        return await response.json();
    }
}
export default Product;
