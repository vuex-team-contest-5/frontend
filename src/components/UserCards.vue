<script setup>
defineProps(['data', 'deleteFunc', 'setInfoId'])
import { main_URL } from '@/service/axios'
import { formatDays } from '@/helpers/formatDays'
import Iconlik from './Iconlik.vue'
</script>

<template>
  <div
    class="cursor-pointer hover:shadow-xl duration-300 bg-white rounded-xl py-5 relative text-center"
  >
    <button class="text-gray-500 text-lg absolute top-2 right-10">
      <i class="bx bx-pencil"></i>
    </button>
    <button @click="() => deleteFunc(data.id)" class="text-gray-500 text-lg absolute top-2 right-2">
      <i class="bx bx-trash"></i>
    </button>
    <img
      @click="() => setInfoId(data.id)"
      :src="
        data.imageName
          ? `${main_URL}/image/${data.imageName}`
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnbhk5N2f5z5F3ubhn6aWM4TUzxceKsa0RIg&usqp=CAU'
      "
      class="h-20 w-20 object-cover rounded-full mx-auto border border-[#4D44B5] mb-3"
      alt="avatar"
    />
    <h3 @click="() => setInfoId(data.id)" class="text-[#303972] font-[600] text-md">
      {{ data.firstName }} {{ data.lastName }}
    </h3>
    <h4 @click="() => setInfoId(data.id)" class="text-[#4D44B5] text-sm">{{ data.info }}</h4>
    <div class="flex items-center justify-between px-5 mt-5">
      <Iconlik icon="bx bx-user" title="Toifa" :value="data.type.name" />
      <Iconlik icon="bx bx-calendar-alt" title="Kuni" :value="formatDays(data.workDay)" />
    </div>
  </div>
</template>

<style scoped></style>
