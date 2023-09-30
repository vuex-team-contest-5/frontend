import axios from '../axios'

export const useCategory = {
  list: async (limit, page, type) =>
    await axios.get(`/category?limit=${limit}&page=${page}&type=${type}&status=true`),
  create: async (state) =>
    await axios.post('/category', state, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  update: async (id, state) =>
    await axios.put(`/category/${id}`, state, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  delete: async (id) => await axios.put(`/category/${id}`)
}
