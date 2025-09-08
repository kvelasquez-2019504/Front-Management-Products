import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-management-products.vercel.app',
});

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
            error:true,
            msg:error.response.data.errors,
        }
    }
}

export const addProduct = async(data)=>{
    try {
        const response = await api.post('/products', data);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        return {
            error:true,
            msg:error.response.data.errors
        }
    }
}

export const updateProduct = async(id, data)=>{
    try {
        const response = await api.put(`/products/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        return {
            error:true,
            msg:error.response.data.errors
        }
    }
}

export const deleteProduct = async(id)=>{
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        return {
            error:true,
            msg:error.response.data.errors
        }
    }
}
