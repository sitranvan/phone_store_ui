import axiosClient from '../services/AxiosClient'

const productApi = {
    getAllProduct: (params) =>
        axiosClient.get('/products', {
            params
        }),

    getProductDetal: (id) => axiosClient.get(`/products/${id}`)
}

export default productApi
