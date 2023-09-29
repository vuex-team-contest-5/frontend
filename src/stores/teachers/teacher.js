import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useTeacher } from '@/service/teacher'

export const useTeacherStore = defineStore('teacher', () => {
  const teachers = reactive({
    meta: [],
    data: [
      {
        fullName: 'Toshmatov Eshmat',
        birthday: '2021',
        phoneNumber: '+998887038006',
        email: 'example@gmail.com',
        gender: 'male',
        type: 'I'
      },
      {
        fullName: 'Ali AbuTolib',
        birthday: '',
        phoneNumber: '+998887038006',
        email: 'example@gmail.com',
        gender: 'male',
        type: 'IV'
      }
    ],
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
    teachers.data = (await useTeacher.list()).data.data
    teachers.meta = (await useTeacher.list()).data.data
    teachers.load = false
  }

  const GETONE = async () => {}

  const DATA = computed(() => teachers.data)
  const LOAD = computed(() => teachers.load)

  return { CREATE, UPDATE, DELETE, GET, GETONE, DATA, LOAD }
})
