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
            <div class="task-feature-value flex-start">
              <v-avatar size="20" class="mr-3">
                <img src="@/assets/defaultAvatar2.jpg" />
              </v-avatar>
              Assignee
            </div>
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
            <div class="task-feature-value">
              <div class="flex-start">Sprint 1</div>
            </div>
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
            <div class="task-feature-value">
              <div :class="'task-status ' + getStatusClass(task.status)">
                {{ getStatus(task.status) }}
              </div>
            </div>

            <!-- <v-select
              v-model="taskStatus"
              :items="status"
              :item-value="id"
              :item-text="name"
              outlined
              dense
            >
              <template slot="selection" slot-scope="data">
                {{ data.item.name }}
              </template>

              <template slot="item" slot-scope="data">
                {{ data.item.name }}
              </template>
            </v-select> -->
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
            <div class="task-feature-value">
              <div class="flex-start">Priority</div>
            </div>
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
            <div class="task-feature-value">
              <div class="flex-start">Due date</div>
            </div>
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
  },

  data() {
    return {
      status: [
        { id: 1, name: "Opened" },
        { id: 2, name: "In Progress" },
        { id: 3, name: "Resolve" },
        { id: 4, name: "Closed" },
      ],
      taskStatus: this.task.status,
    };
  },

  methods: {
    getStatus(status) {
      if (status === 1) {
        return "Opened";
      }
      if (status === 2) {
        return "In Progress";
      }
      if (status === 3) {
        return "Released";
      }
      if (status === 4) {
        return "Closed";
      }
    },

    getStatusClass(status) {
      if (status === 1) {
        return "status-1";
      }
      if (status === 2) {
        return "status-2";
      }
      if (status === 3) {
        return "status-3";
      }
      if (status === 4) {
        return "status-4";
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