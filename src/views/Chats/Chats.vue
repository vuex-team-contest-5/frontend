<script setup>
import Message from '@/components/Message.vue'
import ChatAvatar from '@/components/ChatAvatar.vue'
import Loading from '@/components/Loading.vue'
import { useChatStore } from '@/stores/chat/chat'
import { useMessageStore } from '@/stores/message/message'
import { ref, reactive, onMounted } from 'vue'

const chats_store = useChatStore()
const message_store = useMessageStore()

const message = reactive({
  images: [],
  body: '',
  status: true,
  chatId: null
})
const file = ref(null)
const selectedFileUrl = ref(null)

const resetImages = () => {
  message.images = []
  file.value = null
  selectedFileUrl.value = null
}

const getFile = (e) => {
  message.images.push(e.target.files[0])
  const fileUrl = URL.createObjectURL(e.target.files[0])
  selectedFileUrl.value = fileUrl
}

const messaging = async () => {
  if (message.body.trim().length) {
    console.log(message)
    const formData = new FormData()
    formData.append('images', message.images)
    formData.append('body', message.body)
    formData.append('status', message.status)
    formData.append('chatId', message.chatId)
    await message_store.CREATE(formData, message.chatId)
    message.body = ''
    message.images = []
  }
}

const changeChat = async (id) => {
  await message_store.GETONE(id)
  message.chatId = id
}

onMounted(async () => {
  await chats_store.GET()
})
</script>

<template>
  <Loading v-if="chats_store.LOAD" />
  <div v-else class="">
    <h3 v-if="!chats_store.DATA.length" class="text-xl w-full text-center py-20 text-gray-400">
      Hali chat yo'q 🤷‍♂️
    </h3>
    <div v-else class="flex gap-5 p-5">
      <div class="w-80 max-h-[82vh] overflow-y-auto p-2">
        <div class="">
          <ChatAvatar @click="() => changeChat(el.id)" v-for="el in chats_store.DATA" :data="el" />
        </div>
      </div>
      <div v-if="!message_store.STARTED" class="w-2/3 h-[80vh]">
        <div
          class="bg-[#EAECF0] border border-[#4D44B5]/50 rounded-xl overflow-y-auto h-[70vh] p-5 shadow-xl"
        >
          <Message v-if="!message_store.LOAD" v-for="el in message_store.DATA" :data="el" />
          <div v-else class="w-full h-full">
            <Loading />
          </div>
        </div>
        <div class="relative h-[10vh] pt-3 shadow-xl">
          <div
            v-if="selectedFileUrl"
            class="bg-white rounded-xl w-full absolute bottom-14 border border-[#4D44B5]/50 p-2 flex items-center"
          >
            <div class="relative">
              <img
                :src="selectedFileUrl"
                class="h-40 object-cover rounded-lg border border-[#4D44B5]/50"
                alt=""
              />
              <button
                @click="resetImages"
                class="bg-black/50 hover:bg-black/80 h-8 w-8 flex items-center justify-center rounded-full text-white top-1 right-2 absolute"
              >
                <i class="bx bx-x text-2xl"></i>
              </button>
            </div>
          </div>
          <textarea
            type="text"
            class="h-[10vh] w-full rounded-xl shadow outline-none px-3 border border-[#4D44B5]/50 py-3 focus:shadow-2xl"
            v-model="message.body"
          />
          <div class="absolute right-44 bottom-0">
            <div
              class="hidden absolute bottom-16 shadow-xl rounded-xl border border-[#4D44B5]/80 -right-0 bg-white w-64 h-64"
            ></div>
            <i class="bx bx-smile text-3xl text-[#4D44B5]"></i>
          </div>
          <button class="absolute right-[135px] bottom-1 text-3xl flex items-start justify-center">
            <label for="file" class="flex items-center justify-center cursor-pointer">
              <i class="bx bx-paperclip -rotate-45 text-[#4D44B5]"></i>
            </label>
            <input type="file" @change="(e) => getFile(e)" id="file" class="hidden" />
          </button>
          <button
            @click="messaging"
            class="absolute right-5 bottom-0 p-2 px-5 rounded-full text-white flex items-center justify-center gap-2 bg-[#4D44B5] hover:bg-[#4D44B5]/90"
          >
            Send <i class="bx bx-send"></i>
          </button>
        </div>
      </div>
      <div v-else class="w-2/3 h-[80vh] flex items-center justify-center py-20">
        <h3 class="text-xl bg-gray-500/70 p-2 px-5 rounded-full text-white">
          Yozish uchun chatni tanlang
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
