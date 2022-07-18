<template>
  <div class="my-header">
    <v-toolbar class="my-toolbar">
      <span class="hidden-sm-and-up">
        <i class="fas fa-bars" @click="sidebar = !sidebar"></i>
      </span>

      <v-tabs class="hidden-xs-only">
        <v-tab to="/"> Home </v-tab>
        <v-tab to="/my-project" v-if="userInfo.email"> My project </v-tab>
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
          <v-menu offset-y left>
            <template v-slot:activator="{ on, attrs }">
              <v-badge
                :color="numberOfNotification > 0 ? 'red' : 'white'"
                :content="numberOfNotification"
              >
                <i
                  class="far fa-bell fa-lg"
                  v-bind="attrs"
                  v-on="on"
                  @click="seenNotification"
                ></i>
              </v-badge>
            </template>

            <NotificationList />
          </v-menu>
        </div>

        <div class="text-center">
          <v-menu offset-y left>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar size="30" v-bind="attrs" v-on="on">
                <img src="@/assets/defaultAvatar2.jpg" />
              </v-avatar>
            </template>
            <v-list>
              <v-list-item @click="goToMyProfile">
                <v-list-item-title>My Profile</v-list-item-title>
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
import NotificationList from "@/components/NotificationList.vue";
import NOTIFICATION_GETTERS from "@/store/modules/notification/notification-getters";
import NOTIFICATION_ACTIONS from "@/store/modules/notification/notification-actions";

export default {
  name: "the-header",

  components: {
    NotificationList,
  },

  computed: {
    ...mapGetters({
      userInfo: AUTHENTICATION_GETTERS.userInfo,
      numberOfNotification: NOTIFICATION_GETTERS.numberOfNotification,
    }),
  },

  data() {
    return {
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
    ...mapActions({
      logout: AUTHENTICATION_ACTIONS.logout,
      changeNumberOfNotification:
        NOTIFICATION_ACTIONS.changeNumberOfNotification,
    }),

    onLogout() {
      const accessToken = Cookies.get("accessToken");

      Cookies.remove("accessToken");
      Cookies.remove("userInfo");
      this.$router.push("/login");
      this.logout();

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
            if (err) {
              this.logout();
            }
          });
      }
    },

    goToMyProfile() {
      this.$router.push("/my-profile");
    },

    seenNotification() {
      this.changeNumberOfNotification(0);
    },
  },
};
</script>


<style scoped>
.my-header {
  z-index: 10;
}
.my-toolbar {
  padding: 0px 20%;
  z-index: 10;
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