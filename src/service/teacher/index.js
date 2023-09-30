import axios from '../axios'

export const useTeacher = {
  list: async (limit, page) => await axios.get(`/teacher?limit=${limit}&page=${page}&status=true`),
  create: async (state) =>
    await axios.post('/teacher', state, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  update: async (id, state) =>
    await axios.put(`/teacher/${id}`, state, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  delete: async (id) => await axios.put(`/teacher/${id}`)
}
