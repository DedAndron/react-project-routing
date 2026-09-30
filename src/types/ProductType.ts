export type ProductType = {
    id: number;
    name: string;
    price: number;
    description: string;
    isActive: boolean;
    stockQty: number;
    categoryId: number;
    image: string | null;
};