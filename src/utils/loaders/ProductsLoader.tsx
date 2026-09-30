import Products from "@/utils/Product";

export async function ProductLoader({ params }: { params: { id?: string } }) {
    if (!params.id) {
        const data = await Products.GetAllProducts();

        return {
            products: data?.filter(product => product.category_id === null) ?? [],
        };
    }
    const productId = Number(params.id);
    const products = await Products.GetProductsByCategoryId(productId);
    return {
        products: products
    };
}