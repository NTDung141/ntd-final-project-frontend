<template>
  <div class="task-item">
    <i class="fas fa-check-square task-item-icon"></i>

    <div class="task-item-name">{{ task.key }}</div>

    <div class="task-item-name">{{ task.name }}</div>

    <v-spacer></v-spacer>

    <div :class="'task-item-status ' + getStatusClass(task.status)">
      {{ getStatus(task.status) }}
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
      <v-list>
        <v-list-item @click="editTask">
          <v-list-item-title> Edit </v-list-item-title>
        </v-list-item>

        <v-list-item @click="deleteTask">
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "project-task-item",

  props: {
    task: Object,
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

    editTask() {},

    deleteTask() {},
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

.task-item-actions-item {
  max-height: 30px !important;
}
</style>