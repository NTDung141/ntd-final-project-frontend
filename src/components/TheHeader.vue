<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li
            v-for="routerItem in routerList"
            :key="routerItem.id"
            class="nav-item"
            @click="changeCurrentRoute(routerItem.to)"
          >
            <div v-if="currentRouteName === routerItem.to">
              <router-link class="nav-link active" :to="routerItem.to">
                {{ routerItem.name }}
              </router-link>
            </div>

            <div v-else>
              <router-link class="nav-link" :to="routerItem.to">
                {{ routerItem.name }}
              </router-link>
            </div>
          </li>
        </ul>

        <div v-if="!userInfo.email">
          <router-link class="btn btn-light my-2 my-sm-0 mr-2" to="/login">
            Sign in
          </router-link>

          <router-link
            class="btn btn-outline-light my-2 my-sm-0"
            to="/register"
          >
            Sign up
          </router-link>
        </div>

        <div v-if="userInfo.email" class="btn-group">
          <div
            class="header-avatar dropdown-toggle"
            :style="bgImg"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></div>

          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button">User Profile</button>
            <button class="dropdown-item" type="button" @click="onLogout()">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
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
      routerList: [
        {
          id: 1,
          name: "Home",
          to: "/",
        },
        {
          id: 2,
          name: "My project",
          to: "/my-project",
        },
      ],

      currentRouteName: this.$router.currentRoute.fullPath,

      bgImg: {
        backgroundImage: `url(${require("@/assets/defaultAvatar.jpg")})`,
      },
    };
  },

  methods: {
    ...mapActions({ logout: AUTHENTICATION_ACTIONS.logout }),

    changeCurrentRoute(newRoute) {
      this.currentRouteName = newRoute;
    },

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


<style>
.navbar {
  padding: 10px 20%;
}
.header-avatar {
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-size: cover;
}

.dropdown-menu-right {
  right: 0;
  left: auto;
}

.dropdown-toggle::after {
  display: none;
}
</style>