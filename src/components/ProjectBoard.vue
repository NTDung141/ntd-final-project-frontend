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
      <v-btn depressed small color="primary">Complete Sprint</v-btn>
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
      <v-row>
        <v-card class="mr-3" elevation="0" color="grey lighten-4" width="260px">
          <v-card-title>
            <div class="column-title">TO DO</div>
          </v-card-title>

          <v-card-text v-if="!activeSprint">
            <div class="no-active-sprint">
              <div class="flex-center">
                <v-img
                  height="128px"
                  width="128px"
                  :src="require('../assets/scrum2x.png')"
                ></v-img>
              </div>

              <div class="no-active-sprint-content-bold">
                You haven't started a sprint
              </div>

              <div class="no-active-sprint-content">
                You can't do anything on your board because you haven't started
                a sprint yet. Go to the backlog to plan and start a sprint.
              </div>
            </div>

            <v-btn
              depressed
              color="grey lighten-2"
              small
              @click="goToProjectBacklog"
              >Go to Backlog</v-btn
            >
          </v-card-text>

          <div class="task-list" v-if="activeSprint">
            <BoardTaskItem
              v-for="task in activeSprint.tasks"
              :key="task.id"
              :task="task"
            />
          </div>
        </v-card>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { CookieService } from "@/services/CookieService.js";
import { PROJECT_API } from "@/factories/project.js";
import { mapGetters } from "vuex";
import PROJECT_GETTERS from "@/store/modules/project/project-getters.js";
import BoardTaskItem from "@/components/BoardTaskItem.vue";

export default {
  name: "project-board",

  components: {
    BoardTaskItem,
  },

  data() {
    return {
      projectId: this.$route.params.id,
      activeSprint: null,
    };
  },

  computed: {
    ...mapGetters({
      project: PROJECT_GETTERS.project,
    }),
  },

  beforeMount() {
    axios
      .get(PROJECT_API.getActiveSprintApi(this.projectId), {
        headers: CookieService.authHeader(),
      })
      .then((res) => {
        if (res.data) {
          this.activeSprint = res.data.active_sprint;
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    goToProjectBacklog() {
      this.$router.push({ path: `/my-project/${this.projectId}/backlog` });
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

.column-title {
  font-size: 12px;
  font-weight: 500;
  color: #5e6c84;
  text-transform: uppercase;
}

.no-active-sprint {
  display: block;
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

.no-active-sprint-content-bold {
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}

.no-active-sprint-content {
  text-align: center;
  font-size: 14px;
  margin-bottom: 15px;
}

.task-list {
  padding: 5px 7px 10px 7px;
}

.search-bar {
  max-width: 300px !important;
}

.over-flow {
  overflow: auto;
}
</style>