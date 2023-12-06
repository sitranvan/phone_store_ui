import axiosClient from '../services/AxiosClient'

const categoryApi = {
    getAllCategory: () => axiosClient.get('/categories')
}
export default categoryApi
