import axios from '../axios'

export const useEquipments = {
  list: async (limit, page, type = 'equipment') =>
    await axios.get(`/product?limit=${limit}&page=${page}&type=${type}&status=true`),
  create: async (state) =>
    await axios.post('/product', state, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  update: async (id, state) =>
    await axios.put(`/product/${id}`, state, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  delete: async (id) => await axios.delete(`/product/${id}`)
}
