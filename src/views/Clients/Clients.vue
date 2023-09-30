<script setup>
import { ref, onMounted } from 'vue'

import SearchInput from '@/components/SearchInput.vue'
import Loading from '@/components/Loading.vue'
import AddButton from '@/components/Buttons/AddButton.vue'
import Pagination from '@/components/Pagination.vue'
import AddClientForm from '@/components/Client/AddClientForm.vue'
import ClientInfo from '@/components/Client/ClientInfo.vue'
import { main_URL } from '@/service/axios'
import { useClientStore } from '@/stores/client/client'

const client_store = useClientStore()
const isAddForm = ref(false)
const deleteId = ref(null)
const infoId = ref(null)

const toggleAddForm = () => (isAddForm.value = !isAddForm.value)
const setDeleteId = (id) => (deleteId.value = id)
const setInfoId = (id = null) => (infoId.value = id)

onMounted(async () => {
  await client_store.GET()
})
</script>

<template>
  <div class="p-5">
    <AddClientForm v-if="isAddForm" :funcForm="toggleAddForm" />
    <DeleteForm v-if="deleteId" :funcForm="toggleAddForm" />
    <ClientInfo v-if="infoId" :funcForm="setInfoId" :data="client_store.GETONE(infoId)" />
    <div class="flex items-center justify-between mb-5">
      <SearchInput />
      <AddButton @click="toggleAddForm" />
    </div>
    <Loading v-if="client_store.LOAD" />
    <div v-else class="">
      <h3 v-if="!client_store.DATA.length" class="text-5xl w-full text-center py-20 text-gray-400">
        Hech qanday ma'lumot topilmadi 🤷‍♂️
        {{ client_store.DATA }}
      </h3>
      <div class="relative overflow-x-auto rounded-xl shadow-lg">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-sm text-white uppercase bg-[#4D44B5]">
            <tr>
              <th scope="col" class="px-7 py-4">I.F.SH</th>
              <th scope="col" class="px-7 py-4">ID</th>
              <th scope="col" class="px-7 py-4">Ustoz</th>
              <th scope="col" class="px-7 py-4">Boshladi</th>
              <th scope="col" class="px-7 py-4">Muddati</th>
              <th scope="col" class="px-7 py-4 sr-only">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="el in client_store.DATA"
              class="cursor-pointer bg-white hover:bg-purple-100 border-b"
              @click="() => setInfoId(el.id)"
            >
              <th scope="row" class="px-7 py-4 flex items-center gap-3">
                <img
                  :src="
                    el.imageName
                      ? `${main_URL}/image/${data.imageName}`
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnbhk5N2f5z5F3ubhn6aWM4TUzxceKsa0RIg&usqp=CAU'
                  "
                  class="h-14 w-14 rounded-full border"
                  alt=""
                />
                <div class="">
                  <h3 class="text-[#101828] font-[700] text-[15px]">
                    {{ el.firstName }} {{ el.lastName }}
                  </h3>
                  <h3 class="text-[#667085] text-sm">{{ el.phoneNumber }}</h3>
                </div>
              </th>
              <td class="px-7 py-4 text-[#232D42]">ID{{ el.id.slice(0, 8) }}</td>
              <td class="px-7 py-4">{{ el.teacher.firstName }} {{ el.teacher.lastName }}</td>
              <td class="px-7 py-4">{{ el.startedAt }}</td>
              <td class="px-7 py-4">{{ el.period }}</td>
              <td class="px-7 py-4">
                <div class="flex items-center justify-center gap-3">
                  <i class="bx bx-trash text-gray-500 text-xl"></i>
                  <i class="bx bx-pencil text-gray-500 text-xl"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <Pagination />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
