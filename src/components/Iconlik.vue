<script setup>
defineProps(['icon', 'title', 'value'])
</script>

<template>
  <div class="flex items-center gap-2">
    <i
      class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xl"
      :class="icon"
    ></i>
    <div class="text-start">
      <h3 class="text-sm text-gray-500">{{ title }}</h3>
      <h4 class="text-xs text-[#303972] font-bold">{{ value }}</h4>
    </div>
  </div>
</template>

<style scoped></style>
