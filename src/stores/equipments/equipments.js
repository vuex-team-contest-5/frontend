import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useEquipments } from '@/service/equipments'

export const useEquipmentsStore = defineStore('equipments', () => {
  const equipments = reactive({
    meta: { limit: 10, currentPage: 1 },
    data: [],
    load: true
  })

  const GET = async (type) => {
    const res = (await useEquipments.list(equipments.meta.limit, equipments.meta.currentPage, type))
      .data
    equipments.data = res.data
    equipments.meta = res.meta
    equipments.load = false
  }

  const CREATE = async (newData, type) => {
    await useEquipments.create(newData)
    await GET(type)
  }

  const UPDATE = async () => {}

  const DELETE = async (id, type) => {
    await useEquipments.delete(id)
    await GET(type)
  }

  const GETONE = (id) => {
    const res = equipments.data.find((teacher) => teacher.id === id)
    return res
  }

  const NEXT = async () => {
    equipments.currentPage++
    await GET()
  }

  const PREV = async () => {
    if (equipments.currentPage < 1) {
      equipments.currentPage--
    }

    await GET()
  }

  const DATA = computed(() => equipments.data)
  const LOAD = computed(() => equipments.load)
  const META = computed(() => equipments.meta)

  return { CREATE, UPDATE, DELETE, GET, GETONE, DATA, LOAD, META }
})
