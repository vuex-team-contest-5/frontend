<script setup>
defineProps(['setDeleteId', 'deleteFunc'])
</script>

<template>
  <div
    class="overflow-y-auto flex items-center overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center bg-black/50 w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
      <div class="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
        <button
          @click="() => setDeleteId()"
          type="button"
          class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm p-1.5 px-2 ml-auto inline-flex items-center"
          data-modal-toggle="deleteModal"
        >
          <i class="bx bx-x text-2xl text-[#4D44B5]"></i>
          <span class="sr-only">Close modal</span>
        </button>
        <i class="bx bx-trash text-[#4D44B5] mt-5 text-6xl"></i>

        <p class="mb-4 text-gray-500 my-5">Rostan o'chirib yubormoqchimisiz ?</p>
        <div class="flex justify-center items-center space-x-4">
          <button
            @click="() => setDeleteId()"
            class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-[#4D44B5]/80 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
          >
            Yo'q, hazillashdim
          </button>
          <button
            @click="deleteFunc"
            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
          >
            Ha, albatta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
