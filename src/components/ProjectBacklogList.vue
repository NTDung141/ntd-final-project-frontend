<template>
  <div class="project-backlog-list">
    <v-card elevation="0" class="project-backlog-card">
      <v-card-title>
        <div class="project-backlog-list-title">Backlog</div>

        <v-spacer></v-spacer>

        <v-btn
          small
          depressed
          color="primary"
          @click="createSprint"
          :disabled="roleInProject != 1"
        >
          Create Sprint
        </v-btn>
      </v-card-title>

      <div class="empty-task-item" v-if="tasks.length < 1">
        Your backlog is empty
      </div>

      <ProjectTaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :projectKey="project.key"
      />

      <v-card-actions>
        <v-btn
          small
          text
          class="project-backlog-list-create-task"
          @click="showCreateTaskDialog = true"
          v-if="roleInProject == 1"
        >
          <i class="fas fa-plus mr-2"></i>
          Create issue
        </v-btn>
      </v-card-actions>
    </v-card>

    <ProjectTaskItemCreate
      v-model="showCreateTaskDialog"
      :projectId="project.id"
      @create-task="createTask"
    />
  </div>
</template>

<script>
import ProjectTaskItem from "@/components/ProjectTaskItem.vue";
import ProjectTaskItemCreate from "@/components/ProjectTaskItemCreate.vue";
import axios from "axios";
import { CookieService } from "@/services/CookieService.js";
import { TASK_API } from "@/factories/task.js";
import PROJECT_ACTIONS from "@/store/modules/project/project-actions";
import { mapActions, mapGetters } from "vuex";
import AUTHENTICATION_GETTERS from "@/store/modules/authentication/authentication-getters";
import PROJECT_GETTERS from "@/store/modules/project/project-getters.js";

export default {
  name: "project-backlog-list",

  components: {
    ProjectTaskItem,
    ProjectTaskItemCreate,
  },

  props: {
    project: Object,
  },

  data() {
    return {
      showCreateTaskDialog: false,
      roleInProject: 0,
    };
  },

  mounted() {
    this.checkRoleInProject();
  },

  methods: {
    ...mapActions({ updateProject: PROJECT_ACTIONS.updateProject }),

    createSprint() {
      this.$emit("create-sprint");
    },

    createTask(newTask) {
      axios
        .post(TASK_API.createApi, newTask, {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          if (res.data && res.data.project) {
            this.updateProject(res.data.project);
            this.showCreateTaskDialog = false;
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    checkRoleInProject() {
      this.project.users.forEach((member) => {
        if (member.id == this.userInfo.id) {
          this.roleInProject = member.pivot.role;
        }
      });
    },
  },

  computed: {
    ...mapGetters({
      project: PROJECT_GETTERS.project,
      userInfo: AUTHENTICATION_GETTERS.userInfo,
    }),

    tasks() {
      let taskList = [];
      if (this.project && this.project.tasks) {
        taskList = this.project.tasks.filter(
          (task) => !task.sprint_id && task.is_deleted !== 1
        );
      }
      return taskList;
    },
  },
};
</script>

<style scoped>
.project-backlog-list {
  width: 100%;
  border-radius: 5px;
}

.project-backlog-card {
  padding: 0px 10px;
}

.project-backlog-list-title {
  font-size: 16px;
}

.project-backlog-list-create-task {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 30px;
}
.mr-2 {
  margin-right: 2px;
}

.empty-task-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  min-height: 40px;
  border: 2px dashed #dfe1e6;
  border-radius: 3px;
  font-size: 14px;
  color: #6b778c;
}
</style>