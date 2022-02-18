<template>
  <div class="message-container">
    <h2>Datachannel message</h2>
    <h3>{{ textMessage }}</h3>
    <button @click="sendText">Send message</button>
  </div>
  <div class="row justify-evenly" id="app">
    <div class="col-4">
      <div class="row">
        <video id="localVideo" width="500" height="500"></video>
      </div>
      <div class="row justify-evenly">
        <button @click="startCamera">Start camera</button>
        <button @click="stopCamera">Stop camera</button>
      </div>
    </div>
    <div class="col-4">
      <video id="remoteVideo" width="500" height="500"></video>
      <button @click="stopRemoteCamera">Stop remote stream</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { join, signaling, send, socket } from "./Socket";
import NeatRTC from "neat-rtc";

export default {
  mounted() {
    // Setup NeatRTC
    const {
      connected,
      mediaStreamConnected,
      mediaStreamRemoved,
      datachannelOpen,
      datachannelMessage,
      datachannelError,
      datachannelClose,
      sendSignalingMessage,
      mediaStreamRemoteRemoved,
    } = this;
    console.log(this);
    const config = {
      devMode: true,
      videoIdLocal: "localVideo",
      videoIdRemote: "remoteVideo",
      connected: connected,
      mediaStreamConnected: mediaStreamConnected,
      mediaStreamRemoved: mediaStreamRemoved,
      mediaStreamRemoteRemoved: mediaStreamRemoteRemoved,
      datachannels: [
        {
          name: "text",
          callbacks: {
            open: datachannelOpen,
            message: datachannelMessage,
            error: datachannelError,
            close: datachannelClose,
          },
        },
      ],
    };
    this.rtc = new NeatRTC(config, sendSignalingMessage);
    console.log(this.rtc);
    // Socket.IO join messages from server
    join((message) => {
      const { clientCount } = message;
      if (clientCount === 2) {
        this.rtc.connect();
      }
    });
    // Socket.IO signaling messages from server
    signaling((message) => {
      this.rtc.handleSignaling(message);
    });
  },
  data() {
    return {
      rtc: null,
      textMessage: "...",
    };
  },
  methods: {
    sendSignalingMessage(message) {
      send("signaling", message);
    },
    connected() {
      console.log("connected");
    },
    mediaStreamConnected() {
      console.log("stream connected");
    },
    mediaStreamRemoved() {
      console.log("stream removed");
    },
    mediaStreamRemoteRemoved() {
      console.log("remote stream removed");
    },
    datachannelOpen(channel) {
      console.log("datachannel open:", channel);
    },
    datachannelMessage(channel, message) {
      console.log("datachannel message:", channel, message);
      this.textMessage = JSON.stringify(message);
    },
    datachannelError(channel) {
      console.log("datachannel error:", channel);
    },
    datachannelClose(channel) {
      console.log("datachannel close:", channel);
    },
    startCamera() {
      this.rtc.media("start");
    },
    stopCamera() {
      this.rtc.media("stop");
    },
    stopRemoteCamera() {
      this.rtc.media("stopRemote");
      console.log("1");
    },
    sendText() {
      // eslint-disable-next-line
      const time = new Date().toTimeString().slice(0, 8);
      this.rtc.send("text", { time });
    },
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* Custom styles */

.video {
  background: black;
}

.local-container button {
  display: inline-block;
  width: 49%;
  font-size: 18px;
  padding: 5px;
}

video {
  background: black;
}
</style>
