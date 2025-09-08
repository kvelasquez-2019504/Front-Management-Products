import { useState } from "react";
import {getProducts as apiGetProducts, 
    addProduct as apiAddProduct,
    deleteProduct as apiDeleteProduct,
    updateProduct as apiUpdateProduct
} from "../services/";
import toast from 'react-hot-toast';


/**
 * Custom hook para gestionar productos (CRUD) y su estado de carga.
 * Provee funciones para obtener, agregar, actualizar y eliminar productos,
 * así como el estado de carga y los datos actuales.
 * @returns {Object} Funciones y estados relacionados con productos.
 */
export const useProducts = () => {
    // Estado para la lista de productos y el indicador de carga
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Obtiene productos paginados desde el backend y actualiza el estado.
     * @param {number} currentPage - Página actual.
     * @param {number} itemsPerPage - Cantidad de productos por página.
     */
    const getProducts = async (currentPage, itemsPerPage) => {
        setIsLoading(true);
        try {
            const data = await apiGetProducts(currentPage, itemsPerPage);
            if(data.error){
                let errorMsg = data.msg.map(e=>e.msg).join("\n");
                toast.error(errorMsg || "Error obteniendo productos");
                return;
            }
            toast.success(data.msg || "Productos cargados exitosamente");
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally { setIsLoading(false); } 
    };

    /**
     * Agrega un nuevo producto al backend.
     * @param {Object} product - Datos del producto a agregar.
     */
    const addProduct = async (product) => {
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

    /**
     * Actualiza un producto existente en el backend.
     * @param {string} id - ID del producto a actualizar.
     * @param {Object} product - Datos actualizados del producto.
     */
    const updateProduct = async (id, product) => {
        setIsLoading(true);
        try {
            const data = await apiUpdateProduct(id, product);
            if(data.error){
                let errorMsg = data.msg.map(e=>e.msg).join("\n");
                toast.error(errorMsg || "Error agregando producto");
                return;
            }
            toast.success(data.msg || "Producto actualizado exitosamente");
        } catch (error) {
            console.error("Error updating product:", error);
        }finally{ setIsLoading(false); }
    }

    /**
     * Elimina un producto del backend por su ID.
     * @param {string} id - ID del producto a eliminar.
     */
    const deleteProduct = async (id) => {
        setIsLoading(true);
        try {
            const data = await apiDeleteProduct(id);
            if(data.error){
                let errorMsg = data.msg.map(e=>e.msg).join("\n");
                toast.error(errorMsg || "Error eliminando producto");
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
