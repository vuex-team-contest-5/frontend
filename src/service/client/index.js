import axios from '../axios'

export const useClient = {
  list: async (limit, page) => await axios.get(`/client?limit=${limit}&page=${page}&status=true`),
  get_one: async (id) => await axios.get(`/client/${id}`),
  create: async (state) =>
    await axios.post('/client', state, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  update: async (id, state) =>
    await axios.put(`/client/${id}`, state, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  delete: async (id) => await axios.delete(`/client/${id}`)
}
