import axiosClient from '../services/AxiosClient'

const userApi = {
    logout: () => axiosClient.post('/users/logout')
}

export default userApi
