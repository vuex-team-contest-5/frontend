import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/service/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = reactive({
    data: [],
    email: '',
    role: '',
    token: ''
  })

  const LOGIN = async (data) => {
    user.email = data.email
    user.role = data.role
    localStorage.setItem('email', data.email)
    localStorage.setItem('role', data.role)
    const res =
      data.role === 'client' ? await useAuth.client_login(data) : await useAuth.admin_login(data)
    return res
  }

  const VERIFY = async (data) => {
    console.log(data)
    const res = await useAuth.otp_verify(data)
    return res
  }

  const GET = async () => {}

  const DATA = computed(() => chats.data)

  const GET_EMAIL = computed(() => user.email || localStorage.getItem('email'))

  const GET_ROLE = computed(() => user.role || localStorage.getItem('role'))

  const GET_TOKEN = computed(() => user.token || localStorage.getItem('token'))

  return { LOGIN, GET, VERIFY, DATA, GET_EMAIL, GET_ROLE, GET_TOKEN }
})
