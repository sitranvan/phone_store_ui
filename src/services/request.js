import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
})

request.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
    }
)

export default request
