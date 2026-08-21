import { createContext } from "react";
import type { ProductType } from "../types/ProductType";

export type ProductsContextType = {
    products: ProductType[];
    setProducts: (products: ProductType[]) => void;
};

export const ProductsContext =
    createContext<ProductsContextType | null>(null);