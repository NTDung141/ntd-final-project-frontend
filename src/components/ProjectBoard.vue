<template>
  <div class="project-board">
    <div class="project-link">
      <router-link to="/my-project">My Project</router-link>
      <span class="ml-1 mr-1">/</span>
      <router-link :to="`/my-project/${this.projectId}`">
        {{ project.name }}
      </router-link>
    </div>

    <div class="project-board-header">
      <div class="sprint-name">
        {{ activeSprint ? activeSprint.name : project.key + " board" }}
      </div>
      <v-spacer></v-spacer>
      <!-- <v-btn depressed small color="primary">Complete Sprint</v-btn> -->
    </div>

    <div class="project-board-header">
      <v-text-field
        class="search-bar"
        dense
        outlined
        append-icon="fas fa-search"
      ></v-text-field>
    </div>

    <div class="project-board-body over-flow">
      <v-row class="project-board-row">
        <v-col
          v-for="column in columns"
          :key="column.id"
          class="project-board-column"
        >
          <ProjectBoardColumn
            :activeSprint="activeSprint"
            :columnStatus="column.status"
            :columnName="column.name"
            :projectKey="project.key"
            @go-to-project-backlog="goToProjectBacklog"
          />
        </v-col>

        <!-- <v-btn class="mt-1">
          <i class="fas fa-plus"></i>
        </v-btn> -->
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PROJECT_GETTERS from "@/store/modules/project/project-getters.js";
import ProjectBoardColumn from "@/components/ProjectBoardColumn.vue";
import SIDEBAR_ACTIONS from "@/store/modules/sidebar/sidebar-actions.js";

export default {
  name: "project-board",

  components: {
    ProjectBoardColumn,
  },

  data() {
    return {
      projectId: this.$route.params.id,
      activeSprint: null,
      columns: [
        { id: 1, name: "TO DO", status: 1 },
        { id: 2, name: "IN PROGRESS", status: 2 },
        { id: 3, name: "RESOLVE", status: 3 },
        { id: 4, name: "CLOSED", status: 4 },
      ],
    };
  },

  computed: {
    ...mapGetters({
      project: PROJECT_GETTERS.project,
    }),
  },

  beforeMount() {
    this.changeTabIndex(1);

    if (this.project.sprints) {
      this.project.sprints.forEach((sprint) => {
        if (sprint.status === 2) {
          this.activeSprint = sprint;
        }
      });
    }
  },

  methods: {
    ...mapActions({
      changeTabIndex: SIDEBAR_ACTIONS.changeTabIndex,
    }),

    goToProjectBacklog() {
      this.$router
        .push({ path: `/my-project/${this.projectId}/backlog` })
        .catch(() => {});
    },
  },

  watch: {
    project() {
      this.project.sprints.forEach((sprint) => {
        if (sprint.status === 2) {
          this.activeSprint = sprint;
        }
      });
    },
  },
};
</script>

<style scoped>
.project-board {
  width: 96%;
  height: 100%;
  padding: 20px 30px 150px 30px;
  overflow: hidden;
  margin-bottom: 30px;
}

.project-board-row {
  min-height: 100% !important;
  margin: 0px 15px 15px 0px;
}

.project-board-column {
  margin: 0px !important;
  padding: 5px 0px !important;
}

.project-board-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
}

.sprint-name {
  font-size: 23px;
  font-weight: 500;
}

.project-board-body {
  width: 100%;
  height: 82%;
  padding: 10px;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.search-bar {
  max-width: 300px !important;
}

.over-flow {
  overflow: auto;
}
</style>