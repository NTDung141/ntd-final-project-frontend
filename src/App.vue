<template>
  <div id="app">
    <TheHeader />

    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import AUTHENTICATION_ACTIONS from "@/store/modules/authentication/authentication-actions";
import { mapActions } from "vuex";
import Cookies from "js-cookie";
// import TheSideBar from "@/components/TheSideBar.vue";

export default {
  name: "App",

  components: {
    TheHeader,
    // TheSideBar,
  },

  methods: {
    ...mapActions({ login: AUTHENTICATION_ACTIONS.login }),
  },

  beforeMount() {
    const userInfo = Cookies.get("userInfo");

    if (userInfo) {
      this.login(JSON.parse(userInfo));
    } else {
      const currentRouteName = this.$router.currentRoute.fullPath;

      if (currentRouteName !== "/login" && currentRouteName !== "/register") {
        this.$router.push("/login");
      }
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
