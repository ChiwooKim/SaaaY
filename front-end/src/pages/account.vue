<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-8 offset-2">
        <div v-for="(own, index) in owner" :key="`onwer-${index}`">
          <div class="row justify-center">
            <div class="col-1">
              <img
                src="images/blank-profile-picture.png"
                alt="profile-image"
                class="profile q-mb-sm"
              />
            </div>
          </div>
          <div class="flex justify-center">
            <div class="offset-1 text-bold">
              {{ own._fields[0].properties.username }}
            </div>
          </div>
          <div class="flex justify-center text-grey q-mb-md">
            <div class="offset-1">@{{ own._fields[0].properties.email }}</div>
          </div>
        </div>
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="followers" label="Followers" />
            <q-tab name="following" label="Following" />
            <q-tab name="blocklist" label="BlockList" v-if="targetId == myId" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="followers">
              <div
                v-for="(follower, index) in followers"
                :key="`follower-${index}`"
              >
                <div class="row">
                  <div class="col-1 row">
                    <div class="col-8 offset-2">
                      <img
                        src="images/blank-profile-picture.png"
                        alt="profile-image"
                        class="profile q-mb-sm"
                      />
                    </div>
                  </div>
                  <div class="col-9 q-pl-lg row">
                    <div class="col-12 row flex items-end">
                      <div
                        class="text-h5 name"
                        @click="newFollowers(follower._fields[0].identity.low)"
                      >
                        {{ follower._fields[0].properties.username }}
                      </div>
                      <div
                        class="q-ml-lg"
                        v-if="
                          myFollower.includes(follower._fields[0].identity.low)
                        "
                      >
                        Follows You
                      </div>
                    </div>
                    <p>
                      {{ follower._fields[0].properties.biography }}
                    </p>
                  </div>
                  <div class="col-2 flex flex-center">
                    <q-btn
                      v-if="
                        myId &&
                        myFollowing.includes(
                          follower._fields[0].identity.low
                        ) &&
                        follower._fields[0].identity.low != myId
                      "
                      @click="
                        deleteMyFollowingList(follower._fields[0].identity.low)
                      "
                      outline
                      rounded
                      color="primary"
                      label="FOLLOWING"
                    />
                    <q-btn
                      v-else-if="
                        myId &&
                        !myFollowing.includes(
                          follower._fields[0].identity.low
                        ) &&
                        follower._fields[0].identity.low != myId
                      "
                      @click="
                        addMyFollowingList(follower._fields[0].identity.low)
                      "
                      unelevated
                      rounded
                      color="primary"
                      label="FOLLOW"
                    />
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="following">
              <div
                v-for="(following, index) in followings"
                :key="`following-${index}`"
              >
                <div class="row">
                  <div class="col-1 row">
                    <div class="col-8 offset-2">
                      <img
                        src="images/blank-profile-picture.png"
                        alt="profile-image"
                        class="profile q-mb-sm"
                      />
                    </div>
                  </div>
                  <div class="col-9 q-pl-lg row">
                    <div class="col-12 row flex items-end">
                      <div
                        class="text-h5 name"
                        @click="
                          newFollowings(following._fields[0].identity.low)
                        "
                      >
                        {{ following._fields[0].properties.username }}
                      </div>
                      <div
                        class="q-ml-lg"
                        v-if="
                          myFollower.includes(following._fields[0].identity.low)
                        "
                      >
                        Follows You
                      </div>
                    </div>
                    <p>
                      {{ following._fields[0].properties.biography }}
                    </p>
                  </div>
                  <div class="col-2 flex flex-center">
                    <q-btn
                      v-if="
                        myId &&
                        myFollowing.includes(
                          following._fields[0].identity.low
                        ) &&
                        following._fields[0].identity.low != myId
                      "
                      @click="
                        deleteMyFollowingList(following._fields[0].identity.low)
                      "
                      outline
                      rounded
                      color="primary"
                      label="FOLLOWING"
                    />
                    <q-btn
                      v-else-if="
                        myId &&
                        !myFollowing.includes(
                          following._fields[0].identity.low
                        ) &&
                        following._fields[0].identity.low != myId
                      "
                      @click="
                        addMyFollowingList(following._fields[0].identity.low)
                      "
                      unelevated
                      rounded
                      color="primary"
                      label="FOLLOW"
                    />
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="blocklist">
              <div v-for="(block, index) in blockList" :key="`block-${index}`">
                <div class="row">
                  <div class="col-1 row">
                    <div class="col-8 offset-2">
                      <img
                        src="images/blank-profile-picture.png"
                        alt="profile-image"
                        class="profile q-mb-sm"
                      />
                    </div>
                  </div>
                  <div class="col-9 q-pl-lg row">
                    <div class="col-12 row flex items-end">
                      <div class="text-h5">
                        {{ block._fields[0].properties.username }}
                      </div>
                    </div>
                    <p>
                      {{ block._fields[0].properties.biography }}
                    </p>
                  </div>
                  <div class="col-2 flex flex-center">
                    <q-btn
                      v-if="blockListId.includes(block._fields[0].identity.low)"
                      @click="deleteMyBlockList(block._fields[0].identity.low)"
                      unelevated
                      rounded
                      color="red"
                      label="BLOCKED"
                    />
                    <q-btn
                      v-else
                      @click="addMyBlockList(block._fields[0].identity.low)"
                      outline
                      rounded
                      color="red"
                      label="BLOCK"
                    />
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "src/store";
import { Cookies } from "quasar";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $store = useStore();

    const targetId = computed(() => route.params.targetId);
    let myId;
    myId = "";

    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const data = JSON.parse(jsonPayload);
      myId = data.id;
    }

    if (myId) {
      $store.dispatch("account/myFollower", myId).catch(console.log);
      $store.dispatch("account/myFollowing", myId).catch(console.log);
      console.log("a");
    }

    $store
      .dispatch("account/getOwner", route.params.targetId)
      .catch(console.log);
    $store
      .dispatch("account/getFollowerList", route.params.targetId)
      .catch(console.log);
    $store
      .dispatch("account/getFollowingList", route.params.targetId)
      .catch(console.log);

    if (targetId.value === myId) {
      $store
        .dispatch("account/getBlockList", {
          targetId: route.params.targetId,
          accessToken,
        })
        .catch(console.log);
    }

    const addMyFollowingList = (targetId) =>
      $store.dispatch("account/addMyFollowingList", {
        targetId,
        accessToken,
      });

    const deleteMyFollowingList = (targetId) =>
      $store.dispatch("account/deleteMyFollowingList", {
        targetId,
        accessToken,
      });

    const addMyBlockList = (targetId) =>
      $store.dispatch("account/addMyBlockList", { targetId, accessToken });

    const deleteMyBlockList = (targetId) =>
      $store.dispatch("account/deleteMyBlockList", {
        targetId,
        accessToken,
      });

    const newFollowers = async (newId) => {
      await router.push(`${newId}`);
    };

    const newFollowings = async (newId) => {
      await router.push(`${newId}`);
    };

    // onUpdated(() => router.go(0));
    const owner = computed(() => $store.state.account.owner);
    const myFollower = computed(() => $store.state.account.myFollower);
    const myFollowing = computed(() => $store.state.account.myFollowing);
    const followers = computed(() => $store.state.account.followers);
    const followings = computed(() => $store.state.account.followings);
    const blockList = computed(() => $store.state.account.blockList);
    const blockListId = computed(() => $store.state.account.blockListId);

    watch(targetId, () => {
      $store
        .dispatch("account/getOwner", route.params.targetId)
        .catch(console.log);
      $store
        .dispatch("account/getFollowerList", route.params.targetId)
        .catch(console.log);
      $store
        .dispatch("account/getFollowingList", route.params.targetId)
        .catch(console.log);
      if (+targetId.value === +myId) {
        $store
          .dispatch("account/getBlockList", {
            targetId: route.params.targetId,
            accessToken,
          })
          .catch(console.log);
      }
    });

    return {
      tab: ref("followers"),
      owner,
      myId,
      targetId,
      myFollower,
      myFollowing,
      followers,
      followings,
      blockList,
      blockListId,
      addMyFollowingList,
      deleteMyFollowingList,
      addMyBlockList,
      deleteMyBlockList,
      newFollowers,
      newFollowings,
    };
  },
};
</script>

<style scoped>
.profile {
  border-radius: 100%;
  width: 100%;
  height: auto;
  overflow: hidden;
}

.name {
  cursor: pointer;
}
</style>
