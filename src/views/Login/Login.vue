<script setup>
import LoginRight from '@/views/Login/LoginRight.vue'
import { reactive } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth/auth'

const auth_store = useAuthStore()

const user = reactive({
  email: '',
  phoneNumber: ''
})
const router = useRouter()

const useLogin = () => {
  auth_store
    .LOGIN(user)
    .then((res) => {
      console.log(res)
      localStorage.setItem('ownerId', res.data.ownerId)
      router.push('/verification')
    })
    .catch((err) => {
      console.log(err)
      toast.error(`Error`, { autoClose: 1000 })
    })
}
</script>

<template>
  <div class="flex items-center justify-normal">
    <LoginRight />
    <div class="flex items-center justify-center text-center bg-white h-screen w-1/2">
      <div class="w-96 text-start">
        <img src="@/assets/img/hi.png" class="" alt="" />
        <h3 class="text-[30px] font-bold">Welcome back!</h3>
        <p class="text-[16px] font-[400] mb-5">Please login to access your account.</p>
        <div class="mb-5">
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900"
            >G-mail</label
          >
          <input
            type="email"
            id="email"
            class="bg-[#EAEAEA] border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 px-4 shadow"
            placeholder="Type your g-mail "
            v-model="user.email"
            required
          />
        </div>
        <div class="mb-5">
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">
            Phone Number
          </label>
          <input
            type="password"
            id="password"
            class="bg-[#EAEAEA] border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 px-4 shadow"
            placeholder="Type your password "
            v-model="user.phoneNumber"
            required
          />
        </div>
        <button class="block text-[#66BCE8] mb-5 text-sm hover:underline">Forgot Pasword?</button>
        <button @click="useLogin" class="bg-[#4C70FF] w-full p-2 text-white rounded-md">
          Log In
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
