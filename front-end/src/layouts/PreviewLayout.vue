<template>
  <q-layout view="hHh LpR fFf" class="bg-grey-1">
    <q-header
      reveal
      elevated
      class="bg-white text-grey-8 q-py-xs"
      height-hint="58"
    >
      <q-toolbar>
        <!-- 왼쪽 로고 -->
        <q-btn flat no-caps no-wrap class="q-ml-xs" href="/">
          <q-icon name="img:images/logo.png" size="50px" />
          <q-toolbar-title shrink class="text-weight-bold">
            Say
          </q-toolbar-title>
        </q-btn>

        <!-- 가운데 스페이스 -->
        <q-space />
        <q-space />

        <!-- 오른쪽 아이콘 -->
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="video_call"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Create a video or post</q-tooltip>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="apps"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="message"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Messages</q-tooltip>
          </q-btn>

          <q-btn v-if="logIn === 'signin'" round flat href="/#/signin">
            <q-avatar size="26px">
              <img src="images/blank-profile-picture.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
          <q-btn v-else round flat href="/#/main">
            <q-avatar size="26px">
              <img src="images/blank-profile-picture.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "src/store";

export default defineComponent({
  name: "MyLayout",
  setup() {
    const $store = useStore();

    const logIn = computed(() => {
      return $store.state.signin.message;
    });
    return { logIn };
  },
});
</script>

<style lang="scss">
.YL {
  &__toolbar-input-container {
    min-width: 100px;
    width: 55%;
  }
  &__toolbar-input-btn {
    border-radius: 0;
    border-style: solid;
    border-width: 1px 1px 1px 0;
    border-color: rgba(0, 0, 0, 0.24);
    max-width: 60px;
    width: 100%;
  }
  &__drawer-footer-link {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.75rem;
    &:hover {
      color: #000;
    }
  }
}
</style>
