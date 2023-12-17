import axiosClient from '../services/AxiosClient'

const userApi = {
    logout: () => axiosClient.post('/users/logout'),
    getMe: () => axiosClient.get('/users/me')
}

export default userApi
