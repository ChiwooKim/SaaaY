<template>
  <div class="WAL position-relative bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="WAL__drawer-open q-mr-sm"
            @click="toggleLeftDrawer"
          />

          <q-btn round flat>
            <q-avatar>
              <!-- 수정사항 -->
              <img
                src="images/blank-profile-picture.png"
                alt="profile-image"
                class="profile q-mb-sm"
              />-->
            </q-avatar>
          </q-btn>

          <span class="q-subtitle-1 q-pl-md">
            {{ userName }}
          </span>

          <q-space />

          <q-btn round flat icon="search" />
          <q-btn round flat>
            <q-icon name="attachment" class="rotate-135" />
          </q-btn>
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 0]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>Contact data</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Block</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Select messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Silence</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Clear messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Erase messages</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat icon="close" href="/#/main" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :breakpoint="690"
      >
        <q-toolbar class="bg-grey-3">
          <q-avatar class="cursor-pointer">
            <q-icon name="img:images/logo.png" size="50px" />
          </q-avatar>

          <q-space />

          <q-btn round flat icon="message" />
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 8]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>New group</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Archived</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Favorites</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn
            round
            flat
            icon="close"
            class="WAL__drawer-close"
            @click="toggleLeftDrawer"
          />
        </q-toolbar>

        <q-toolbar class="bg-grey-2">
          <q-input
            rounded
            outlined
            dense
            class="WAL__field full-width"
            bg-color="white"
            v-model="search"
            placeholder="Search or start a new conversation"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>

        <q-scroll-area style="height: calc(100% - 100px)">
          <q-list>
            <q-item
              v-for="(follow, index) in follows"
              :key="index"
              clickable
              v-ripple
              @click="setCurrentConversation(index)"
            >
              <q-item-section avatar>
                <q-avatar>
                  <!-- 수정사항 -->
                  <img
                    src="images/blank-profile-picture.png"
                    alt="profile-image"
                    class="profile q-mb-sm"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ follow._fields[0].properties.username }}
                </q-item-label>
                <q-item-label class="conversation__summary" caption>
                  <!-- 삭제 -->
                  <!-- <q-icon name="check" v-if="conversation.sent" />
                  <q-icon name="not_interested" v-if="conversation.deleted" />
                  {{ conversation.caption }} -->
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  <!-- 삭제 -->
                  <!-- {{ conversation.time }} -->
                </q-item-label>
                <q-icon name="keyboard_arrow_down" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="bg-grey-2">
        <router-view />
      </q-page-container>

      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
          <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
          <q-input
            rounded
            outlined
            dense
            class="WAL__field col-grow q-mr-sm"
            bg-color="white"
            v-model="message"
            placeholder="Type a message"
          />
          <q-btn round flat icon="mic" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, computed, watch } from "vue";
import { useStore } from "src/store";

export default {
  name: "WhatsappLayout",

  setup() {
    const $store = useStore();

    $store.dispatch("account/getFollowerList", 1).catch(console.log);
    $store.dispatch("account/getFollowingList", 1).catch(console.log);

    const follows = computed(() =>
      Object.assign(
        {},
        $store.state.account.followers,
        $store.state.account.followings
      )
    );

    const $q = useQuasar();

    const leftDrawerOpen = ref(false);
    const search = ref("");
    const message = ref("");
    const currentConversationIndex = ref(0);

    const userName = ref("");
    const currentConversation = computed(() => {
      return Object.assign(
        {},
        $store.state.account.followers,
        $store.state.account.followings
      )[currentConversationIndex.value]._fields[0].properties.username;
    });

    const style = computed(() => ({
      height: $q.screen.height + "px",
    }));

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    function setCurrentConversation(index) {
      currentConversationIndex.value = index;
      console.log(index);
    }
    watch(currentConversationIndex, () => {
      userName.value = Object.assign(
        {},
        $store.state.account.followers,
        $store.state.account.followings
      )[currentConversationIndex.value]._fields[0].properties.username;
    });
    return {
      userName,
      follows,

      leftDrawerOpen,
      search,
      message,
      currentConversationIndex,

      currentConversation,
      setCurrentConversation,
      style,

      toggleLeftDrawer,
    };
  },
  created() {},
};
</script>

<style lang="scss">
.WAL {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;

  &:before {
    content: "";
    height: 127px;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #eee;
  }

  &__layout {
    margin: 0 auto;
    z-index: 4000;
    height: 100%;
    width: 90%;
    max-width: 950px;
    border-radius: 5px;
  }

  &__field.q-field--outlined .q-field__control:before {
    border: none;
  }

  .q-drawer--standard {
    .WAL__drawer-close {
      display: none;
    }
  }
}

@media (max-width: 850px) {
  .WAL {
    padding: 0;
    &__layout {
      width: 100%;
      border-radius: 0;
    }
  }
}
@media (min-width: 691px) {
  .WAL {
    &__drawer-open {
      display: none;
    }
  }
}
.conversation__summary {
  margin-top: 4px;
}
.conversation__more {
  margin-top: 0 !important;
  font-size: 1.4rem;
}
</style>
