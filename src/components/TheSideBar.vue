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

      <v-list-item-title>Project Name</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>fas fa-angle-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item-group v-model="menuItemIndex" mandatory color="primary">
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

      menuItemIndex: 1,

      drawer: true,
      mini: false,
    };
  },

  methods: {
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
        console.log(menuItemId);
      }
      if (menuItemId === 4) {
        console.log(menuItemId);
      }
      if (menuItemId === 5) {
        console.log(menuItemId);
      }
    },

    goToProjectDetail() {
      this.$router.push(`/my-project/settings/${this.projectId}`);
    },

    goToProjectBacklog() {
      this.$router.push({ path: `/my-project/${this.projectId}/backlog` });
    },

    goToProjectBoard() {
      this.$router.push(`/my-project/${this.projectId}`);
    },
  },
};
</script>

<style>
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
</style>