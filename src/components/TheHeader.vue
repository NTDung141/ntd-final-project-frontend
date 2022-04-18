<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
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
            @click="changeCurrentRoute(routerItem.to)"
          >
            <div
              class="nav-item nav-link-active"
              v-if="currentRouteName === routerItem.to"
            >
              <router-link class="nav-link" :to="routerItem.to">
                {{ routerItem.name }}
              </router-link>
            </div>

            <div class="nav-item" v-else>
              <router-link class="nav-link" :to="routerItem.to">
                {{ routerItem.name }}
              </router-link>
            </div>
          </li>
        </ul>

        <div v-if="!userInfo.email">
          <router-link
            class="btn btn-dark my-2 my-sm-0 mr-2"
            to="/login"
            @click.native="changeCurrentRoute('/login')"
          >
            Sign in
          </router-link>

          <router-link
            class="btn btn-outline-dark my-2 my-sm-0"
            to="/register"
            @click.native="changeCurrentRoute('/register')"
          >
            Sign up
          </router-link>
        </div>

        <div v-if="userInfo.email" class="btn-group">
          <div class="mr-3">
            <i class="fa fa-bell fa-lg" aria-hidden="true"></i>
          </div>

          <div
            class="header-avatar dropdown-toggle"
            :style="bgImg"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></div>

          <div class="dropdown-menu dropdown-menu-right">
            <div class="dropdown-item" type="button">User Profile</div>
            <div class="dropdown-item" type="button" @click="onLogout()">
              Sign out
            </div>
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
        backgroundImage: `url(${require("@/assets/defaultAvatar2.jpg")})`,
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


<style scoped>
.navbar {
  padding: 0px 20%;
  background-color: #fff;
  min-height: 60px;
}

.navbar::after {
  content: "";
  position: absolute;
  left: 0px;
  right: 0px;
  top: 100%;
  height: 4px;
  background: linear-gradient(
    rgba(9, 30, 66, 0.13) 0px,
    rgba(9, 30, 66, 0.13) 1px,
    rgba(9, 30, 66, 0.08) 1px,
    rgba(9, 30, 66, 0) 4px
  );
}

.navbar-nav {
  min-height: 60px;
}

.nav-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.nav-link-active {
  color: #343a40 !important;
  font-weight: 600;
}

.nav-link-active::after {
  position: absolute;
  bottom: 0px;
  left: 4px;
  right: 4px;
  content: "";
  height: 3px;
  background-color: var(--ds-iconBorder-brand, #343a40);
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
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

.btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>