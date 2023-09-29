import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/service/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = reactive({
    data: [],
    email: ''
  })

  const LOGIN = async (data) => {
    user.email = data.email
    const res = await useAuth.admin_login(data)
    return res
  }

  const VERIFY = async (data) => {
    console.log(data);
    const res = await useAuth.admin_verify(data)
    return res
  }

  const GET = async () => {
  }

  const DATA = computed(() => chats.data)

  return { LOGIN, GET, VERIFY, DATA }
})
