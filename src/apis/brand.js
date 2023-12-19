import axiosClient from '../services/AxiosClient'

const brandApi = {
    getAllBrand: () => axiosClient.get('/brands'),
    getBrand: (id) => axiosClient.get(`/brands/${id}`),
    create: (body) => axiosClient.post('/brands', body),
    update: (id, body) => axiosClient.patch(`/brands/${id}`, body),
    delete: (id) => axiosClient.delete(`/brands/${id}`)
}
export default brandApi
