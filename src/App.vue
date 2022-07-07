<template>
  <v-app id="app">
    <div class="wrapper">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import AUTHENTICATION_ACTIONS from "@/store/modules/authentication/authentication-actions";
import REALTIMECOMMENT_ACTIONS from "@/store/modules/realtimeComment/realtimeComment-actions";
import { mapActions } from "vuex";
import Cookies from "js-cookie";
import Pusher from "pusher-js";
import { CookieService } from "@/services/CookieService.js";

export default {
  name: "App",

  data() {
    return {
      myPusher: null,
    };
  },

  methods: {
    ...mapActions({
      login: AUTHENTICATION_ACTIONS.login,
      changeCommentList: REALTIMECOMMENT_ACTIONS.changeCommentList,
    }),

    subscribe() {
      let pusher = new Pusher("d273b3db1a7815a83560", {
        cluster: "ap1",
        authEndpoint: process.env.VUE_APP_BASE_URL + "/broadcasting/auth",
        auth: {
          headers: CookieService.authHeader(),
        },
      });
      pusher.subscribe("private-channel-comment");
      pusher.connection.bind("state_change", (states) => {
        console.log(states);
      });
      pusher.bind("newComment", (data) => {
        this.changeCommentList(data.data);
      });

      this.myPusher = pusher;
    },
  },

  created() {
    const userInfo = JSON.parse(Cookies.get("userInfo"));

    if (userInfo) {
      this.login(userInfo);
    } else {
      this.$router.push("/login");
    }

    this.subscribe();
  },

  destroyed() {
    this.myPusher.unsubscribe("private-channel-comment");
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: Charlie Text, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.wrapper {
  height: 100%;
  z-index: 0;
}

.project-link {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
  margin-bottom: 20px;
  margin-top: 10px;
}

.v-application p {
  margin-bottom: 0px !important;
}
</style>
