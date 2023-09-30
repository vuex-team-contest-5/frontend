import axios from '../axios'

export const useProducts = {
  list: async () => await axios.get('/products'),
  create: async (state) => await axios.post('/products', state),
  update: async (id, state) => await axios.put(`/products/${id}`, state),
  delete: async (id) => await axios.put(`/products/${id}`, {})
}
