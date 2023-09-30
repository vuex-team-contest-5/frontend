<script setup>
defineProps(['data', 'funcForm', 'setDeleteId', 'setInfoId'])
import { main_URL } from '@/service/axios'
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
        <span class="text-white text-xl">Jihoz ma'lumotlari</span>
        <button @click="() => funcForm(null)">
          <i class="bx bx-x text-white text-3xl cursor-pointer"></i>
        </button>
      </div>
      <div class="px-10 py-5">
        <div class="flex items-center justify-center gap-5 mb-5">
          <img
            :src="`${main_URL}/image/${data.imageName}`"
            class="w-64 h-56 object-cover bg-gray-200 border-2 border-gray-400/80 rounded-2xl"
            alt=""
          />
          <div class="w-[70%] h-56 p-5 rounded-2xl bg-gray-200 border-2 border-gray-400/80">
            <div class="mb-3 flex items-center justify-between">
              <span class="text-2xl font-bold text-[#303972]">
                {{ data.name }}
              </span>
              <div class="">
                <h3 class="text-md text-[#303972] font-semibold">ID {{ data.id.slice(0, 7) }}</h3>
              </div>
            </div>
            <h3 class="text-xl font-bold text-[#303972] mb-5">
              Category: {{ data.category.name }}
            </h3>
            <h3 class="text-xl font-bold text-[#303972] mb-5">
              Brand: <span class="text-red-500">{{ data.brand }}</span>
            </h3>

            <div class="flex items-center justify-between pr-10">
              <Iconlik icon="bx bxs-discount" title="Soni" :value="data.count" />
              <Iconlik icon="bx bx-calendar-alt" title="Kuni" value="..." />
              <Iconlik icon="bx bxs-badge-dollar" title="Narxi" :value="data.phoneNumber" />
            </div>
          </div>
        </div>
        <div
          class="w-full p-5 rounded-2xl bg-gray-200 border-2 border-gray-400/80 mb-5 text-[#303972]"
        >
          <p>{{ data.info }}</p>
        </div>
        <div class="flex items-center justify-end gap-5">
          <button
            class="border text-sm text-[#4D44B5] border-[#4D44B5] p-2 px-4 rounded-full shadow-xl"
          >
            O'zgartirish
          </button>
          <button
            class="border bg-red-500 text-white p-2 px-4 rounded-full shadow-xl text-sm"
            @click="() => setDeleteId(data.id)"
          >
            O'chirish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
