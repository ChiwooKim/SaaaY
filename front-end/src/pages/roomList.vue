<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div v-for="(room, index) in rooms" :key="index">
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ room.roomName }}</div>
          <div class="text-subtitle2">by {{ room.moderator[0] }}</div>
          <div class="text-subtitle2">
            people {{ room.participates.length }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { computed /*, ref, watch*/ } from 'vue';
import /*useRoute, useRouter*/ 'vue-router';
import { useStore } from 'src/store';

export default {
  setup() {
    // const route = useRoute();
    // const router = useRouter();
    const $store = useStore();

    $store.dispatch('room/getRoomList').catch(console.log);

    const loadRoomList = () => $store.dispatch('room/getRoomList');

    const rooms = computed(() => $store.state.room.rooms);

    return {
      rooms,
      loadRoomList,
    }; //end setup
  }, // end export default
};
</script>
