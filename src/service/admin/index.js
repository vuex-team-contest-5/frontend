import axios from '../axios'

export const useAdmin = {
  list: async (limit, page) => await axios.get(`/admin?limit=${limit}&page=${page}`),
  get_one: async (id) => await axios.get(`/admin/${id}`),
  create: async (state) =>
    await axios.post('/admin', state, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  update: async (id, state) =>
    await axios.put(`/admin/${id}`, state, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  delete: async (id) =>
    await axios.put(`/admin/${id}`, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}
