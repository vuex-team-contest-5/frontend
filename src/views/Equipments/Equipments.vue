<script setup>
import { ref, onMounted } from 'vue'

import SearchInput from '@/components/SearchInput.vue'
import Loading from '@/components/Loading.vue'
import AddButton from '@/components/Buttons/AddButton.vue'
import EquipmentsCards from '@/components/EquipmentsCards.vue'
import AddEquipmentForm from '@/components/AddEquipmentForm.vue'
import DeleteForm from '@/components/DeleteForm.vue'
import Pagination from '@/components/Pagination.vue'
import { useEquipmentsStore } from '@/stores/equipments/equipments'
import { useAuthStore } from '../../stores/auth/auth'

const equipments_store = useEquipmentsStore()
const auth_store = useAuthStore()

const isAddForm = ref(false)
const deleteId = ref(null)

const toggleAddForm = () => (isAddForm.value = !isAddForm.value)
const setDeleteId = (id) => (deleteId.value = id)

onMounted(async () => {
  await equipments_store.GET()
})
</script>

<template>
  <div class="p-5">
    <AddEquipmentForm
      v-if="isAddForm && auth_store.GET_ROLE == 'admin'"
      :funcForm="toggleAddForm"
    />
    <DeleteForm v-if="deleteId && auth_store.GET_ROLE == 'admin'" :funcForm="toggleAddForm" />
    <div class="flex items-center justify-between mb-5">
      <SearchInput />
      <AddButton v-if="auth_store.GET_ROLE == 'admin'" @click="toggleAddForm" />
    </div>
    <!-- <Loading v-if="equipments_store.LOAD" /> -->
    <div class="">
      <h3
        v-if="!equipments_store.DATA.length"
        class="text-5xl w-full text-center py-20 text-gray-400"
      >
        Hali ma'lumot qo'shilmagan 🤷‍♂️
      </h3>
      <div v-else>
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
          <EquipmentsCards
            v-for="el in equipments_store.DATA"
            :data="el"
            :deleteFunc="setDeleteId"
          />
        </div>

        <Pagination class="mt-5 rounded" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
