import axios from '../axios'

export const useTeacher = {
  list: async () => await axios.get('/teacher'),
  create: async (state) =>
    await axios.post('/teacher', state, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  update: async (id, state) =>
    await axios.put(`/teacher/${id}`, state, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  delete: async (id) =>
    await axios.put(`/teacher/${id}`, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}
