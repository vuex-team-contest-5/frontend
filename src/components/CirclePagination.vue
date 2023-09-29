<script setup>
defineProps(['data', 'meta'])
</script>

<template>
  <div class="flex items-center justify-between p-5">
    <span class="text-gray-500 text-sm"> Jami: {{ meta.totalCount }} ta </span>
    <div class="flex items-center justify-center gap-3">
      <i class="bx bxs-left-arrow text-gray-500"></i>
      <button
        v-for="el in meta.totalPages"
        class="border border-[#4D44B5] bg-[#4D44B5] h-10 w-10 text-white rounded-full"
      >
        1
      </button>
      <i class="bx bxs-right-arrow text-gray-500"></i>
    </div>
  </div>
</template>

<style scoped></style>
