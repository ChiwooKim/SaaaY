<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#aaaaaa, #757575)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 600px; height: 550px">
          <q-card-section class="bg-green-4">
            <h4 class="text-h5 text-white q-my-md">My Profile</h4>
            <div
              class="absolute-bottom-right q-pr-md"
              style="transform: translateY(50%)"
            ></div>
          </q-card-section>
          <q-card-section class="column justify-evenly">
            <q-form class="q-px-sm q-pt-xl q-pb-lg">
              <q-input
                square
                clearable
                v-model="user.email"
                type="email"
                label="Email"
                readonly
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="user.username"
                type="username"
                label="Username"
                readonly
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="user.biography"
                type="text"
                label="Biography"
                readonly
              >
                <template v-slot:prepend>
                  <q-icon name="newspaper" />
                </template>
              </q-input>
            </q-form>
            <div class="row justify-around">
              <q-chip square>Following {{ user.following.length }}</q-chip>
              <q-chip square>Follower {{ user.follower.length }}</q-chip>
            </div>
          </q-card-section>
          <div style="height: 60px"></div>
          <div class="row justify-around">
            <div class="col-3">
              <q-btn
                color="primary"
                icon="checklist"
                label="Apply"
                @click="onSubmit"
              />
            </div>
            <div class="col-3">
              <q-btn color="warning" icon="cancel" label="Return" to="/main" />
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useStore } from "src/store";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  updated() {
    console.log("updated");
  },
  setup() {
    const $store = useStore();
    const route = useRoute();
    const userId = computed(() => route.params.userId);
    $store.dispatch("user/getUserById", userId.value).catch(console.log);

    const user = computed(() => $store.state.user.user);
    // let user = {
    //   username: "test",
    //   email: "test email",
    //   biography: "bio",
    //   follower: [],
    //   following: [],
    // };
    // let user = ref({ ...$store.state.signin.user });

    watch(userId, () => {
      $store
        .dispatch("user/getUserById", route.params.userId)
        .catch(console.log);
    });

    return {
      user,
      onSubmit() {
        console.log(user);
      },
      onReset() {
        console.log(user);
      },
    };
  },
};
</script>
