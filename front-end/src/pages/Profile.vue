<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <div class="row justify-center">
      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label overline>USER NAME</q-item-label>
            <q-item-label>
              {{ user.username }}
              <q-popup-edit v-model="user.username" auto-save v-slot="scope">
                <q-input
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label overline>EMAIL</q-item-label>
            <q-item-label>
              {{ user.email }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label overline>BIO</q-item-label>
            <q-item-label>
              {{ user.biography }}
              <q-popup-edit v-model="user.biography" auto-save v-slot="scope">
                <q-input
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-item-label>
          </q-item-section>
        </q-item>
        <div>
          <div class="col-6">
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label overline>Following</q-item-label>
                <q-item-label>
                  {{ user.following.length }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-6">
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label overline>Follower</q-item-label>
                <q-item-label>
                  {{ user.follower.length }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-list>
    </div>
    <div class="row justify-center">
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
  <vue-base-input></vue-base-input>
</template>

<script>
import { useStore } from "src/store";
import { ref } from "vue";

export default {
  setup() {
    const $store = useStore();
    // let user = ref($store.state.signin.user);
    let user = {
      username: "name",
      email: "test@sample.com",
      biography: "bio",
      follower: [],
      following: [],
    };
    return {
      user,
      label: ref("click"),
      onSubmit() {
        $store.dispatch("signin/updateProfile", user.value).catch(console.log);
      },
      onReset() {
        user = ref($store.state.signin.user);
        console.log(user);
      },
    };
  },
};
</script>
