<template>
  <div class="project-sprint">
    <v-card elevation="0" class="project-sprint-item">
      <v-card-title>
        <div class="project-sprint-item-title">{{ sprint.name }}</div>

        <v-spacer></v-spacer>

        <v-btn
          v-if="sprint.status === 1"
          small
          depressed
          color="grey lighten-2"
          :disabled="disableBtn"
          class="mr-2"
          @click="startSprint"
        >
          Start Sprint
        </v-btn>
        <v-btn
          v-if="sprint.status === 2"
          small
          depressed
          color="grey lighten-2"
          class="mr-2"
          @click="completeSprint"
        >
          Complete Sprint
        </v-btn>
        <div v-if="sprint.status === 3" class="project-sprint-completed">
          Completed
        </div>

        <div class="project-sprint-actions" v-if="sprint.status !== 3">
          <i
            small
            class="fas fa-pen fa-2xs mr-2"
            @click="showEditSprintDialog = true"
          ></i>

          <i
            small
            class="fas fa-trash fa-2xs"
            @click="showDeleteSprintDialog = true"
          ></i>
        </div>
      </v-card-title>

      <div class="empty-task-item" v-if="tasks.length < 1">
        There are no issues in this sprint
      </div>

      <ProjectTaskItem v-for="task in tasks" :key="task.id" :task="task" />

      <v-card-actions v-if="sprint.status !== 3">
        <v-btn
          small
          text
          class="project-sprint-item-create-task"
          @click="showCreateTaskDialog = true"
        >
          <i class="fas fa-plus mr-2"></i>
          Create issue
        </v-btn>
      </v-card-actions>
    </v-card>

    <ProjectTaskItemCreate
      v-model="showCreateTaskDialog"
      :projectKey="projectKey"
      :projectId="projectId"
      :sprintId="sprint.id"
      @update-project-after-action="updateProjectAfterAction"
      @create-task="createTask"
    />

    <SprintEditDialog v-model="showEditSprintDialog" :sprint="sprint" />

    <SprintDeleteDialog v-model="showDeleteSprintDialog" :sprint="sprint" />
  </div>
</template>

<script>
import ProjectTaskItem from "@/components/ProjectTaskItem.vue";
import ProjectTaskItemCreate from "@/components/ProjectTaskItemCreate.vue";
import SprintEditDialog from "@/components/SprintEditDialog.vue";
import SprintDeleteDialog from "@/components/SprintDeleteDialog.vue";
import { integer } from "vuelidate/lib/validators";
import { TASK_API } from "@/factories/task.js";
import axios from "axios";
import { CookieService } from "@/services/CookieService.js";
import PROJECT_ACTIONS from "@/store/modules/project/project-actions";
import { mapActions } from "vuex";

export default {
  name: "project-sprint-item",

  components: {
    ProjectTaskItem,
    ProjectTaskItemCreate,
    SprintEditDialog,
    SprintDeleteDialog,
  },

  props: {
    sprint: Object,
    disableBtn: Boolean,
    projectKey: String,
    projectId: integer,
  },

  data() {
    return {
      showEditSprintDialog: false,
      showDeleteSprintDialog: false,
      showCreateTaskDialog: false,
    };
  },

  computed: {
    tasks() {
      return this.sprint.tasks;
    },
  },

  methods: {
    ...mapActions({ updateProject: PROJECT_ACTIONS.updateProject }),

    startSprint() {
      this.$emit("start-sprint", this.sprint.id);
    },

    completeSprint() {
      this.$emit("complete-sprint", this.sprint.id);
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
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.project-sprint {
  margin-bottom: 30px;
}

.project-sprint-item {
  width: 100%;
  background: #f4f5f7 !important;
  border-radius: 5px;
  padding: 0px 10px 20px 10px;
}

.project-sprint-item-title {
  font-size: 16px;
}

.project-sprint-item-create-task {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 30px;
}

.project-sprint-completed {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  margin-right: 8px;
}

.project-sprint-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
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