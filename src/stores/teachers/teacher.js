import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useTeacher } from '@/service/teacher'

export const useTeacherStore = defineStore('teacher', () => {
  const teachers = reactive({
    meta: {
      limit: 4,
      currentPage: 1
    },
    data: [],
    load: true
  })

  const GET = async () => {
    const res = (await useTeacher.list(teachers.meta.limit, teachers.meta.currentPage)).data
    teachers.data = res.data
    teachers.meta = res.meta
    teachers.load = false
  }

  const CREATE = async (newData) => {
    await useTeacher.create(newData)
    await GET()
  }

  const UPDATE = async () => {}

  const DELETE = async (id, type) => {
    await useProduct.delete(id)
    await GET(type)
  }

  const GETONE = (id) => {
    const res = teachers.data.find((teacher) => teacher.id === id)
    return res
  }

  const NEXT = async () => {
    teachers.currentPage++
    await GET()
  }

  const PREV = async () => {
    if (teachers.currentPage < 1) {
      teachers.currentPage--
    }

    await GET()
  }

  const DATA = computed(() => teachers.data)
  const LOAD = computed(() => teachers.load)
  const META = computed(() => teachers.meta)

  return { CREATE, UPDATE, DELETE, GET, GETONE, DATA, LOAD, META }
})
