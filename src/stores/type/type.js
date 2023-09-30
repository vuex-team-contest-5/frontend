import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useType } from '@/service/type'

export const useTypeStore = defineStore('type', () => {
  const type = reactive({ data: [] })

  const GET = async () => {
    type.data = (await useType.list()).data.data
  }

  const DATA = computed(() => type.data)

  return { GET, DATA }
})
