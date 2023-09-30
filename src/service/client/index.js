import axios from '../axios'

export const useClient = {
<<<<<<< HEAD
  list: async (limit, page) => await axios.get(`/client?limit=${limit}&page=${page}&status=true`),
=======
  list: async (limit, page) => await axios.get(`/client?limit=${limit}&page=${page}`),
  get_one: async (id) => await axios.get(`/client/${id}`),
>>>>>>> 76aba481040a2cb8a9eca0049bd9709e5afabdf5
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
