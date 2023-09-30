<script setup>
import { ref, onMounted } from 'vue'

import SearchInput from '@/components/SearchInput.vue'
import Loading from '@/components/Loading.vue'
import AddButton from '@/components/Buttons/AddButton.vue'
import UserCards from '@/components/UserCards.vue'
import CirclePagination from '@/components/CirclePagination.vue'
import AddTeacherForm from '@/components/Teacher/AddTeacherForm.vue'
import DeleteForm from '@/components/DeleteForm.vue'
import TeacherInfo from '@/components/Teacher/TeacherInfo.vue'
import { useTeacherStore } from '@/stores/teachers/teacher'

const teacher_store = useTeacherStore()
const isAddForm = ref(false)
const deleteId = ref(null)
const infoId = ref(null)
const editId = ref(null)

const toggleAddForm = () => (isAddForm.value = !isAddForm.value)
const setDeleteId = (id = null) => (deleteId.value = id)
const setInfoId = (id = null) => (infoId.value = id)
const setEditId = (id = null) => (editId.value = id)

const deleteFunc = async () => {
  await teacher_store.DELETE(deleteId.value)
  deleteId.value = null
  infoId.value = null
  editId.value = null
}

onMounted(async () => {
  await teacher_store.GET()
})
</script>

<template>
  <div class="p-5">
    <AddTeacherForm v-if="isAddForm" :funcForm="toggleAddForm" />
    <DeleteForm v-if="deleteId" :setDeleteId="setDeleteId" :deleteFunc="deleteFunc" />
    <TeacherInfo
      v-if="infoId"
      :funcForm="setInfoId"
      :data="teacher_store.GETONE(infoId)"
      :setDeleteId="setDeleteId"
    />
    <div class="flex items-center justify-between mb-5">
      <SearchInput />
      <AddButton @click="toggleAddForm" />
    </div>
    <Loading v-if="teacher_store.LOAD" />
    <div v-else class="">
      <h3 v-if="!teacher_store.DATA.length" class="text-5xl w-full text-center py-20 text-gray-400">
        Hali ma'lumot qo'shilmagan 🤷‍♂️
      </h3>
      <div v-else class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
        <UserCards
          v-for="el in teacher_store.DATA"
          :data="el"
          :deleteFunc="setDeleteId"
          :setInfoId="setInfoId"
        />
      </div>
      <CirclePagination :data="teacher_store.DATA" :meta="teacher_store.META" />
    </div>
  </div>
</template>

<style scoped></style>
