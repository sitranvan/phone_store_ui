import axiosClient from '../services/AxiosClient'

const couponApi = {
    addCoupon: (body) => axiosClient.post('coupons/add', body),
    getCoupon: (id) => axiosClient.get(`coupons/${id}`)
}
export default couponApi
