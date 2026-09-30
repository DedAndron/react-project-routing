import type { ProductType } from "@/types/ProductType";
import { apiUrl, getErrorMessage } from "@/services/api.ts";

class Product {
    private static readonly path = "product/";

    public static async GetAllProducts(): Promise<ProductType[] | null> {
        const response = await fetch(
            apiUrl(Product.path + "all")
        );

        if (!response.ok) {
            return null;
        }

        return await response.json();
    }

    public static async GetProductsByCategoryId(
        id: number
    ): Promise<ProductType[] | null> {
        const products = await this.GetAllProducts();

        if (!products) {
            return null;
        }

        return products.filter(
            product => Number(product.categoryId) === id
        );
    }

    public static async Create(
        product: Omit<ProductType, "id">
    ): Promise<string> {
        const formData = new FormData();

        formData.append("name", product.name);
        formData.append(
            "description",
            product.description ?? ""
        );
        formData.append(
            "price",
            String(product.price)
        );
        formData.append(
            "stockQty",
            String(product.stockQty)
        );
        formData.append(
            "categoryId",
            String(product.categoryId)
        );

        const response = await fetch(
            apiUrl(Product.path + "create"),
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(
                await getErrorMessage(
                    response,
                    "Не вдалося створити товар."
                )
            );
        }

        return await response.text();
    }
}

export default Product;