<script setup>
defineProps(['data', 'deleteFunc'])
import { main_URL } from '@/service/axios'
</script>

<template>
  <div
    class="cursor-pointer hover:shadow-xl duration-300 bg-[#4D44B5]/30 rounded-xl relative text-center py-5 pt-10 px-3"
  >
    <button class="text-gray-500 text-xl absolute top-2 right-11">
      <i class="bx bx-pencil"></i>
    </button>
    <button @click="() => deleteFunc(data.id)" class="text-gray-500 text-xl absolute top-2 right-3">
      <i class="bx bx-trash"></i>
    </button>
    <div class="relative bg-white mb-5 rounded-xl border border-[#4D44B5]">
      <img
        :src="
          data.imageName
            ? `${main_URL}/image/${data.imageName}`
            : 'https://cdn.shoplightspeed.com/shops/643683/files/45605395/best-exercise-equipment-for-building-muscle.jpg'
        "
        class="h-44 object-cover w-full rounded-xl mx-auto"
        alt="avatar"
      />
    </div>
    <div class="flex items-center justify-between">
      <span class="text-[#303972] font-[600] text-sm">{{ data.name }}</span>
      <span class="text-[#C11030] text-sm font-semibold">{{ data.brand }}</span>
    </div>
    <div class="flex items-center justify-between">
      <span class="text-[#5C63A3] font-[600] text-sm">{{ data.info }}</span>
      <span class="text-[#1128FA] text-sm font-bold">{{ data.price }}</span>
    </div>
  </div>
</template>

<style scoped></style>
