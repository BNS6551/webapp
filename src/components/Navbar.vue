<script>
import { connectMetamask, getAccount, getIsConnected } from "../assets/interface_request.js";
import { ethers } from "ethers";
export default {
  data() {
    return {
      connected: getIsConnected(),
      account: getAccount(),
    };
  },
  methods: {
    connectOnClick: function () {
      if (this.connected) {
        return;
      }
      connectMetamask().then((success) => {
        if (success) {
          console.log("metamask successfully connected!");
        } else {
          console.log("metamask connection failed!");
        }
      });
    },
  },
};
</script>

<template>
  <div class="container">
    <nav class="uk-navbar-container">
      <div class="uk-container">
        <div uk-navbar>
          <div class="uk-navbar-left">
            <a class="uk-navbar-item uk-logo" href="#">BNS6551</a>
          </div>

          <div class="uk-navbar-right">
            <div class="uk-navbar-item">
              <button v-if="!connected" class="uk-button uk-button-primary" @click="connectOnClick">
                connect
              </button>
              <button v-else class="uk-button uk-button-primary" @click="connectOnClick">
                {{ account.address }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<style scoped>
.uk-logo {
  font-family: "Jost", sans-serif;
  /*background: -webkit-linear-gradient(#1cff60, #89f9ff);*/
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
  background: linear-gradient(
    to right,
    #7953cd 20%,
    #00affa 30%,
    #0190cd 70%,
    #764ada 80%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  background-size: 500% auto;
  animation: textShine 5s ease-in-out infinite alternate;
}
@keyframes textShine {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
.uk-button-primary {
  border-radius: 20px;
}
</style>
