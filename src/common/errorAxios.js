import axios from 'axios'

export function isAxiosError(err) {
    return axios.isAxiosError(err)
}

export function isAxiosForm(err) {
    return isAxiosError(err) && err.response?.status === 400
}
