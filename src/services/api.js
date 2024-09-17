import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_API_BASE_URL

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
})

export default api
