<script setup>
defineProps(['data'])
import { main_URL } from '@/service/axios'
</script>

<template>
  <div
    class="mb-2 hover:shadow-xl flex items-center gap-3 cursor-pointer shadow-lg rounded-xl bg-white p-3"
  >
    <img
      :src="
        data.client.imageName
          ? `${main_URL}/image/${data.client.imageName}`
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnbhk5N2f5z5F3ubhn6aWM4TUzxceKsa0RIg&usqp=CAU'
      "
      class="h-16 w-16 object-cover rounded-full"
      alt=""
    />
    <div class="">
      <h3 class="font-bold text-sm">{{ data.client.firstName }} {{ data.client.lastName }}</h3>
      <p class="text-sm text-gray-600">Assalomu alaykum 👋</p>
    </div>
  </div>
</template>

<style scoped></style>
