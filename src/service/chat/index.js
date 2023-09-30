import axios from '../axios'

export const useChat = {
  list: async (limit, page) => await axios.get(`/chat?limit=${limit}&page=${page}&status=true`),
  create: async (state) =>
    await axios.post('/chat', state, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: async (id, state) =>
    await axios.put(`/chat/${id}`, state, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: async (id) => await axios.delete(`/chat/${id}`)
}
