import type {ProductType} from "@/types/ProductType.ts";
import { apiUrl, getErrorMessage } from "@/services/api.ts";

class Product {
    private static readonly path = "product/";
    public static async GetProductsByCategoryId(id: number):Promise<ProductType[]|null> {
        const response = await fetch(
            apiUrl(Product.path + 'by-category/'+id)
        );
        if (!response.ok) {
            return null;
        }
        return await response.json();
    }

    public static async GetAllProducts(): Promise<ProductType[]|null> {
        const response = await fetch(apiUrl(Product.path + 'all'));
        if (!response.ok) {
            return null;
        }
        return await response.json();
    }

    public static async Create(product: Omit<ProductType, "id">): Promise<ProductType> {
        const response = await fetch(apiUrl(Product.path), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error(await getErrorMessage(response, "Не вдалося створити товар."));
        }

        return await response.json();
    }
}
export default Product;