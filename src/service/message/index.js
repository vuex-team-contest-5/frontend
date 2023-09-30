import axios from '../axios'

export const useMessage = {
  list: async (limit, page) => await axios.get(`/message?limit=${limit}&page=${page}`),
  getone: async (id) => await axios.get(`/message?limit=1000&page=1&chatId=${id}`),
  create: async (state) =>
    await axios.post('/message', state, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: async (id, state) =>
    await axios.put(`/message/${id}`, state, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  delete: async (id) => await axios.delete(`/message/${id}`)
}
