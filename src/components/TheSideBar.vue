<template>
  <v-navigation-drawer
    class="sidebar"
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-icon>far fa-building</v-icon>
      </v-list-item-avatar>

      <v-list-item-title>{{ project.name }}</v-list-item-title>

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
            <v-icon small>fas fa-cog</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Project Setting</v-list-item-title>
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
import PROJECT_GETTERS from "@/store/modules/project/project-getters.js";

export default {
  name: "the-side-bar",

  props: {
    projectId: String,
  },

  data() {
    return {
      isShowSidebar: true,

      menuItems: [
        { id: 1, name: "Backlog", icon: "far fa-list-alt" },
        { id: 2, name: "Board", icon: "fas fa-columns" },
        { id: 3, name: "Goal", icon: "fas fa-bullseye" },
        { id: 4, name: "Review", icon: "fas fa-check-square" },
        { id: 5, name: "Retrospective", icon: "fas fa-thumbtack" },
      ],

      drawer: true,
      mini: false,
    };
  },

  computed: {
    ...mapGetters({
      currentTabIndex: SIDEBAR_GETTERS.currentTabIndex,
      project: PROJECT_GETTERS.project,
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
      if (menuItemId === 2) {
        this.goToProjectBoard();
      }
      if (menuItemId === 3) {
        this.goToProjectGoal();
      }
      if (menuItemId === 4) {
        this.goToProjectReview();
      }
      if (menuItemId === 5) {
        this.goToProjectRetro();
      }
    },

    goToProjectDetail() {
      this.$router.push(`/my-project/settings/${this.projectId}`);
    },

    goToProjectBacklog() {
      this.$router
        .push({ path: `/my-project/${this.projectId}/backlog` })
        .catch(() => {});
    },

    goToProjectBoard() {
      this.$router.push(`/my-project/${this.projectId}`).catch(() => {});
    },

    goToProjectGoal() {
      this.$router.push(`/my-project/${this.projectId}/goal`).catch(() => {});
    },

    goToProjectReview() {
      this.$router.push(`/my-project/${this.projectId}/review`).catch(() => {});
    },

    goToProjectRetro() {
      this.$router
        .push(`/my-project/${this.projectId}/retrospective`)
        .catch(() => {});
    },
  },
};
</script>

<style>
.sidebar {
  text-align: left;
  margin-top: 7px;
  background-color: #fafbfc;
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
</style>