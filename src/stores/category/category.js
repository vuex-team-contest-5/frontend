import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCategory } from '@/service/category'

export const useCategoryStore = defineStore('category', () => {
  const category = reactive({
    meta: { limit: 4, currentPage: 1 },
    data: [],
    load: true
  })

  const CREATE = async (newData) => {
    await useCategory.create(newData)
    await GET()
  }

  const UPDATE = async () => {}

  const DELETE = async () => {}

  const GET = async (type) => {
    const res = (await useCategory.list(category.meta.limit, category.meta.currentPage, type)).data
    category.data = res.data
    category.meta = res.meta
    console.log(category.data)
    category.load = false
  }

  const GETONE = (id) => {
    const res = category.data.find((category) => category.id === id)
    return res
  }

  const DATA = computed(() => category.data)
  const LOAD = computed(() => category.load)
  const META = computed(() => category.meta)

  return { CREATE, UPDATE, DELETE, GET, GETONE, DATA, LOAD, META }
})
