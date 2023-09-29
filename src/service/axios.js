import axios from 'axios'

axios.defaults.baseURL = 'https://nest-gym.onrender.com/api'

const token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

export const main_URL = 'https://nest-gym.onrender.com/api'
export default axios
