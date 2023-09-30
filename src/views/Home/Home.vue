<script setup>
import { onMounted, reactive } from 'vue'
import { useAuthStore } from '../../stores/auth/auth'
import HomeTeacherTable from '@/components/HomeTeacherTable.vue'
import HomeProductTable from '@/components/HomeProductTable.vue'
const auth_store = useAuthStore()

const data = reactive({ countInfo: {} })

onMounted(async () => {
  data.countInfo = (await auth_store.GET_COUNT_INFO()).data
})
</script>

<template>
  <div class="p-5">
    <div class="p-5 bg-white rounded-xl shadow-md grid lg:grid-cols-4 sm:grid-cols-2 mb-5">
      <div class="flex items-center justify-center gap-5">
        <img src="@/assets/img/barbell.png" class="h-20" alt="image" />
        <div class="">
          <h3 class="text-md text-[#A098AE]">Mahsulotlar</h3>
          <h4 class="text-[36px] font-bold text-[#303972]">
            {{ data.countInfo.productCount || 0 }}
          </h4>
        </div>
      </div>
      <div class="flex items-center justify-center gap-5">
        <img src="@/assets/img/clients.png" class="h-20" alt="image" />
        <div class="">
          <h3 class="text-md text-[#A098AE]">Mijozlar</h3>
          <h4 class="text-[36px] font-bold text-[#303972]">
            {{ data.countInfo.clientCount || 0 }}
          </h4>
        </div>
      </div>
      <div class="flex items-center justify-center gap-5">
        <img src="@/assets/img/teachers.png" class="h-20" alt="image" />
        <div class="">
          <h3 class="text-md text-[#A098AE]">Ustozlar</h3>
          <h4 class="text-[36px] font-bold text-[#303972]">
            {{ data.countInfo.teacherCount || 0 }}
          </h4>
        </div>
      </div>
      <div class="flex items-center justify-center gap-5">
        <img src="@/assets/img/equipments.png" class="h-20" alt="image" />
        <div class="">
          <h3 class="text-md text-[#A098AE]">Jihozlar</h3>
          <h4 class="text-[36px] font-bold text-[#303972]">
            {{ data.countInfo.equipmentCount || 0 }}
          </h4>
        </div>
      </div>
    </div>

    <HomeTeacherTable v-if="auth_store.GET_ROLE == 'admin'" />

    <HomeProductTable v-else-if="auth_store.GET_ROLE == 'client'" />
  </div>
</template>

<style scoped></style>
