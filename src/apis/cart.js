import axiosClient from '../services/AxiosClient'

const cartApi = {
    addToCart: (body) => axiosClient.post('/carts', body),
    getCart: () => axiosClient.get('/carts'),
    updateCart: (body) => axiosClient.patch('/carts', body),
    deleteProductInCart: (body) =>
        axiosClient.delete('/carts', {
            data: body
        })
}
export default cartApi
