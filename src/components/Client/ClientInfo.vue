<script setup>
defineProps(['data', 'funcForm'])
import { main_URL } from '@/service/axios'
import { formatDays } from '@/helpers/formatDays'
import Iconlik from '@/components/Iconlik.vue'

const calcAge = (year) => {
  const currentYear = new Date().getFullYear()
  return currentYear - year
}
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black/50 z-50 overflow-y-auto">
    <div class="mx-auto my-5 lg:w-3/5 md:w-5/6 w-[98%] bg-white rounded-xl">
      <div
        class="bg-[#4D44B5] w-full px-10 p-5 font-semibold flex items-center justify-between rounded-t-xl"
      >
        <span class="text-white text-xl">Mijoz ma'lumotlari</span>
        <button @click="() => funcForm(null)">
          <i class="bx bx-x text-white text-3xl cursor-pointer"></i>
        </button>
      </div>
      <div class="px-10 py-5">
        <div class="flex items-center justify-center gap-5 mb-5">
          <img
            :src="
              data.imageName
                ? `${main_URL}/image/${data.imageName}`
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnbhk5N2f5z5F3ubhn6aWM4TUzxceKsa0RIg&usqp=CAU'
            "
            class="w-64 h-56 object-cover bg-gray-200 border-2 border-gray-400/80 rounded-2xl"
            alt=""
          />
          <div class="w-[70%] h-56 p-5 rounded-2xl bg-gray-200 border-2 border-gray-400/80">
            <div class="mb-3 flex items-center justify-between">
              <span class="text-2xl font-bold text-[#303972]">
                {{ data.firstName }} {{ data.lastName }}
              </span>
              <div class="">
                <h3 class="text-sm text-[#303972] font-semibold">
                  {{ data.birthDate.replace(/-/, '.') }}
                </h3>
                <h3 class="text-sm text-[#303972] font-semibold">ID {{ data.id.slice(0, 7) }}</h3>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-[#303972] mb-5">
              {{ calcAge(data.birthDate.slice(0, 4)) }} yosh
            </h3>
            <div class="flex items-center justify-between mb-5">
              <span class="text-xl font-bold text-[#303972]">
                {{ data.isMale ? 'Erkak' : 'Ayol' }}
              </span>
              <span class="text-md font-bold text-[#303972]">
                {{ data.email }}
              </span>
            </div>
            <div class="flex items-center justify-between pr-10">
              <Iconlik
                icon="bx bx-user"
                title="Ustoz"
                :value="`${data.teacher.firstName} ${data.teacher.lastName}`"
              />
              <Iconlik
                icon="bx bx-calendar-alt"
                title="Kuni"
                :value="formatDays(data.teacher.workDay)"
              />
              <Iconlik icon="bx bx-phone" title="Tel:" :value="data.phoneNumber" />
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end gap-5">
          <button
            class="border text-sm text-[#4D44B5] border-[#4D44B5] p-2 px-4 rounded-full shadow-xl"
          >
            O'zgartirish
          </button>
          <button
            class="border bg-red-500 text-white p-2 px-4 rounded-full shadow-xl text-sm"
            @click="createUser"
          >
            O'chirish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
