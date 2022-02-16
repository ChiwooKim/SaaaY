<template>
  <div>
    <q-btn label="방만들기" color="primary" @click="prompt" />

    <div class="q-pa-md row items-start q-gutter-md">
      <div v-for="(room, index) in rooms" :key="index">
        <q-card class="my-card">
          <q-card-section
            class="bg-primary text-white"
            :class="[
              fontTheme,
              index % 2 == 0 ? 'bg-primary text-white' : 'bg-purple text-white',
            ]"
          >
            <div class="text-h6">{{ room.roomName }}</div>
            <div class="text-subtitle2">by {{ room.moderator[0] }}</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn @click="getRoom(index)">방 참가하기</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
//다이얼로그 사용하기위해 임포트!!!!
import { useQuasar } from "quasar";
// import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useStore } from "src/store";
import { Cookies } from "quasar";

export default {
  setup() {
    // const route = useRoute();
    // const router = useRouter();
    const $store = useStore();
    const router = useRouter();
    //다이얼로그 사용하기위해서 선언!!!
    const $q = useQuasar();
    //엑세스토큰 쿠키에서 가져오기
    const accessToken = Cookies.get("access_token");
    $store.dispatch("room/getRoomList").catch(console.log);

    const loadRoomList = () => $store.dispatch("room/getRoomList");

    //룸  vuex 데이터 갱신 함수
    const getRoom = async (index) => {
      // $store.dispatch("room/setIndex", index);
      // $store.
      await $store.dispatch("room/getRoom", index);
      await router.push(`/main/${index}`);
    };

    //방생성
    let room = {
      roomName: "",
      category: ["수다방"],
      moderator: [],
      participates: [],
      notice: "공지사항을 수정해주세요!!!",
    };

    // let roomInput = () => $

    // 다이얼로그 기능!!!
    function prompt() {
      $q.dialog({
        title: "방만들기",
        message: "방 제목을 적어주세요!!!!",
        prompt: {
          model: "",
          type: "text", // optional
        },
        cancel: true,
        persistent: true,
      })
        .onOk((data) => {
          console.log(">>>> OK, received", data);
          room.roomName = data;
          console.log(room);
          //vuex에서 방만들어줌
          $store.dispatch("room/createRoom", { room, accessToken });
          //rooms 다시받아옴
          loadRoomList;
        })
        .onCancel(() => {
          // console.log(">>>> Cancel");
        })
        .onDismiss(() => {
          // console.log("I am triggered on both OK and Cancel");
        });
    }
    //vuex action에서 백엔드로 방을 만들게 데이터 전달하는 함수

    const rooms = computed(() => $store.state.room.rooms);

    return {
      rooms,
      loadRoomList,
      prompt,
      getRoom,
    }; //end setup
  }, // end export default
};
</script>
