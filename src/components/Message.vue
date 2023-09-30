<script setup>
import { main_URL } from '@/service/axios'
defineProps(['data'])
import moment from 'moment'
</script>

<template>
  <div class="flex items-center mb-5" :class="data.mine == '1' ? 'justify-start' : 'justify-end'">
    <div
      class="relative bg-white shadow-lg rounded-xl p-2 px-5 pb-5 pr-14"
      :class="data.isClient ? 'rounded-bl-none' : 'rounded-br-none'"
    >
      <div v-if="data.file.length" class="flex gap-2 mb-3">
        <img
          v-for="img in data.file"
          :src="`${main_URL}/image/${img.fileName}`"
          class="h-24 rounded"
          alt="image"
        />
      </div>
      {{ data.body }}
      <span class="absolute right-3 bottom-1 text-gray-500 text-xs">{{
        moment(data.createdAt).format('HH:mm')
      }}</span>
    </div>
  </div>
</template>

<style scoped></style>
