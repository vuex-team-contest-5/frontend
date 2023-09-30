<script setup>
import { onMounted, ref } from 'vue'
import Sidebar from '../components/Sidebar/Sidebar.vue'
import Rightbar from '@/components/Rightbar/Rightbar.vue'
import Header from '@/components/Header/Header.vue'
import { useRightbarStore } from '@/stores/rightbar'
import { useAuthStore } from '../stores/auth/auth'

const rightbar = useRightbarStore()
const auth_store = useAuthStore()

const user = ref()

onMounted(async () => {
  user.value = (await auth_store.GET_USER_INFO()).data
  user.value.role = auth_store.GET_ROLE
})
</script>

<template>
  <main class="relative bg-[#d8edf7] w-full h-screen overflow-x-hidden">
    <Sidebar />
    <div class="lg:ml-72 md:ml-64 sm:ml-20">
      <Header :user="user" />
    </div>
    <div class="lg:ml-72 md:ml-64 sm:ml-20">
      <router-view></router-view>
      <Rightbar />
    </div>
  </main>
</template>

<style></style>
