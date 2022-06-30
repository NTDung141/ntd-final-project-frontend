<template>
  <v-navigation-drawer
    class="sidebar"
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
  >
    <v-list-item class="px-2">
      <v-list-item-content>
        <div class="admin-name">Admin</div>
      </v-list-item-content>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>fas fa-angle-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item-group :value="currentTabIndex" mandatory color="primary">
        <v-list-item
          class="sidebar-sprint-subitem"
          v-for="menuItem in menuItems"
          :key="menuItem.name"
          @click="menuItemAction(menuItem.id)"
        >
          <v-list-item-icon>
            <v-icon small>{{ menuItem.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item class="sidebar-sprint-subitem" @click="goToProjectDetail">
          <v-list-item-icon>
            <v-icon small>fas fa-sign-out</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SIDEBAR_GETTERS from "@/store/modules/sidebar/sidebar-getters.js";
import SIDEBAR_ACTIONS from "@/store/modules/sidebar/sidebar-actions.js";

export default {
  name: "admin-side-bar",

  data() {
    return {
      isShowSidebar: true,

      menuItems: [{ id: 1, name: "User Management", icon: "fas fa-users" }],

      drawer: true,
      mini: false,
    };
  },

  computed: {
    ...mapGetters({
      currentTabIndex: SIDEBAR_GETTERS.currentTabIndex,
    }),
  },

  methods: {
    ...mapActions({ changeTabIndex: SIDEBAR_ACTIONS.changeTabIndex }),

    toggleSidebar() {
      this.isShowSidebar = !this.isShowSidebar;
    },

    menuItemAction(menuItemId) {
      if (menuItemId === 1) {
        this.goToProjectBacklog();
      }
    },

    goToUserMangement() {
      this.$router.push({ path: `/my-project//backlog` }).catch(() => {});
    },
  },
};
</script>

<style scoped>
.sidebar {
  text-align: left;
  margin-top: 7px;
}

.sidebar-sprint {
  padding: 0px 0px !important;
}

.sidebar-sprint-title {
  padding: 0px 0px !important;
}

.sidebar-sprint-subitem {
  padding: 0px 0px 0px 16px !important;
}

.admin-name {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
}
</style>