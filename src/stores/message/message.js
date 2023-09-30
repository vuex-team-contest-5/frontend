import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useMessage } from '@/service/message'

export const useMessageStore = defineStore('message', () => {
  const messages = reactive({
    meta: { limit: 1000, currentPage: 1 },
    data: [],
    load: true,
    isStart: true
  })

  const GETONE = async (id) => {
    messages.load = true
    messages.isStart = false
    messages.data = (await useMessage.getone(id)).data.data
    console.log(messages.data)
    messages.load = false
  }

  const START = () => {
    messages.isStart = true
  }

  const CREATE = async (newData, id) => {
    await useMessage.create(newData)
    await GETONE(id)
  }

  const UPDATE = async () => {}

  const DELETE = async (id, type) => {
    await useMessage.delete(id)
    await GET(type)
  }

  const NEXT = async () => {
    messages.currentPage++
    await GET()
  }

  const PREV = async () => {
    if (messages.currentPage < 1) {
      messages.currentPage--
    }

    await GET()
  }

  const DATA = computed(() => messages.data)
  const LOAD = computed(() => messages.load)
  const STARTED = computed(() => messages.isStart)
  const META = computed(() => messages.meta)

  return { CREATE, UPDATE, DELETE, GETONE, DATA, LOAD, META, START, STARTED }
})
