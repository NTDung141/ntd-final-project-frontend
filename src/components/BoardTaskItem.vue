<template>
  <div @click="showTaskDetailDialog = true">
    <v-card class="mb-1" elevation="1">
      <div class="task-item">
        <div class="task-item-name flex-start">{{ task.name }}</div>

        <div class="flex-start">
          <i class="fas fa-check-square task-item-icon"></i>
          <div class="task-item-key">{{ projectKey + "-" + task.key }}</div>
          <v-spacer></v-spacer>
          <v-avatar size="23" class="mr-2">
            <img src="@/assets/defaultAvatar2.jpg" />
          </v-avatar>
        </div>
      </div>
    </v-card>

    <ProjectTaskDetail v-model="showTaskDetailDialog" :task="task" />
  </div>
</template>

<script>
import ProjectTaskDetail from "@/components/ProjectTaskDetail.vue";

export default {
  name: "board-task-item",

  components: {
    ProjectTaskDetail,
  },

  props: {
    task: Object,
    projectKey: String,
  },

  data() {
    return {
      showTaskDetailDialog: false,
    };
  },
};
</script>

<style scoped>
.flex-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.task-item {
  display: block;
  padding: 12px;
  cursor: pointer;
}

.task-item-name {
  font-size: 14px;
  margin-bottom: 10px;
}

.task-item-icon {
  margin-right: 5px;
  color: #42a5f5;
}

.task-item-key {
  font-size: 12px;
  font-weight: 500;
  color: #5e6c84;
}
</style>