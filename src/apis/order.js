import axiosClient from '../services/AxiosClient'

const orderApi = {
    createOrder: (body) => axiosClient.post('orders', body),
    getAll: () => axiosClient.get('orders')
}
export default orderApi
