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
              <v-avatar size="20" class="mr-3">
                <img src="@/assets/defaultAvatar2.jpg" />
              </v-avatar>
              {{ assignee[0].name }}
            </div>

            <v-autocomplete
              v-if="isEditAssignee"
              v-model="assignee"
              :items="project.users"
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
                  <v-list-item-content @click="isEditAssignee = false">
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
              <div class="flex-start">{{ sprint[0].name }}</div>
            </div>

            <v-autocomplete
              v-if="isEditSprint"
              v-model="sprint"
              :items="project.sprints"
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
                  <v-list-item-content @click="isEditSprint = false">
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
                <div class="flex-start" v-bind="attrs" v-on="on">
                  <div :class="'task-status ' + getStatus(task.status).style">
                    {{ getStatus(task.status).name }}
                  </div>
                </div>
              </template>

              <v-list>
                <v-list-item v-for="status in statuses" :key="status.id" link>
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
                <div class="flex-start" v-bind="attrs" v-on="on">
                  <div
                    v-if="task.priority"
                    :class="'task-status ' + getPriority(task.priority).style"
                  >
                    {{ getPriority(task.priority).name }}
                  </div>
                  <div v-if="!task.priority">None</div>
                </div>
              </template>

              <v-list>
                <v-list-item
                  v-for="priority in priorities"
                  :key="priority.id"
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
            <div class="feature-label flex-start">Due date</div>
          </v-card-text>
        </v-col>

        <v-col cols="7">
          <v-card-text>
            <v-menu
              v-model="isEditDueDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <div class="task-feature-value" v-bind="attrs" v-on="on">
                  <div class="flex-start">{{ dueDate ? dueDate : "None" }}</div>
                </div>
              </template>
              <v-date-picker
                v-model="dueDate"
                :min="currentDate"
                @input="isEditDueDate = false"
              ></v-date-picker>
            </v-menu>
          </v-card-text>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "task-detail",

  props: {
    task: Object,
    project: Object,
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
        { id: 1, name: "High", style: "status-1" },
        { id: 2, name: "Normal", style: "status-3" },
        { id: 3, name: "Low", style: "status-4" },
      ],
      taskStatus: {},
      assignee: this.project.users,
      sprint: this.project.sprints,
      dueDate: this.task.start_date ? this.task.start_date.slice(0, 10) : null,
      currentDate: new Date().toISOString().slice(0, 10),
      isEditAssignee: false,
      isEditSprint: false,
      isEditDueDate: false,
    };
  },

  methods: {
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
</style>