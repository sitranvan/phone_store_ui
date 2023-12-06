import axiosClient from '../services/AxiosClient'

const authApi = {
    register: (body) => axiosClient.post('/auth/register', body),
    login: (body) => axiosClient.post('/auth/login', body)
}

export default authApi
