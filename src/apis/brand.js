import axiosClient from '../services/AxiosClient'

const brandApi = {
    getAllBrand: () => axiosClient.get('/brands')
}
export default brandApi
