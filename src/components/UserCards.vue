<script setup>
defineProps(['deleteFunc', 'data'])
import { main_URL } from '@/service/axios'
import { formatDays } from '@/helpers/formatDays'
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
      :src="
        data.imageName
          ? `${main_URL}/image/${data.imageName}`
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnbhk5N2f5z5F3ubhn6aWM4TUzxceKsa0RIg&usqp=CAU'
      "
      class="h-20 w-20 object-cover rounded-full mx-auto border border-[#4D44B5] mb-3"
      alt="avatar"
    />
    <h3 class="text-[#303972] font-[600] text-md">{{ data.firstName }} {{ data.lastName }}</h3>
    <h4 class="text-[#4D44B5] text-sm">{{ data.info }}</h4>
    <div class="flex items-center justify-between px-5 mt-5">
      <div class="flex items-center gap-2">
        <i
          class="bx bx-user w-8 h-8 bg-[#A098AE] rounded-full flex items-center justify-center text-white"
        ></i>
        <div class="text-start">
          <h3 class="text-sm text-gray-500">Toifa</h3>
          <h4 class="text-xs text-[#303972] font-bold">{{ data.type.name }}</h4>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <i
          class="bx bx-calendar-alt w-8 h-8 bg-[#A098AE] rounded-full flex items-center justify-center text-white"
        ></i>
        <div class="text-start">
          <h3 class="text-sm text-gray-500">Kuni</h3>
          <h4 class="text-xs text-[#303972] font-bold">{{ formatDays(data.workDay) }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
