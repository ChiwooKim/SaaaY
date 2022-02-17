<template>
  <q-page class="q-pa-md row justify-between">
    <div style="width: 100%; max-width: 1000px">
      <q-chat-message label="Sunday, 19th" />

      <template v-for="(chat, index) in chats" :key="index">
        <q-chat-message
          v-if="chat.connectionId === myConnectionId"
          name="me"
          :avatar="chat.img"
          :text="[chat.newMessage]"
          sent
          stamp="10 minutes ago"
        />
        <q-chat-message
          v-else
          :name="chat.writer"
          :avatar="chat.img"
          :text="[chat.newMessage]"
          stamp="7 minutes ago"
        >
        </q-chat-message>
      </template>
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "src/store";

export default defineComponent({
  name: "PageIndex",
  mensagem: "Mensagem enviada do vue!",

  setup() {
    const $store = useStore();

    const myConnectionId = computed(() => $store.state.main.myConnectionId);
    const chats = computed(() => $store.state.main.chatData);
    return {
      myConnectionId,
      chats,
    };
  },
});
</script>
