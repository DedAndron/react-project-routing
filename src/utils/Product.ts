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
 }
export default Product;