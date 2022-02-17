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
          <q-btn
            round
            flat
            icon="close"
            @click="leaveSession()"
            href="/#/main"
          />
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
              v-for="(User, index) in connecUsers"
              :key="index"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar>
                  <!-- 수정사항 -->
                  <img
                    :src="User.clientImg"
                    alt="profile-image"
                    class="profile q-mb-sm"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ User.clientData }}
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
          <q-form class="full-width">
            <q-input
              rounded
              outlined
              dense
              class="WAL__field col-grow q-mr-sm"
              bg-color="white"
              v-model="message"
              placeholder="Type a message"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="sendMessage()" />
              </template>
            </q-input>
          </q-form>
          <q-btn round flat icon="mic" @click="checkMessage()" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, computed, watch } from "vue";
import { useStore } from "src/store";
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
// import UserVideo from "src/components/UserVideo";
import { faker } from "https://cdn.skypack.dev/@faker-js/faker";

axios.defaults.headers.post["Content-Type"] = "application/json";

const OPENVIDU_SERVER_URL = "https://" + location.hostname + ":5443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

export default {
  name: "WhatsappLayout",

  data() {
    return {
      OV: undefined,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      isVideo: true,
      isAudio: true,

      myName: faker.name.findName(),
      myImg: faker.image.avatar(),
      myConnectionId: "",
      mySessionId: "SessionA",
      myUserName: faker.name.findName(),
    };
  },
  computed: {
    connecUsers() {
      let users = [];
      this.session.remoteConnections.forEach((element) => {
        console.log(element);

        if (!element) return;
        users.push(JSON.parse(element.data));
      });
      console.log("aa");
      return users;
    },
  },
  setup() {
    const $store = useStore();

    const $q = useQuasar();

    const leftDrawerOpen = ref(false);
    const search = ref("");
    const message = ref("");
    const currentConversationIndex = ref(0);

    const userName = ref("");

    const style = computed(() => ({
      height: $q.screen.height + "px",
    }));

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    function setCurrentConversation(index) {
      currentConversationIndex.value = index;
    }

    return {
      userName,
      // follows,

      leftDrawerOpen,
      search,
      message,
      // currentConversationIndex,

      // currentConversation,
      // setCurrentConversation,
      style,

      toggleLeftDrawer,
    };
  },
  methods: {
    updateMainVideoStreamManager(stream) {
      if (this.mainStreamManager === stream) return;
      this.mainStreamManager = stream;
    },

    videoToggle() {
      this.isVideo = !this.isVideo;
      this.publisher.publishVideo(this.isVideo);
      // this.subscriber.subscribeToVideo(this.isVideo);
    },

    audioToggle() {
      this.isAudio = !this.isAudio;
      this.publisher.publishAudio(this.isAudio);
      // this.subscriber.subscribeToAudio(this.isAudio);
    },

    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
     *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
     *   3) The Connection.token must be consumed in Session.connect() method
     */

    getToken(mySessionId) {
      return this.createSession(mySessionId).then((sessionId) =>
        this.createToken(sessionId)
      );
    },

    // See https://docs.openvidu.io/en/stable/reference-docs/REST-API/#post-session
    createSession(sessionId) {
      return new Promise((resolve, reject) => {
        console.log(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`);

        axios
          .post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
            JSON.stringify({
              customSessionId: sessionId,
            }),
            {
              auth: {
                username: "OPENVIDUAPP",
                password: OPENVIDU_SERVER_SECRET,
              },
            }
          )
          .then((response) => response.data)
          .then((data) => resolve(data.id))
          .catch((error) => {
            if (error.response.status === 409) {
              resolve(sessionId);
            } else {
              console.warn(
                `No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL}`
              );
              if (
                window.confirm(
                  `No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL}\n\nClick OK to navigate and accept it. If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${OPENVIDU_SERVER_URL}"`
                )
              ) {
                location.assign(`${OPENVIDU_SERVER_URL}/accept-certificate`);
              }
              reject(error.response);
            }
          });
      });
    },

    // See https://docs.openvidu.io/en/stable/reference-docs/REST-API/#post-connection
    createToken(sessionId) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
            {},
            {
              auth: {
                username: "OPENVIDUAPP",
                password: OPENVIDU_SERVER_SECRET,
              },
            }
          )
          .then((response) => response.data)
          .then((data) => resolve(data.token))
          .catch((error) => reject(error.response));
      });
    },
    sendMessage() {
      this.session
        .signal({
          data: this.message, // Any string (optional)
          to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: "my-chat", // The type of message (optional)
        })
        .then((res) => {})
        .catch((error) => {
          console.error(error);
        });
      console.log("this.session");
      console.log(this.session);
      console.log("this.session.remoteConnections");
      console.log(this.session.remoteConnections);
    },
  },
  created() {
    // --- Get an OpenVidu object ---
    this.OV = new OpenVidu();

    // --- Init a session ---
    this.session = this.OV.initSession();

    // --- Specify the actions when events take place in the session ---

    // On every new Stream received...
    this.session.on("streamCreated", ({ stream }) => {
      const subscriber = this.session.subscribe(stream);
      this.subscribers.push(subscriber);
    });

    // On every Stream destroyed...
    this.session.on("streamDestroyed", ({ stream }) => {
      const index = this.subscribers.indexOf(stream.streamManager, 0);
      if (index >= 0) {
        this.subscribers.splice(index, 1);
      }
    });

    // On every asynchronous exception...
    this.session.on("exception", ({ exception }) => {
      console.warn(exception);
    });
    // --- Connect to the session with a valid user token ---

    // 'getToken' method is simulating what your server-side should do.
    // 'token' parameter should be retrieved and returned by your own backend
    this.getToken(this.mySessionId).then((token) => {
      console.log(token);
      this.session
        .connect(token, { clientData: this.myUserName, clientImg: this.myImg })
        .then(() => {
          // --- Get your own camera stream with the desired properties ---

          let publisher = this.OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: false, // Whether you want to start publishing with your video enabled or not
            // resolution: "640x480", // The resolution of your video
            // frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          this.mainStreamManager = publisher;
          this.publisher = publisher;

          // --- Publish your stream ---

          this.session.publish(this.publisher);
          console.log("this.session.connection.connectionId");

          this.myConnectionId = this.session.connection.connectionId;
          console.log(this.session.connection.connectionId);
          console.log(this.myName);
          this.$store.commit("main/setMyconnectionId", {
            myConnectionId: this.session.connection.connectionId,
            myFakerName: this.myUserName,
            myImg: this.myImg,
          });
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });

    window.addEventListener("beforeunload", this.leaveSession);

    const $store = useStore();

    this.session.on("signal", (event) => {
      const newMessage = event.data;

      let connectionId = event.from.connectionId;
      const chatData = {
        connectionId: connectionId,
        newMessage: newMessage,
        img: JSON.parse(event.from.data)["clientImg"],
      };
      this.$store.commit("main/setChatting", chatData);
    });
  },
  unmounted() {
    // --- Leave the session by calling 'disconnect' method over the Session object ---
    if (this.session) this.session.disconnect();

    this.session = undefined;
    this.mainStreamManager = undefined;
    this.publisher = undefined;
    this.subscribers = [];
    this.OV = undefined;

    window.removeEventListener("beforeunload", this.leaveSession);
  },
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
