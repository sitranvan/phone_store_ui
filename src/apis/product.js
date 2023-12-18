import axiosClient from '../services/AxiosClient'

const productApi = {
    getAllProduct: (params = []) =>
        axiosClient.get('/products', {
            params
        }),

    getProductDetal: (id) => axiosClient.get(`/products/${id}`),
    createProduct: (body) =>
        axiosClient.post('/products', body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
    updateProduct: (id, body) =>
        axiosClient.patch(`/products/${id}`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),

    deleteProduct: (id) => axiosClient.delete(`/products/${id}`)
}

export default productApi
