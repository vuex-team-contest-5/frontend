<script setup>
import { ref, onMounted, computed } from 'vue'

import SearchInput from '@/components/SearchInput.vue'
import Loading from '@/components/Loading.vue'
import AddButton from '@/components/Buttons/AddButton.vue'
import ProductsCards from '@/components/ProductsCards.vue'
import AddProductForm from '@/components/Product/AddProductForm.vue'
import DeleteForm from '@/components/DeleteForm.vue'
import CirclePagination from '@/components/CirclePagination.vue'
import { useProductsStore } from '../../stores/products/products'
import { useAuthStore } from '../../stores/auth/auth'

const products_store = useProductsStore()
const auth_store = useAuthStore()

const isAddForm = ref(false)
const deleteId = ref(null)

const toggleAddForm = () => (isAddForm.value = !isAddForm.value)
const setDeleteId = (id) => (deleteId.value = id)

const searching = ref(null)

const search = (value) => {
  searching.value = value
}

const products = computed(() => {
  if (searching.value)
    return products_store.DATA.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(searching.value.toLocaleLowerCase()) ||
        item.price.toLocaleLowerCase().includes(searching.value.toLocaleLowerCase()) ||
        item.brand.toLocaleLowerCase().includes(searching.value.toLocaleLowerCase()) ||
        item.info.toLocaleLowerCase().includes(searching.value.toLocaleLowerCase()) ||
        item.category.name.toLocaleLowerCase().includes(searching.value.toLocaleLowerCase())
    )

  return products_store.DATA
})

onMounted(async () => {
  await products_store.GET()
})
</script>

<template>
  <div class="p-5">
    <AddProductForm v-if="isAddForm && auth_store.GET_ROLE == 'admin'" :funcForm="toggleAddForm" />
    <DeleteForm v-if="deleteId && auth_store.GET_ROLE == 'admin'" :funcForm="toggleAddForm" />
    <div class="flex items-center justify-between mb-5">
      <SearchInput @search="search" />
      <AddButton v-if="auth_store.GET_ROLE == 'admin'" @click="toggleAddForm" />
    </div>
    <Loading v-if="products_store.LOAD" />
    <div class="">
      <h3
        v-if="!products_store.DATA.length"
        class="text-5xl w-full text-center py-20 text-gray-400"
      >
        Hali ma'lumot qo'shilmagan 🤷‍♂️
      </h3>

      <div v-else>
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
          <ProductsCards v-for="el in products" :data="el" :deleteFunc="setDeleteId" />
        </div>

        <CirclePagination :data="products" :meta="products_store.META" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
