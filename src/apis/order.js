import axiosClient from '../services/AxiosClient'

const orderApi = {
    createOrder: (body) => axiosClient.post('orders', body),
    getAll: () => axiosClient.get('orders'),
    updateCancelled: (id) => axiosClient.patch(`orders/cancel/${id}`),
    updateShipped: (id) => axiosClient.patch(`orders/shipper/${id}`),
    updateDelivered: (id) => axiosClient.patch(`orders/delivered/${id}`)
}
export default orderApi
