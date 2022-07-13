<template>
  <div class="subtask-item">
    <i class="fas fa-check-square subtask-icon"></i>

    <div class="subtask-name">{{ subtask.name }}</div>

    <v-spacer></v-spacer>

    <div class="subtask-status">
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <div class="task-feature-value flex-start" v-bind="attrs" v-on="on">
            <div :class="'task-status ' + getStatus(subtask.status).style">
              {{ getStatus(subtask.status).name }}
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
    </div>

    <div class="subtask-action">
      <v-menu offset-y left>
        <template v-slot:activator="{ on, attrs }">
          <div class="subtask-actions-icon" v-bind="attrs" v-on="on">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </template>
        <div class="subtask-menu-box">
          <v-btn class="subtask-menu-item" @click="editSubtask" depressed small>
            Edit
          </v-btn>

          <v-btn
            class="subtask-menu-item"
            @click="deleteSubtask"
            depressed
            small
          >
            Delete
          </v-btn>
        </div>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "subtask-item",

  props: {
    subtask: Object,
  },

  data() {
    return {
      subtaskName: "",
      subtaskStatus: 0,

      statuses: [
        { id: 1, name: "Opened", style: "status-1" },
        { id: 2, name: "In Progress", style: "status-2" },
        { id: 3, name: "Resolve", style: "status-3" },
        { id: 4, name: "Closed", style: "status-4" },
      ],
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
  },
};
</script>

<style scoped>
.subtask-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 35px;
  width: 100%;
  border: solid 1px #ebecf0;
  padding: 5px 10px;
  font-size: 14px;
  margin-bottom: 5px;
}

.subtask-icon {
  margin-right: 10px;
  color: #42a5f5;
}

.subtask-menu-box {
  min-width: 100px;
  display: block;
  background-color: #fff;
  padding: 8px 0px;
  border-radius: 3px;
}

.subtask-actions-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-radius: 2px;
}

.subtask-actions-icon:hover {
  background-color: #dfe1e6;
}

.subtask-menu-item {
  width: 100%;
  border-radius: 0px;
  text-transform: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 8px;
  background-color: #fff !important;
}

.task-status {
  padding: 1px 2px;
  border-radius: 2px;
  font-size: 11px;
  font-weight: 500;
  width: fit-content;
  margin-right: 5px;
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