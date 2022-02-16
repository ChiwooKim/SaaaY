<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 300px; height: 485px">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Registration</h4>
            <div
              class="absolute-bottom-right q-pr-md"
              style="transform: translateY(50%)"
            >
              <q-btn fab icon="close" color="purple-4" @click="onReset" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl q-pb-lg">
              <q-input
                square
                clearable
                v-model="email"
                type="email"
                label="Email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="username"
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
                v-model="password"
                type="password"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              color="purple-4"
              class="full-width text-white"
              label="Get Started"
              @click="onSubmit"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p @click="onReturn" class="text-grey-6 cursor-pointer">
              Return to login
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
export default {
  name: "Login",
  setup() {
    const email = ref(null);
    const username = ref(null);
    const password = ref(null);
    const router = useRouter();
    return {
      email,
      username,
      password,
      onReset() {
        console.log("reset");
        email.value = null;
        username.value = null;
        password.value = null;
      },
      onSubmit() {
        const user = {
          email: email.value,
          username: username.value,
          password: password.value,
        };
        api.post("/user/signup", user).then(() => {
          router.push("/main");
        });
        console.log("submit");
      },
      onReturn() {
        router.push("/main");
      },
    };
  },
};
</script>

<style></style>
