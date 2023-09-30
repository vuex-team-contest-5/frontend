import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useClient } from '@/service/client'
import { useChat } from '@/service/chat'

export const useClientStore = defineStore('client', () => {
  const clients = reactive({
    meta: {
      limit: 4,
      currentPage: 1
    },
    data: [],
    load: true
  })

  const GET = async () => {
    const res = (await useClient.list(clients.meta.limit, clients.meta.currentPage)).data
    clients.data = res.data
    clients.meta = res.meta
    clients.load = false
  }

  const CREATE = async (newData) => {
    const res = await useClient.create(newData)
    await useChat.create({ clientId: res.id, status: true })
    await GET()
  }

  const UPDATE = async () => {}

  const DELETE = async (id, type) => {
    await useTeacher.delete(id)
    await GET(type)
  }

  const GETONE = (id) => {
    const res = clients.data.find((teacher) => teacher.id === id)
    return res
  }

  const NEXT = async () => {
    clients.currentPage++
    await GET()
  }

  const PREV = async () => {
    if (clients.currentPage < 1) {
      clients.currentPage--
    }

    await GET()
  }

  const DATA = computed(() => clients.data)
  const LOAD = computed(() => clients.load)
  const META = computed(() => clients.meta)

  return { CREATE, UPDATE, DELETE, GET, GETONE, DATA, LOAD, META }
})
