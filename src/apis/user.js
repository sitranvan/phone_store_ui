import axiosClient from '../services/AxiosClient'

const userApi = {
    logout: () => axiosClient.post('/users/logout'),
    getMe: () => axiosClient.get('/users/me'),
    getUser: (id) => axiosClient.get(`/users/${id}`),
    update: (body) =>
        axiosClient.patch('/users/update', body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
    updatePassword: (body) => axiosClient.patch('/users/update-password', body),
    getAll: () => axiosClient.get('/users')
}

export default userApi
