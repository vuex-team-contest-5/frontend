import axios from '../axios'

export const useType = {
  list: async () => await axios.get(`/type`)
}
