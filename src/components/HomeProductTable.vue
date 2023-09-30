<template>
  <div v-if="products.length" class="relative overflow-x-auto rounded-xl shadow-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-lg text-white uppercase bg-[#4D44B5]">
        <tr>
          <th scope="col" class="px-7 py-4">Mahsulotlar</th>
          <th scope="col" class="px-7 py-4"></th>
          <th scope="col" class="px-7 py-4"></th>
          <th scope="col" class="px-7 py-4"></th>
          <th scope="col" class="px-7 py-4 sr-only">ACTIONS</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="el in products" class="bg-white border-b">
          <th scope="row" class="px-7 py-4 flex items-center gap-3">
            <img src="@/assets/img/protein.png" class="h-14 w-14 rounded-full border" alt="" />
            <div class="">
              <h3 class="text-[#101828] font-[700] text-[15px]">{{ el?.name }}</h3>
            </div>
          </th>
          <td class="px-7 py-4 text-[#232D42]">ID {{ el?.id?.toUpperCase().slice(0, 5) }}</td>
          <td class="px-7 py-4">
            <div class="flex items-center justify-center gap-2">
              <div class="">
                <h3>Toifa</h3>
                <h3 class="text-[#232D42] text-lg">{{ el?.category.name }}</h3>
              </div>
            </div>
          </td>
          <td class="px-7 py-4">
            <button class="w-full bg-[#5D5FEF] p-2 rounded-full text-[#FCC43E] font-bold">
              {{ el?.price }}
            </button>
          </td>
          <td class="px-7 py-4">
            <div class="flex items-center justify-center gap-3"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import Loading from '@/components/Loading.vue'

const { products = [], load = true } = defineProps(['products'])
</script>

<style lang="scss" scoped></style>
