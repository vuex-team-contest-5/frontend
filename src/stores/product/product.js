import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useProduct } from '@/service/product'

export const useProductStore = defineStore('product', () => {
  const products = reactive({
    meta: { limit: 10, currentPage: 1 },
    data: [],
    load: true
  })
  const GET = async (type) => {
    const res = (await useProduct.list(products.meta.limit, products.meta.currentPage, type)).data
    products.data = res.data
    products.meta = res.meta
    products.load = false
  }

  const CREATE = async (newData, type) => {
    await useProduct.create(newData)
    await GET(type)
  }

  const UPDATE = async () => {}

  const DELETE = async (id, type) => {
    await useProduct.delete(id)
    await GET(type)
  }

  const GETONE = (id) => {
    const res = products.data.find((teacher) => teacher.id === id)
    return res
  }

  const NEXT = async () => {
    products.currentPage++
    await GET()
  }

  const PREV = async () => {
    if (products.currentPage < 1) {
      products.currentPage--
    }

    await GET()
  }

  const DATA = computed(() => products.data)
  const LOAD = computed(() => products.load)
  const META = computed(() => products.meta)

  return { CREATE, UPDATE, DELETE, GET, GETONE, DATA, LOAD, META }
})
