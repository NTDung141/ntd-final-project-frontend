<template>
  <v-app id="app">
    <TheHeader />

    <div class="wrapper">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import AUTHENTICATION_ACTIONS from "@/store/modules/authentication/authentication-actions";
import { mapActions } from "vuex";
import Cookies from "js-cookie";

export default {
  name: "App",

  components: {
    TheHeader,
  },

  methods: {
    ...mapActions({ login: AUTHENTICATION_ACTIONS.login }),
  },

  created() {
    const userInfo = JSON.parse(Cookies.get("userInfo"));

    if (userInfo) {
      this.login(userInfo);
    } else {
      this.$router.push("/login");
    }
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
}
</style>
