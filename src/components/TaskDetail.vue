<template>
  <div class="task-detail">
    <div class="task-detail-header">
      <div class="feature-label">Detail</div>
    </div>

    <div class="task-detail-body">
      <v-row no no-gutters>
        <v-col cols="5">
          <v-card-text>
            <div class="feature-label flex-start">Assignee</div>
          </v-card-text>
        </v-col>

        <v-col cols="7">
          <v-card-text>
            <div
              v-if="!isEditAssignee"
              class="task-feature-value flex-start"
              @click="isEditAssignee = true"
            >
              <v-avatar
                v-if="assignee && assignee.id !== 0"
                size="20"
                class="mr-3"
              >
                <img src="@/assets/defaultAvatar2.jpg" />
              </v-avatar>
              {{
                assignee && assignee.id !== 0 ? computedAssignee.name : "None"
              }}
            </div>

            <v-autocomplete
              v-if="isEditAssignee"
              v-model="assignee"
              :items="assignees"
              item-value="id"
              item-text="name"
              chips
              dense
              outlined
            >
              <template v-slot:selection="data">
                <div class="flex-start">
                  <v-avatar size="20" class="mr-3">
                    <img src="@/assets/defaultAvatar2.jpg" />
                  </v-avatar>
                  {{ data.item.name }}
                </div>
              </template>

              <template v-slot:item="data">
                <template>
                  <v-list-item-avatar size="30">
                    <img src="@/assets/defaultAvatar2.jpg" />
                  </v-list-item-avatar>
                  <v-list-item-content @click="changeAssignee(data.item)">
                    <v-list-item-title>
                      {{ data.item.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row no no-gutters>
        <v-col cols="5">
          <v-card-text>
            <div class="feature-label flex-start">Sprint</div>
          </v-card-text>
        </v-col>

        <v-col cols="7">
          <v-card-text>
            <div
              v-if="!isEditSprint"
              class="task-feature-value"
              @click="isEditSprint = true"
            >
              <div class="flex-start">
                {{ sprint ? computedSprint.name : "None" }}
              </div>
            </div>

            <v-autocomplete
              v-if="isEditSprint"
              v-model="sprint"
              :items="sprints"
              item-value="id"
              item-text="name"
              chips
              dense
              outlined
            >
              <template v-slot:selection="data">
                <div class="flex-start">
                  {{ data.item.name }}
                </div>
              </template>

              <template v-slot:item="data">
                <template>
                  <v-list-item-content @click="changeSprint(data.item)">
                    <v-list-item-title class="flex-start">
                      {{ data.item.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row no no-gutters>
        <v-col cols="5">
          <v-card-text>
            <div class="feature-label flex-start">Status</div>
          </v-card-text>
        </v-col>

        <v-col cols="7">
          <v-card-text>
            <v-menu offset-y>
              <template v-slot:activator="{ attrs, on }">
                <div
                  class="task-feature-value flex-start"
                  v-bind="attrs"
                  v-on="on"
                >
                  <div :class="'task-status ' + getStatus(status).style">
                    {{ getStatus(status).name }}
                  </div>
                </div>
              </template>

              <v-list>
                <v-list-item
                  v-for="status in statuses"
                  :key="status.id"
                  @click="changeStatus(status)"
                  link
                >
                  <div :class="'task-status ' + status.style">
                    {{ status.name }}
                  </div>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row no no-gutters>
        <v-col cols="5">
          <v-card-text>
            <div class="feature-label flex-start">Priority</div>
          </v-card-text>
        </v-col>

        <v-col cols="7">
          <v-card-text>
            <v-menu offset-y>
              <template v-slot:activator="{ attrs, on }">
                <div
                  class="task-feature-value flex-start"
                  v-bind="attrs"
                  v-on="on"
                >
                  <div
                    v-if="priority"
                    :class="'task-status ' + getPriority(priority).style"
                  >
                    {{ getPriority(priority).name }}
                  </div>
                  <div v-if="!priority">None</div>
                </div>
              </template>

              <v-list>
                <v-list-item
                  v-for="priority in priorities"
                  :key="priority.id"
                  @click="changePriority(priority)"
                  link
                >
                  <div :class="'task-status ' + priority.style">
                    {{ priority.name }}
                  </div>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row no no-gutters>
        <v-col cols="5">
          <v-card-text>
            <div :class="'feature-label flex-start ' + expriedClass">
              <i v-if="expriedClass" class="fas fa-fire mr-2"></i>
              Due date
            </div>
          </v-card-text>
        </v-col>

        <v-col cols="7">
          <v-card-text>
            <v-menu
              v-model="isEditDueDate"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <div class="task-feature-value" v-bind="attrs" v-on="on">
                  <div :class="'flex-start ' + expriedClass">
                    {{ dueDate ? dueDate : "None" }}
                  </div>
                </div>
              </template>
              <v-date-picker
                v-model="dueDate"
                :min="currentDate"
                @input="isEditDueDate = false"
                no-title
                scrollable
              ></v-date-picker>
            </v-menu>
          </v-card-text>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { CookieService } from "@/services/CookieService.js";
import { TASK_API } from "@/factories/task.js";
import PROJECT_ACTIONS from "@/store/modules/project/project-actions";
import { mapActions } from "vuex";

export default {
  name: "task-detail",

  props: {
    task: Object,
    project: Object,
    showTaskDetailDialog: Boolean,
  },

  data() {
    return {
      statuses: [
        { id: 1, name: "Opened", style: "status-1" },
        { id: 2, name: "In Progress", style: "status-2" },
        { id: 3, name: "Resolve", style: "status-3" },
        { id: 4, name: "Closed", style: "status-4" },
      ],
      priorities: [
        { id: 0, name: "None", style: "" },
        { id: 1, name: "High", style: "status-1" },
        { id: 2, name: "Normal", style: "status-3" },
        { id: 3, name: "Low", style: "status-4" },
      ],
      status: null,
      priority: null,
      assignees: [],
      assignee: null,
      sprints: [],
      sprint: null,
      dueDate: null,
      currentDate: new Date().toISOString().slice(0, 10),
      isEditAssignee: false,
      isEditSprint: false,
      isEditDueDate: false,
    };
  },

  beforeMount() {
    this.project.sprints.forEach((sprint) => {
      if (sprint.id === this.task.sprint_id) {
        this.sprint = sprint;
      }
    });

    this.assignees = this.project.users;
    this.assignees.forEach((assignee) => {
      if (assignee.id === this.task.assignee_id) {
        this.assignee = assignee;
      }
    });
    this.assignees.unshift({ id: 0, name: "None" });

    this.sprints = [...this.project.sprints];
    // this.sprints = this.project.sprints;
    this.sprints.unshift({ id: 0, name: "Backlog" });

    this.status = this.task.status;
    this.priority = this.task.priority;

    if (this.task.due_date) {
      this.dueDate = this.task.due_date.slice(0, 10);
    }
  },

  computed: {
    computedSprint() {
      let returnSprint = {};
      if (!this.sprint) {
        this.project.sprints.forEach((sprint) => {
          if (sprint.id === this.task.sprint_id) {
            returnSprint = sprint;
            this.sprint = sprint;
          }
        });
      } else {
        returnSprint = this.sprint;
      }

      return returnSprint;
    },

    computedAssignee() {
      let returnAssignee = {};
      if (!this.assignee) {
        this.assignees.forEach((assignee) => {
          if (assignee.id === this.task.assignee_id) {
            returnAssignee = assignee;
            this.assignee = assignee;
          }
        });
      } else {
        returnAssignee = this.assignee;
      }

      return returnAssignee;
    },

    expriedClass() {
      if (this.task.due_date && new Date() > Date.parse(this.task.due_date)) {
        return "expired-task";
      } else return "";
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

    getPriority(priority) {
      let returnValue = {};
      this.priorities.forEach((item) => {
        if (item.id === priority) {
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

    changeSprint(newSprint) {
      this.isEditSprint = false;
      this.sprint = newSprint;

      let newSprintId = newSprint.id;
      if (newSprintId === 0) {
        newSprintId = null;
      }

      const updateTask = new FormData();
      updateTask.append("id", this.task.id);
      updateTask.append("sprint_id", newSprintId);

      this.updateTaskAxios(updateTask);
    },

    changeAssignee(newAssignee) {
      this.isEditAssignee = false;
      this.assignee = newAssignee;

      let newAssigneeId = newAssignee.id;
      if (newAssigneeId === 0) {
        newAssigneeId = null;
      }

      const updateTask = new FormData();
      updateTask.append("id", this.task.id);
      updateTask.append("assignee_id", newAssigneeId);

      this.updateTaskAxios(updateTask);
    },

    changeStatus(newStatus) {
      this.status = newStatus.id;

      const updateTask = new FormData();
      updateTask.append("id", this.task.id);
      updateTask.append("status", newStatus.id);

      this.updateTaskAxios(updateTask);
    },

    changePriority(newPriority) {
      this.priority = newPriority.id;

      let newPriorityId = newPriority.id;
      if (newPriorityId === 0) {
        newPriorityId = null;
      }

      const updateTask = new FormData();
      updateTask.append("id", this.task.id);
      updateTask.append("priority", newPriorityId);

      this.updateTaskAxios(updateTask);
    },
  },

  watch: {
    dueDate() {
      const updateTask = new FormData();
      updateTask.append("id", this.task.id);
      updateTask.append("due_date", this.dueDate);

      this.updateTaskAxios(updateTask);
    },

    showTaskDetailDialog() {
      if (!this.showTaskDetailDialog) {
        this.isEditAssignee = false;
        this.isEditSprint = false;
        this.isEditDueDate = false;
      }
    },
  },
};
</script>

<style scoped>
.flex-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.feature-label {
  font-size: 14px;
  font-weight: 500;
  color: #172b4d;
  padding-top: 5px;
}

.task-detail {
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  margin-bottom: 20px;
}

.task-detail-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 16px 10px 16px;
  border-bottom: 1px solid #dfe1e6;
}

.task-detail-body {
  display: block;
}

.task-feature-value {
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
}

.task-feature-value:hover {
  background-color: #d1d1d1;
}

.task-status {
  padding: 2px 3px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
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

.expired-task {
  color: #c62828 !important;
}
</style>