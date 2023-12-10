import axiosClient from '../services/AxiosClient'

const reviewApi = {
    getReviewProduct: (id) => axiosClient.get(`/reviews/product/${id}`)
}
export default reviewApi
