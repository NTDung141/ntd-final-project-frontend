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
    </div>

    <div class="project-board-body">
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
            <v-card
              class="mb-1"
              elevation="1"
              v-for="task in activeSprint.tasks"
              :key="task.id"
            >
              <div class="task-item">
                <div class="task-item-name flex-start">{{ task.name }}</div>

                <div class="flex-start">
                  <i class="fas fa-check-square task-item-icon"></i>
                  <div class="column-title">{{ task.key }}</div>
                  <v-spacer></v-spacer>
                  <v-avatar size="23" class="mr-2">
                    <img src="@/assets/defaultAvatar2.jpg" />
                  </v-avatar>
                </div>
              </div>
            </v-card>
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

export default {
  name: "project-board",

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
  overflow-x: hidden;
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
  width: 96%;
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

.task-item {
  display: block;
  padding: 12px;
}

.task-item-name {
  font-size: 14px;
  margin-bottom: 10px;
}

.task-item-icon {
  margin-right: 5px;
  color: #42a5f5;
}
</style>