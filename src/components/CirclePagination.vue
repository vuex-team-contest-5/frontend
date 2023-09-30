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
        class="h-10 w-10 rounded-full"
        :class="
          el == meta.currentPage
            ? 'border border-[#4D44B5] bg-[#4D44B5] text-white '
            : 'border border-[#4D44B5] text-[#4D44B5]'
        "
      >
        {{ el }}
      </button>
      <i class="bx bxs-right-arrow text-gray-500"></i>
    </div>
  </div>
</template>

<style scoped></style>
