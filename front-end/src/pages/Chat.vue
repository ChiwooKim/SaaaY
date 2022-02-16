<template>
  <q-page class="q-pa-md row justify-between">
    <div style="width: 100%; max-width: 1000px">
      <q-chat-message label="Sunday, 19th" />

      <template v-for="(chat, index) in chats" :key="index">
        <q-chat-message
          v-if="(chat.userName === myName) | !myName"
          name="me"
          avatar="https://cdn.quasar.dev/img/avatar6.jpg"
          :text="[chat.chat]"
          sent
          stamp="10 minutes ago"
        />
        <q-chat-message
          v-else
          avatar="https://cdn.quasar.dev/img/avatar6.jpg"
          :text="[chat.chat]"
          stamp="7 minutes ago"
        >
          <template v-slot:name>{{ chat.userName }}</template>
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

    const myName = computed(() => $store.state.main.myName);
    const chats = computed(() => $store.state.main.chatData);
    return {
      myName,
      chats,
    };
  },
});
</script>
