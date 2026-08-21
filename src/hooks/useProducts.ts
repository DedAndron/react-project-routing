import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import type { ProductsContextType } from "../context/ProductsContext";

export const useProducts = (): ProductsContextType => {
    const context = useContext(ProductsContext);

    if (!context) {
        throw new Error("useProducts must be used inside ProductsProvider");
    }

    return context;
};