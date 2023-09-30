import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useProducts } from '@/service/products'

export const useProductsStore = defineStore('products', () => {
  const products = reactive({
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
    // products.data.push(newData)
  }

  const UPDATE = async () => {}

  const DELETE = async () => {}

  const GET = async () => {
    console.log(products.data)
    // products.data = (await useTeacher.list()).data
    // console.log(products.data)
    // products.load = false
  }

  const GETONE = async () => {}

  const DATA = computed(() => products.data)
  const LOAD = computed(() => products.load)

  return { CREATE, UPDATE, DELETE, GET, GETONE, DATA, LOAD }
})
