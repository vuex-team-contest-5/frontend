<script setup>
defineProps(['funcForm'])
import { reactive, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useTeacherStore } from '@/stores/teachers/teacher'
import { week } from '@/helpers/formatDays'
import { useTypeStore } from '@/stores/type/type'

const store_teacher = useTeacherStore()
const store_type = useTypeStore()

const newUser = reactive({
  image: '',
  fullName: '',
  phoneNumber: '',
  email: '',
  password: '',
  birthDate: '',
  workDay: [],
  info: '',
  isMale: true,
  status: true,
  typeId: ''
})

const addWorkDay = (e) => {
  console.log()
  if (e.target.checked) {
    newUser.workDay.push(e.target.value)
  } else {
    newUser.workDay.splice(newUser.workDay.indexOf(e.target.value), 1)
  }
}

const fileSelected = (e) => {
  newUser.image = e.target.files[0]
  console.log(e)
}

const createUser = async () => {
  try {
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
    formData.append('workDay', newUser.workDay.join(', '))
    formData.append('info', newUser.info)
    formData.append('isMale', newUser.isMale)
    formData.append('status', newUser.status)
    formData.append('typeId', newUser.typeId)

    await store_teacher.CREATE(formData)
    funcForm()
    toast.success(`Muvaffaqiyatli tizimga kirdingiz`, { autoClose: 1000 })
  } catch (error) {
    console.log(error)
    toast.error(`Xatolik`, { autoClose: 1000 })
  }
}

onMounted(async () => {
  await store_type.GET()
  newUser.typeId = store_type.DATA[0].id
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black/50 z-50 overflow-y-auto">
    <div class="mx-auto my-5 lg:w-3/5 md:w-5/6 w-[98%] bg-white rounded-xl">
      <div
        class="bg-[#4D44B5] w-full px-10 p-5 font-semibold flex items-center justify-between rounded-t-xl"
      >
        <span class="text-white text-xl">Ustoz ma'lumotlari</span>
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
              class="bg-gray-50 border border-[#4D44B5] text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Toshmat Eshmatov"
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
              class="bg-gray-50 border border-[#4D44B5] text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
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
              class="bg-gray-50 border border-[#4D44B5] text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="+998941234567"
              required
              v-model="newUser.phoneNumber"
            />
          </div>
          <div class="w-1/2">
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">
              Toifa *
            </label>
            <select
              class="bg-gray-50 border border-[#4D44B5] text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none"
              @change="(e) => (newUser.typeId = e.target.value)"
            >
              <option v-for="el in store_type.DATA" :value="el.id">{{ el.name }}</option>
            </select>
          </div>
        </div>
        <div class="flex justify-between gap-5 mb-5">
          <div class="w-1/2">
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
              >Ma'lumot *</label
            >
            <textarea
              class="h-40 bg-gray-50 border border-[#4D44B5] text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Qisqacha ma'lumot"
              required
              v-model="newUser.info"
            />
          </div>
          <div class="w-1/2">
            <label class="block mb-2 text-sm font-medium text-gray-900" for="file_input"
              >Rasmi *</label
            >

            <div class="flex items-center justify-center w-full">
              <label
                for="file"
                class="flex flex-col items-center justify-center w-full h-40 border-2 border-[#4D44B5] border-dashed rounded-lg cursor-pointer bg-gray-50"
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
              </label>
              <input id="file" type="file" class="hidden" @change="fileSelected" />
            </div>
          </div>
        </div>
        <div class="flex justify-between gap-5 mb-5">
          <div class="w-1/2">
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
              >Gmail *</label
            >
            <input
              type="email"
              class="bg-gray-50 border border-[#4D44B5] text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="demo@gmail.com"
              required
              v-model="newUser.email"
            />
          </div>
          <div class="w-1/2">
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">
              Jinsi *
            </label>
            <select
              class="bg-gray-50 border border-[#4D44B5] text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none"
              @change="(e) => (newUser.isMale = e.target.value)"
            >
              <option value="true" selected>Erkak</option>
              <option value="false">Ayol</option>
            </select>
          </div>
        </div>

        <h3 class="block mb-2 text-sm font-medium text-gray-900">Ishlash kunlari</h3>
        <ul
          class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-[#4D44B5] mb-5 rounded-lg sm:flex"
        >
          <li
            v-for="(day, i) in week"
            class="cursor-pointer w-full border-b border-[#4D44B5] sm:border-b-0 sm:border-r"
          >
            <div class="cursor-pointer flex items-center pl-3">
              <input
                :id="day"
                type="checkbox"
                :value="i"
                @change="addWorkDay"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-[#4D44B5] rounded focus:ring-blue-500"
              />
              <label :for="day" class="w-full py-3 ml-2 text-sm font-medium text-gray-900">
                {{ day }}
              </label>
            </div>
          </li>
        </ul>

        <div class="flex items-center justify-end gap-5">
          <button
            class="border bg-[#4D44B5] text-white p-2 px-4 rounded-full shadow-xl text-sm"
            @click="createUser"
          >
            Qo'shish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
