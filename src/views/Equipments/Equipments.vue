<script setup>
import { ref, onMounted } from 'vue'

import SearchInput from '@/components/SearchInput.vue'
import Loading from '@/components/Loading.vue'
import AddButton from '@/components/Buttons/AddButton.vue'
import ProductCards from '@/components/Product/ProductCards.vue'
import CirclePagination from '@/components/CirclePagination.vue'
import DeleteForm from '@/components/DeleteForm.vue'
import AddProductForm from '@/components/Product/AddProductForm.vue'
import { useProductStore } from '@/stores/product/product'

const product_store = useProductStore()
const isAddForm = ref(false)
const deleteId = ref(null)
const infoId = ref(null)
const editId = ref(null)

const toggleAddForm = () => (isAddForm.value = !isAddForm.value)
const setDeleteId = (id = null) => {
  console.log(id)
  deleteId.value = id
}
const setInfoId = (id = null) => (infoId.value = id)
const setEditId = (id = null) => (editId.value = id)
const deleteFunc = async () => {
  console.log(deleteId.value)
  await product_store.DELETE(deleteId.value, 'equipment')
  deleteId.value = null
  console.log('DELETED')
}

onMounted(async () => {
  await product_store.GET('equipment')
})
</script>

<template>
  <div class="p-5">
    <AddProductForm v-if="isAddForm" :funcForm="toggleAddForm" />
    <DeleteForm v-if="deleteId" :setDeleteId="setDeleteId" :deleteFunc="deleteFunc" />
    <div class="flex items-center justify-between mb-5">
      <SearchInput />
      <AddButton @click="toggleAddForm" />
    </div>
    <Loading v-if="product_store.LOAD" />
    <div v-else class="w-full">
      <h3 v-if="!product_store.DATA.length" class="text-5xl w-full text-center py-20 text-gray-400">
        Hali ma'lumot qo'shilmagan 🤷‍♂️
      </h3>
      <div v-else class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
        <ProductCards v-for="el in product_store.DATA" :data="el" :deleteFunc="setDeleteId" />
      </div>
      <CirclePagination :data="product_store.DATA" :meta="product_store.META" />
    </div>
  </div>
</template>

<style scoped></style>
