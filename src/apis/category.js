import axiosClient from '../services/AxiosClient'

const categoryApi = {
    getAllCategory: () => axiosClient.get('/categories'),
    getCategory: (id) => axiosClient.get(`/categories/${id}`),
    create: (body) => axiosClient.post('/categories', body),
    update: (id, body) => axiosClient.patch(`/categories/${id}`, body),
    delete: (id) => axiosClient.delete(`/categories/${id}`)
}
export default categoryApi
