import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useTeacher } from '@/service/teacher'

export const useTeacherStore = defineStore('teacher', () => {
  const teachers = reactive({
    meta: {
      limit: 2,
      page: 1
    },
    data: [],
    load: true
  })

  const CREATE = async (newData) => {
    await useTeacher.list()
    await useTeacher.create(newData)
    await GET()
  }

  const UPDATE = async () => {}

  const DELETE = async () => {}

  const GET = async () => {
    const res = (await useTeacher.list(teachers.meta.limit, teachers.meta.page)).data
    teachers.data = res.data
    teachers.meta = res.meta
    teachers.load = false
  }

  const GETONE = async () => {}

  const DATA = computed(() => teachers.data)
  const LOAD = computed(() => teachers.load)
  const META = computed(() => teachers.meta)

  return { CREATE, UPDATE, DELETE, GET, GETONE, DATA, LOAD, META }
})
