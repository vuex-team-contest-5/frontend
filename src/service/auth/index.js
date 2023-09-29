import axios from '../axios'

export const useAuth = {
  admin_login: async (data) => await axios.post('/auth/admin/login', { ...data }),
  admin_verify: async (data) => await axios.post('/auth/otp/verify', { ...data }),
  client_login: async (data) => await axios.post('/auth/admin/login', { ...data })
}
