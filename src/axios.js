import axios from 'axios'

export const makeRequest = axios.create({
    baseURL:"https://blog-2023-backend.onrender.com/api/",
    withCredentials:true,
})