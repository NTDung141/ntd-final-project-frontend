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
      <v-list-group prepend-icon="far fa-list-alt" append-icon="">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Product Backlog</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-group>

      <v-list-group
        class="sidebar-sprint"
        prepend-icon="fas fa-repeat"
        append-icon="fas fa-caret-down"
        color="primary"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Active Sprint</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item-group>
          <v-list-item
            class="sidebar-sprint-subitem"
            v-for="sprintSubItem in sprintSubItems"
            :key="sprintSubItem.name"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ sprintSubItem.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ sprintSubItem.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
    </v-list>

    <v-divider></v-divider>

    <v-list-group
      prepend-icon="fas fa-cog"
      append-icon=""
      @click="goToProjectDetail"
    >
      <template v-slot:activator>
        <v-list-item-content :to="`/my-project/details/${projectId}`">
          <v-list-item-title> Project Setting </v-list-item-title>
        </v-list-item-content>
      </template>
    </v-list-group>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "the-side-bar",

  props: {
    projectId: String,
  },

  mounted() {
    console.log(this.projectId);
  },

  data() {
    return {
      isShowSidebar: true,
      showingSprintId: -1,

      sprints: [
        { id: 1, name: "Sprint 1" },
        { id: 2, name: "Sprint 2" },
        { id: 3, name: "Sprint 3" },
      ],

      sprintSubItems: [
        { name: "Backlog", icon: "far fa-list-alt" },
        { name: "Board", icon: "fas fa-columns" },
        { name: "Review", icon: "fas fa-check-square" },
        { name: "Retrospective", icon: "fas fa-thumbtack" },
      ],

      drawer: true,
      mini: true,
    };
  },

  methods: {
    toggleSidebar() {
      this.isShowSidebar = !this.isShowSidebar;
      console.log(this.isShowSidebar);
    },

    changeShowingSprintId(id) {
      if (id === this.showingSprintId) {
        this.showingSprintId = -1;
      } else {
        this.showingSprintId = id;
      }
    },

    goToProjectDetail() {
      this.$router.push("/my-project/details/3");
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
  padding: 0px 0px 0px 30px !important;
}
</style>