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
              <q-btn color="warning" icon="cancel" label="Return" to="main" />
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { useStore } from "src/store";
export default {
  updated() {
    user = $store.getters.signin.getUser;
  },
  setup() {
    const $store = useStore();
    const router = useRouter();
    let user = ref({ ...$store.state.signin.user });

    return {
      user,
      label: ref("click"),
      onSubmit() {
        console.log(user.value);
        $store
          .dispatch("signin/updateProfile", user.value)
          .then(router.push("main"))
          .catch(console.log);
      },
    };
  },
};
</script>

<style></style>
