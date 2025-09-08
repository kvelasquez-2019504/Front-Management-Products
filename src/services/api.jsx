import axios from 'axios';


/**
 * Instancia de Axios configurada con la URL base del backend.
 */
const api = axios.create({
    baseURL: 'https://back-management-products.vercel.app',
});


/**
 * Obtiene productos paginados desde el backend.
 * @param {number} currentPage - Página actual.
 * @param {number} itemsPerPage - Cantidad de productos por página.
 * @returns {Promise<Object>} Respuesta con productos y metadatos de paginación.
 */
export const getProducts = async (currentPage, itemsPerPage) => {
    try {
        const response = await api.get('/products', {
            params: {
                currentPage,
                itemsPerPage
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return {
            error: true,
            msg: error.response.data.errors,
        }
    }
}


/**
 * Agrega un nuevo producto al backend.
 * @param {Object} data - Datos del producto a agregar.
 * @returns {Promise<Object>} Respuesta del backend.
 */
export const addProduct = async (data) => {
    try {
        const response = await api.post('/products', data);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        return {
            error: true,
            msg: error.response.data.errors
        }
    }
}


/**
 * Actualiza un producto existente en el backend.
 * @param {string} id - ID del producto a actualizar.
 * @param {Object} data - Datos actualizados del producto.
 * @returns {Promise<Object>} Respuesta del backend.
 */
export const updateProduct = async (id, data) => {
    try {
        const response = await api.put(`/products/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        return {
            error: true,
            msg: error.response.data.errors
        }
    }
}


/**
 * Elimina un producto del backend por su ID.
 * @param {string} id - ID del producto a eliminar.
 * @returns {Promise<Object>} Respuesta del backend.
 */
export const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        return {
            error: true,
            msg: error.response.data.errors
        }
    }
}
