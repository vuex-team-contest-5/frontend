<script setup>
import LoginRight from '@/views/Login/LoginRight.vue'
import { ref, reactive, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth/auth'

const auth_store = useAuthStore()

const code = ref(null)
const router = useRouter()
const timer = reactive({ min: 1, sec: 0 })

const useVerify = () => {
  const sended = {
    ownerId: localStorage.getItem('ownerId'),
    code: code.value
  }
  auth_store
    .VERIFY(sended)
    .then((res) => {
      console.log(res)
      localStorage.removeItem('ownerId')
      router.push('/')
      toast.success(`You are logged in`, { autoClose: 1000 })
    })
    .catch((err) => {
      console.log(err)
      toast.error(`Error`, { autoClose: 1000 })
    })
}

const decTimer = () => {
  if (timer.min == 0 && timer.sec == 0) {
    return
  }
  if (timer.sec == 0) {
    timer.min--
    timer.sec = 60
  }
  timer.sec--
}

const formatTime = (t) => t.toString().padStart(2, '0')

onMounted(() => {
  setInterval(function () {
    decTimer()
  }, 1000)
})
</script>

<template>
  <div class="flex items-center justify-normal">
    <LoginRight />
    <div class="flex items-center justify-center text-center bg-white h-screen w-1/2">
      <form @submit.prevent="useVerify" class="w-[450px] text-start">
        <img src="@/assets/img/hi.png" class="" alt="" />
        <h3 class="text-[30px] font-bold">Second Step Verification</h3>
        <div class="flex items-center justify-center my-5">
          <div class="bg-black/50 p-2 px-3 rounded-lg text-white">
            <span class="text-3xl">{{ formatTime(timer.min) }}:{{ formatTime(timer.sec) }}</span>
          </div>
        </div>
        <p class="text-md font-[400] mb-5 text-center">
          Enter the verification code we sent to <span class="text-[#4C70FF]">demo@gmail.com</span>
        </p>

        <div class="mb-5">
          <input
            type="text"
            id="password"
            class="bg-[#EAEAEA] border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 px-4 shadow"
            placeholder="Type code here "
            required
            :disabled="timer.min == 0 && timer.sec == 0"
            v-model="code"
          />
        </div>
        <button class="block text-[#66BCE8] mb-5 text-sm hover:underline">Forgot Pasword?</button>
        <router-link
          to="/login"
          v-if="timer.min == 0 && timer.sec == 0"
          class="block text-center bg-[#4D44B5] mb-5 w-full p-2 text-white rounded-md"
        >
          Qayta kiring
        </router-link>
        <button v-else class="block text-center bg-[#4C70FF] mb-5 w-full p-2 text-white rounded-md">
          Submit
        </button>
        <h3 class="text-center text-sm">
          Didn't get the code? <router-link to="/login" class="text-[#66BCE8]">Resend</router-link>
        </h3>
      </form>
    </div>
  </div>
</template>

<style></style>
