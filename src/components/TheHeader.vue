<template>
  <div>
    <v-toolbar class="my-toolbar">
      <span class="hidden-sm-and-up">
        <i class="fas fa-bars" @click="sidebar = !sidebar"></i>
      </span>

      <v-tabs class="hidden-xs-only">
        <v-tab v-for="item in menuItems" :key="item.title" :to="item.path">
          {{ item.title }}
        </v-tab>
      </v-tabs>

      <v-spacer></v-spacer>

      <div class="my-toolbar-action" v-if="!userInfo.email">
        <v-btn class="mr-2" depressed color="primary" to="/login">
          Sign in
        </v-btn>

        <v-btn depressed outlined color="primary" to="/register">
          Sign up
        </v-btn>
      </div>

      <div class="my-toolbar-action" v-if="userInfo.email">
        <div class="mr-5">
          <i class="far fa-bell fa-lg"></i>
        </div>

        <div class="text-center">
          <v-menu offset-y right>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar size="30" v-bind="attrs" v-on="on">
                <img src="@/assets/defaultAvatar2.jpg" />
              </v-avatar>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>User Profile</v-list-item-title>
              </v-list-item>

              <v-list-item @click="onLogout()">
                <v-list-item-title>Sign out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AUTHENTICATION_GETTERS from "@/store/modules/authentication/authentication-getters";
import AUTHENTICATION_ACTIONS from "@/store/modules/authentication/authentication-actions";
import { mapActions } from "vuex";
import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_API } from "@/factories/auth";

export default {
  name: "the-header",

  computed: {
    ...mapGetters({
      userInfo: AUTHENTICATION_GETTERS.userInfo,
    }),
  },

  data() {
    return {
      menuItems: [
        { title: "Home", path: "/" },
        { title: "My project", path: "/my-project" },
      ],

      sideBar: true,

      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
    };
  },

  methods: {
    ...mapActions({ logout: AUTHENTICATION_ACTIONS.logout }),

    onLogout() {
      const accessToken = Cookies.get("accessToken");

      if (accessToken) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        axios
          .post(AUTH_API.logoutApi, null, { headers: headers })
          .then((res) => {
            if (res) {
              this.logout();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      Cookies.remove("accessToken");
      Cookies.remove("userInfo");
      this.$router.push("/login");
    },
  },
};
</script>


<style scoped>
.my-toolbar {
  padding: 0px 20%;
}

.my-toolbar-action {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 767.98px) {
  .my-toolbar {
    padding: 0px;
  }
}
</style>