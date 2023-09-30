import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useChat } from '@/service/chat'

export const useChatStore = defineStore('chat', () => {
  const chats = reactive({
    meta: { limit: 4, currentPage: 1 },
    data: [],
    load: true
  })

  const GET = async () => {
    const res = (await useChat.list(chats.meta.limit, chats.meta.currentPage)).data
    chats.data = res.data
    chats.meta = res.meta
    chats.load = false
  }

  const CREATE = async (newData) => {
    await useChat.create(newData)
    await GET()
  }

  const UPDATE = async () => {}

  const DELETE = async (id, type) => {
    await useChat.delete(id)
    await GET(type)
  }

  const GETONE = (id) => {
    const res = chats.data.find((chat) => chat.id === id)
    return res
  }

  const NEXT = async () => {
    chats.currentPage++
    await GET()
  }

  const PREV = async () => {
    if (chats.currentPage < 1) {
      chats.currentPage--
    }

    await GET()
  }

  const DATA = computed(() => chats.data)
  const LOAD = computed(() => chats.load)
  const META = computed(() => chats.meta)

  return { CREATE, UPDATE, DELETE, GET, GETONE, DATA, LOAD, META }
})
