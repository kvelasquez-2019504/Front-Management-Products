import { useState } from "react";
import {getProducts as apiGetProducts, 
    addProduct as apiAddProduct,
    deleteProduct as apiDeleteProduct,
    updateProduct as apiUpdateProduct
} from "../services/";
import toast from 'react-hot-toast';

export const useProducts = () => {
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async (currentPage, itemsPerPage) => {
        setIsLoading(true);
        try {
            const data = await apiGetProducts(currentPage, itemsPerPage);
            if(data.error){
                toast.error(data.msg || "Error obteniendo productos");
                return;
            }
            toast.success(data.msg || "Productos cargados exitosamente");
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally { setIsLoading(false); } 
    };

    const addProduct=async(product)=>{
        setIsLoading(true);
        try {
            const data = await apiAddProduct(product);
            if(data.error){
                toast.error(data.msg || "Error agregando producto");
                return;
            }
            toast.success(data.msg || "Producto agregado exitosamente");
        } catch (error) {
            console.error("Error adding product:", error);
        }finally{ setIsLoading(false); }
    }

    const updateProduct=async(id, product)=>{
        setIsLoading(true);
        try {
            const data = await apiUpdateProduct(id, product);
            if(data.error){
                toast.error(data.msg || "Error actualizando producto");
                return;
            }
            toast.success(data.msg || "Producto actualizado exitosamente");
        } catch (error) {
            console.error("Error updating product:", error);
        }finally{ setIsLoading(false); }
    }

    const deleteProduct=async(id)=>{
        setIsLoading(true);
        try {
            const data = await apiDeleteProduct(id);
            if(data.error){
                toast.error(data.msg || "Error eliminando producto");
                return;
            }
            toast.success(data.msg || "Producto eliminado exitosamente");
        } catch (error) {
            console.error("Error deleting product:", error);    
        }finally{ setIsLoading(false); }
    }

    return {
        products,
        isLoading,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct
    };
};
