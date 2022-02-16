<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-8 offset-2">
        <div v-for="(own, index) in owner" :key="`onwer-${index}`">
          <div class="row">
            <div class="col-xl-2 col-lg-3 col-md-4">
              <img
                src="images/blank-profile-picture.png"
                alt="profile-image"
                class="profile q-mb-sm q-px-xl"
              />
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 column justify-center">
              <div class="column items-center">
                <div class="text-bold text-h5">{{ ownerFollower.length }}</div>
                <div class="text-grey">followers</div>
              </div>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 column justify-center">
              <div class="column items-center">
                <div class="text-bold text-h5">{{ ownerFollowing.length }}</div>
                <div class="text-grey">followings</div>
              </div>
            </div>
          </div>
          <div class="row q-mb-lg">
            <div class="col-xl-2 col-lg-3 col-md-4 column items-center">
              <div class="text-bold">
                {{ own._fields[0].properties.username }}
              </div>
              <div class="text-grey">
                {{ own._fields[0].properties.email }}
              </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-6 column justify-center">
              <q-btn
                v-if="
                  myId &&
                  myFollowing.includes(own._fields[0].identity.low) &&
                  own._fields[0].identity.low != myId
                "
                @click="deleteMyFollowingList(own._fields[0].identity.low)"
                unelevated
                outline
                color="primary"
                label="FOLLOWING"
              />
              <q-btn
                v-else-if="
                  myId &&
                  !myFollowing.includes(own._fields[0].identity.low) &&
                  own._fields[0].identity.low != myId
                "
                @click="addMyFollowingList(own._fields[0].identity.low)"
                unelevated
                color="primary"
                label="FOLLOW"
              />
            </div>
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
              <div v-if="followers[0]">
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
                          @click="
                            newFollowers(follower._fields[0].identity.low)
                          "
                        >
                          {{ follower._fields[0].properties.username }}
                        </div>
                        <div
                          class="q-ml-lg"
                          v-if="
                            myFollower.includes(
                              follower._fields[0].identity.low
                            )
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
                          deleteMyFollowingList(
                            follower._fields[0].identity.low
                          )
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
              </div>
              <div v-else class="q-my-lg text-grey text-center">
                no followers
              </div>
            </q-tab-panel>

            <q-tab-panel name="following">
              <div v-if="followings[0]">
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
                            myFollower.includes(
                              following._fields[0].identity.low
                            )
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
                          deleteMyFollowingList(
                            following._fields[0].identity.low
                          )
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
              </div>
              <div v-else class="q-my-lg text-grey text-center">
                no following
              </div>
            </q-tab-panel>

            <q-tab-panel name="blocklist">
              <div v-if="blockList[0]">
                <div
                  v-for="(block, index) in blockList"
                  :key="`block-${index}`"
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
                        v-if="
                          blockListId.includes(block._fields[0].identity.low)
                        "
                        @click="
                          deleteMyBlockList(block._fields[0].identity.low)
                        "
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
              </div>
              <div v-else class="q-my-lg text-grey text-center">
                no blocklist
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
    // let targetId = route.params.targetId;
    const targetId = computed(() => route.params.targetId);
    let myId;
    myId = "";
    // let accessToken: string;
    // accessToken = '';
    // const cookies = document.cookie.split('; ');
    // for (const cookie of cookies) {
    //   const data = cookie.split('=');
    //   if (data[0] === 'access_token') {
    //     accessToken = data[1];
    //   }
    // }
    const accessToken = "Bearer " + Cookies.get("access_token");
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
    if (+targetId.value === +myId) {
      $store
        .dispatch("account/getBlockList", {
          targetId: route.params.targetId,
          accessToken,
        })
        .catch(console.log);
    }

    // onUpdated(() => {
    //   // targetId = route.params.targetId;
    //   // $store
    //   //   .dispatch('account/getOwner', route.params.targetId)
    //   //   .catch(console.log);
    //   $store
    //     .dispatch('account/getFollowerList', route.params.targetId)
    //     .catch(console.log);
    //   $store
    //     .dispatch('account/getFollowingList', route.params.targetId)
    //     .catch(console.log);
    //   $store
    //     .dispatch('account/getBlockList', route.params.targetId)
    //     .catch(console.log);
    //   // console.log('aa');
    // });

    const addMyFollowingList = (targetId) =>
      $store.dispatch("account/addMyFollowingList", {
        targetId,
        accessToken,
        ownerId: owner.value[0]._fields[0].identity.low,
        myId,
      });

    const deleteMyFollowingList = (targetId) =>
      $store.dispatch("account/deleteMyFollowingList", {
        targetId,
        accessToken,
        ownerId: owner.value[0]._fields[0].identity.low,
        myId,
      });

    const addMyBlockList = (targetId) =>
      $store.dispatch("account/addMyBlockList", { targetId, accessToken });

    const deleteMyBlockList = (targetId) =>
      $store.dispatch("account/deleteMyBlockList", { targetId, accessToken });

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
    const ownerFollower = computed(() => $store.state.account.ownerFollower);
    const ownerFollowing = computed(() => $store.state.account.ownerFollowing);

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
      ownerFollower,
      ownerFollowing,
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
