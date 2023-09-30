import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useEquipments } from '@/service/equipments'

export const useEquipmentsStore = defineStore('equipments', () => {
  const equipments = reactive({
    data: [
      {
        id: 1,
        name: 'Trinajor runner',
        price: '130 $',
        brand: 'Doys Rong',
        info: 'Yugurish uchun',
        img: '@/assets/img/equip.png',
        count: '1'
      },
      {
        id: 1,
        name: 'Gantel',
        price: '400 $',
        brand: 'Eleiko',
        info: 'Biceps uchun',
        img: '@/assets/img/barbell.png',
        count: '3'
      }
    ],
    load: true
  })

  const CREATE = (newData) => {
    // equipments.data.push(newData)
  }

  const UPDATE = async () => {}

  const DELETE = async () => {}

  const GET = async () => {
    console.log(equipments.data)
    // equipments.data = (await useTeacher.list()).data
    // console.log(equipments.data)
    // equipments.load = false
  }

  const GETONE = async () => {}

  const DATA = computed(() => equipments.data)
  const LOAD = computed(() => equipments.load)

  return { CREATE, UPDATE, DELETE, GET, GETONE, DATA, LOAD }
})
