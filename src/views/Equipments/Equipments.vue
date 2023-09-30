<script setup>
import { ref, onMounted, computed } from 'vue'

import SearchInput from '@/components/SearchInput.vue'
import Loading from '@/components/Loading.vue'
import AddButton from '@/components/Buttons/AddButton.vue'
import EquipmentsCards from '@/components/EquipmentsCards.vue'
import DeleteForm from '@/components/DeleteForm.vue'
import CirclePagination from '@/components/CirclePagination.vue'
import AddEquipmentForm from '../../components/Equipment/AddEquipmentForm.vue'
import { useEquipmentsStore } from '../../stores/equipments/equipments'
import { useAuthStore } from '../../stores/auth/auth'

const equipments_store = useEquipmentsStore()
const auth_store = useAuthStore()

const isAddForm = ref(false)
const deleteId = ref(null)
const infoId = ref(null)
const editId = ref(null)

const toggleAddForm = () => (isAddForm.value = !isAddForm.value)
const setDeleteId = (id) => (deleteId.value = id)

const searching = ref(null)

const search = (value) => {
  searching.value = value
}

const equipments = computed(() => {
  if (searching.value)
    return equipments_store.DATA.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(searching.value.toLocaleLowerCase()) ||
        item.price.toLocaleLowerCase().includes(searching.value.toLocaleLowerCase()) ||
        item.brand.toLocaleLowerCase().includes(searching.value.toLocaleLowerCase()) ||
        item.info.toLocaleLowerCase().includes(searching.value.toLocaleLowerCase()) ||
        item.category.name.toLocaleLowerCase().includes(searching.value.toLocaleLowerCase())
    )

  return equipments_store.DATA
})

onMounted(async () => {
  await equipments_store.GET()
})
</script>

<template>
  <div class="p-5">
    <AddEquipmentForm v-if="isAddForm" :funcForm="toggleAddForm" />
    <DeleteForm v-if="deleteId" :funcForm="toggleAddForm" />
    <div class="flex items-center justify-between mb-5">
      <SearchInput @search="search" />
      <AddButton v-if="auth_store.GET_ROLE == 'admin'" @click="toggleAddForm" />
    </div>
    <Loading v-if="equipments_store.LOAD" />
    <div class="">
      <h3
        v-if="!equipments_store.DATA.length && !equipments_store.LOAD"
        class="text-5xl w-full text-center py-20 text-gray-400"
      >
        Hali ma'lumot qo'shilmagan 🤷‍♂️
      </h3>

      <div v-else>
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
          <EquipmentsCards v-for="el in equipments" :data="el" :deleteFunc="setDeleteId" />
        </div>
      </div>

      <CirclePagination :data="equipments" :meta="equipments_store.META" />
    </div>
  </div>
</template>

<style scoped></style>
