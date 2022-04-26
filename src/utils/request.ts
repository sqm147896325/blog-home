import axios from 'axios';

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 20000 // request timeout
})

service.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})

service.interceptors.response.use(res => {
    return res
}, err => {
    return Promise.reject(err)
})

export default service

