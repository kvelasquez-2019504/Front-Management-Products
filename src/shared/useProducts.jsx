import { useState } from "react";
import {getProducts as apiGetProducts} from "../services/";

export const useProducts = () => {
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async () => {
        setIsLoading(true);
        try {
            const data = await apiGetProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        products,
        isLoading,
        getProducts
    };
};
