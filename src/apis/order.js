import axiosClient from '../services/AxiosClient'

const orderApi = {
    createOrder: (body) => axiosClient.post('orders', body)
}
export default orderApi
