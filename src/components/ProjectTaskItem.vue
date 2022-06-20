<template>
  <div class="task-item" @click="showTaskDetailDialog = true">
    <i class="fas fa-check-square task-item-icon"></i>

    <div class="task-item-name">{{ projectKey + "-" + task.key }}</div>

    <div class="task-item-name">{{ task.name }}</div>

    <v-spacer></v-spacer>

    <div :class="'task-item-status ' + getStatus(task.status).style">
      {{ getStatus(task.status).name }}
    </div>

    <v-avatar size="20" class="mr-2">
      <img src="@/assets/defaultAvatar2.jpg" />
    </v-avatar>

    <v-menu offset-y left>
      <template v-slot:activator="{ on, attrs }">
        <div class="task-item-actions-icon" v-bind="attrs" v-on="on">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </template>
      <div class="task-menu-box">
        <div class="task-menu-title">ACTIONS</div>
        <div>
          <v-btn class="task-menu-item" @click="deleteTask" depressed small>
            Delete
          </v-btn>
        </div>

        <div class="task-menu-title">MOVE TO</div>
        <div>
          <v-btn
            v-if="task.sprint_id"
            class="task-menu-item"
            @click="moveToBacklog"
            depressed
            small
          >
            Backlog
          </v-btn>
        </div>
        <div v-for="sprint in sprintListToMove" :key="sprint.id">
          <v-btn
            class="task-menu-item"
            @click="moveToAnotherSprint(sprint)"
            depressed
            small
          >
            {{ sprint.name }}
          </v-btn>
        </div>
      </div>
    </v-menu>

    <ProjectTaskDetail v-model="showTaskDetailDialog" :task="task" />

    <TaskDeleteDialog v-model="showDeleteTaskDialog" :task="task" />
  </div>
</template>

<script>
import ProjectTaskDetail from "@/components/ProjectTaskDetail.vue";
import { mapGetters, mapActions } from "vuex";
import PROJECT_GETTERS from "@/store/modules/project/project-getters.js";
import PROJECT_ACTIONS from "@/store/modules/project/project-actions";
import axios from "axios";
import { CookieService } from "@/services/CookieService.js";
import { TASK_API } from "@/factories/task.js";
import TaskDeleteDialog from "@/components/TaskDeleteDialog.vue";

export default {
  name: "project-task-item",

  components: {
    ProjectTaskDetail,
    TaskDeleteDialog,
  },

  props: {
    task: Object,
    projectKey: String,
  },

  data() {
    return {
      showTaskDetailDialog: false,
      showDeleteTaskDialog: false,
      statuses: [
        { id: 1, name: "Opened", style: "status-1" },
        { id: 2, name: "In Progress", style: "status-2" },
        { id: 3, name: "Resolve", style: "status-3" },
        { id: 4, name: "Closed", style: "status-4" },
      ],
    };
  },

  computed: {
    ...mapGetters({
      project: PROJECT_GETTERS.project,
    }),

    sprintListToMove() {
      let sprintListToMove = [];
      sprintListToMove = this.project.sprints.filter(
        (sprint) => sprint.id !== this.task.sprint_id && sprint.status !== 3
      );

      return sprintListToMove;
    },
  },

  methods: {
    ...mapActions({ updateProject: PROJECT_ACTIONS.updateProject }),

    getStatus(status) {
      let returnValue = {};
      this.statuses.forEach((item) => {
        if (item.id === status) {
          returnValue = item;
        }
      });

      return returnValue;
    },

    updateTaskAxios(updateTask) {
      axios
        .post(TASK_API.updateApi, updateTask, {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          if (res.data && res.data.project) {
            this.updateProject(res.data.project);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    moveToAnotherSprint(newSprint) {
      const updateTask = new FormData();
      updateTask.append("id", this.task.id);
      updateTask.append("sprint_id", newSprint.id);

      this.updateTaskAxios(updateTask);
    },

    moveToBacklog() {
      const updateTask = new FormData();
      updateTask.append("id", this.task.id);
      updateTask.append("sprint_id", null);

      this.updateTaskAxios(updateTask);
    },

    deleteTask() {
      this.showDeleteTaskDialog = true;
    },
  },
};
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #ebecf0;
  background-color: #fff;
  margin-top: 5px;
  min-height: 40px;
  padding: 0px 15px;
  cursor: pointer;
}

.task-item-icon {
  margin-right: 10px;
  color: #42a5f5;
}

.task-item-name {
  font-size: 14px;
  margin-right: 5px;
}

.task-item-status {
  padding: 2px 3px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
  margin-right: 12px;
}

.task-item-actions-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-radius: 2px;
}

.task-item-actions-icon:hover {
  background-color: #dfe1e6;
}

.status-1 {
  background-color: #ef9a9a;
  color: #c62828;
}

.status-2 {
  background-color: #90caf9;
  color: #1565c0;
}

.status-3 {
  background-color: #a5d6a7;
  color: #2e7d32;
}

.status-4 {
  background-color: #b0bec5;
  color: #37474f;
}

.task-menu-box {
  min-width: 100px;
  display: block;
  background-color: #fff;
  padding: 8px 0px;
  border-radius: 3px;
}

.task-menu-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 400;
  font-size: 11px;
  padding: 15px 0px 15px 12px;
}

.task-menu-item {
  width: 100%;
  border-radius: 0px;
  text-transform: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 8px;
  background-color: #fff !important;
}
</style>