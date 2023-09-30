<script setup>
defineProps(['funcForm'])
import { reactive, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useTeacherStore } from '@/stores/teachers/teacher'
import { useClientStore } from '@/stores/client/client'

const store_teacher = useTeacherStore()
const store_client = useClientStore()

const newUser = reactive({
  image: '',
  fullName: '',
  phoneNumber: '',
  email: '',
  password: '',
  birthDate: '',
  servicePrice: '',
  startedAt: '',
  period: '',
  status: true,
  teacherId: ''
})

const fileSelected = (e) => {
  console.log(e)
  newUser.image = e.target.files[0]
}

const createUser = async () => {
  try {
    console.log(newUser)
    if (!/^998([012345789]{2}|6[125679]|7[01234569])[0-9]{7}$/.test(newUser.phoneNumber)) {
      toast.error(`Telefon raqamni to'g'ri kiriting`, { autoClose: 1000 })
      return
    }
    newUser.phoneNumber = `+${newUser.phoneNumber}`
    newUser.password = newUser.phoneNumber
    for (let i in newUser) {
      console.log(newUser[i])
      if (!newUser[i]) {
        toast.error(`Formani to'liq to'ldiring`, { autoClose: 1000 })
        return
      }
    }
    if (newUser.fullName.split(' ').length < 2) {
      toast.error(`Ismingizni to'liq  kiriting`, { autoClose: 1000 })
      return
    }
    const [firstName, lastName] = newUser.fullName.split(' ')

    const formData = new FormData()
    formData.append('image', newUser.image)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('phoneNumber', newUser.phoneNumber)
    formData.append('email', newUser.email)
    formData.append('password', newUser.password)
    formData.append('birthDate', newUser.birthDate)
    formData.append('servicePrice', newUser.servicePrice)
    formData.append('startedAt', newUser.startedAt)
    formData.append('period', newUser.period)
    formData.append('status', newUser.status)
    formData.append('teacherId', newUser.teacherId)

    await store_client.CREATE(formData)
    funcForm()
    toast.success(`Muvaffaqiyatli tizimga kirdingiz`, { autoClose: 1000 })
  } catch (error) {
    console.log(error)
    toast.error(`Formani to'g'ri to'ldiring`, { autoClose: 1000 })
  }
}

onMounted(async () => {
  await store_client.GET()
  await store_teacher.GET()
  newUser.teacherId = store_teacher.DATA[0].id
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black/50 z-50 overflow-y-auto">
    <div class="mx-auto mt-5 lg:w-3/5 md:w-5/6 w-[98%] bg-white rounded-xl">
      <div
        class="bg-[#4D44B5] w-full px-10 p-5 font-semibold flex items-center justify-between rounded-t-xl"
      >
        <span class="text-white text-xl">Mijoz ma'lumotlari</span>
        <button @click="funcForm">
          <i class="bx bx-x text-white text-3xl cursor-pointer"></i>
        </button>
      </div>
      <div class="px-10 py-5">
        <div class="flex justify-between gap-5 mb-5">
          <div class="w-1/2">
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
              >I.F.SH *</label
            >
            <input
              type="text"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Maria"
              required
              v-model="newUser.fullName"
            />
          </div>
          <div class="w-1/2">
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
              >Tug'ilgan sanasi *</label
            >
            <input
              type="date"
              id="birthday"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              required
              v-model="newUser.birthDate"
            />
          </div>
        </div>
        <div class="flex justify-between gap-5 mb-5">
          <div class="w-1/2">
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
              >Telefon raqami *</label
            >
            <input
              type="number"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="+998941234567"
              required
              v-model="newUser.phoneNumber"
            />
          </div>
          <div class="w-1/2">
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">
              Ustoz *
            </label>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none"
              @change="(e) => (newUser.teacherId = e.target.value)"
            >
              <option v-for="el in store_teacher.DATA" :value="el.id">
                {{ el.firstName }} {{ el.lastName }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex justify-between gap-5 mb-5">
          <div class="w-1/2">
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">
              Muddati(oy) *
            </label>
            <input
              type="number"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="3"
              required
              v-model="newUser.period"
            />
          </div>
          <div class="w-1/2">
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">
              Narxi *
            </label>
            <input
              type="text"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="130"
              required
              v-model="newUser.servicePrice"
            />
          </div>
        </div>
        <div class="flex justify-between gap-5 mb-5">
          <div class="w-1/2">
            <label class="block mb-2 text-sm font-medium text-gray-900" for="file_input"
              >Rasmi *</label
            >

            <div class="flex items-center justify-center w-full">
              <label
                for="file"
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <i class="bx bx-cloud-upload"></i>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 1MB)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
              <input id="file" type="file" class="hidden" @change="fileSelected" />
            </div>
          </div>
          <div class="w-1/2">
            <div class="w-full mb-5">
              <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">
                Boshlash sanasi *
              </label>
              <input
                type="date"
                id="last_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                required
                v-model="newUser.startedAt"
              />
            </div>
            <div class="w-full mb-5">
              <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
                >Gmail *</label
              >
              <input
                type="text"
                id="last_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="demo@gmail.com"
                required
                v-model="newUser.email"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-5">
          <button
            class="border text-sm text-[#4D44B5] border-[#4D44B5] p-2 px-4 rounded-full shadow-xl"
          >
            Saqlash
          </button>
          <button
            @click="createUser"
            class="border bg-[#4D44B5] text-white p-2 px-4 rounded-full shadow-xl text-sm"
          >
            Qo'shish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
