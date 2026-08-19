import axios from 'axios'
import 'dotenv/config'

export const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})