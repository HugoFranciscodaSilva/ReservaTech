import axios from 'axios'
import 'dotenv/config'
import Cookies from 'js-cookie'

export const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

API.interceptors.request.use((config)=>{
    const token = Cookies.get('token')

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }


    return config
})