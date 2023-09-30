<script setup>
defineProps(['funcForm'])
import { reactive, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category/category'
import { useEquipmentsStore } from '../../stores/equipments/equipments'
import { toast } from 'vue3-toastify'

const category_store = useCategoryStore()
const equipment_store = useEquipmentsStore()

const newData = reactive({
  image: '',
  name: '',
  price: '',
  brand: '',
  info: '',
  count: '',
  type: 'equipment',
  status: true,
  categoryId: ''
})

const fileSelected = (e) => {
  newData.image = e.target.files[0]
}

const createEquipment = async () => {
  try {
    for (let i in newData) {
      console.log(newData[i])
      if (!newData[i]) {
        toast.error(`Formani to'liq to'ldiring`, { autoClose: 1000 })
        return
      }
    }

    const formData = new FormData()
    formData.append('image', newData.image)
    formData.append('name', newData.name)
    formData.append('price', newData.price)
    formData.append('brand', newData.brand)
    formData.append('info', newData.info)
    formData.append('count', newData.count)
    formData.append('type', newData.type)
    formData.append('status', newData.status)
    formData.append('categoryId', newData.categoryId)

    await equipment_store.CREATE(formData, 'equipment')
    funcForm()
    toast.success(`Muvaffaqiyatli tizimga kirdingiz`, { autoClose: 1000 })
  } catch (error) {
    console.log(error)
    toast.error(`Xatolik`, { autoClose: 1000 })
  }
}

onMounted(async () => {
  await category_store.GET('equipment')
  newData.categoryId = category_store.DATA[0].id
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black/50 z-50 overflow-y-auto">
    <div class="mx-auto mt-5 lg:w-3/5 md:w-5/6 w-[98%] bg-white rounded-xl">
      <div
        class="bg-[#4D44B5] w-full px-10 p-5 font-semibold flex items-center justify-between rounded-t-xl"
      >
        <span class="text-white text-xl">Mahsulot ma'lumotlari</span>
        <button @click="funcForm">
          <i class="bx bx-x text-white text-3xl cursor-pointer"></i>
        </button>
      </div>
      <div class="px-10 py-5">
        <div class="flex justify-between gap-5 mb-5">
          <div class="w-1/2">
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
              >Nomi *</label
            >
            <input
              type="text"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Maria"
              required
              v-model="newData.name"
            />
          </div>
          <div class="w-1/2">
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
              >Narxi *</label
            >
            <input
              type="text"
              id="price"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="130$"
              required
              v-model="newData.price"
            />
          </div>
        </div>
        <div class="flex justify-between gap-5 mb-5">
          <div class="w-1/2">
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
              >Brand *</label
            >
            <input
              type="text"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Nike"
              required
              v-model="newData.brand"
            />
          </div>
          <div class="w-1/2">
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">
              Turi *
            </label>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none"
              @change="(e) => (newData.categoryId = e.target.value)"
            >
              <option v-for="el in category_store.DATA" :value="el.id">{{ el.name }}</option>
            </select>
          </div>
        </div>
        <div class="flex justify-between gap-5 mb-5">
          <div class="w-1/2">
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
              >Ma'lumot *</label
            >
            <textarea
              id="last_name"
              class="h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Qisqacha ma'lumot"
              required
              v-model="newData.info"
            />
          </div>
          <div class="w-1/2">
            <label class="block mb-2 text-sm font-medium text-gray-900" for="file_input"
              >Rasmi *</label
            >

            <div class="flex items-center justify-center w-full">
              <label
                for="file"
                class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
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
                <input id="file" type="file" class="hidden" @change="fileSelected" />
              </label>
            </div>
          </div>
        </div>
        <div class="w-full mb-5">
          <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">Soni *</label>
          <input
            type="text"
            id="last_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
            placeholder="0"
            required
            v-model="newData.count"
          />
        </div>
        <div class="flex items-center justify-end gap-5">
          <button
            class="border text-sm text-[#4D44B5] border-[#4D44B5] p-2 px-4 rounded-full shadow-xl"
          >
            Saqlash
          </button>
          <button
            @click="createEquipment"
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
