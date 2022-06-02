<template>
  <v-dialog v-model="showTaskDetailDialog" max-width="1200px" max-height="100%">
    <v-card elevation="0" class="task-info">
      <v-card-title>
        <i class="fas fa-check-square task-icon"></i>
        <div class="task-key">{{ task.key }}</div>
        <v-spacer></v-spacer>
        <i
          v-if="isEditting === false"
          class="fas fa-pen fa-xs mr-3"
          @click="isEditting = true"
        ></i>
        <i
          v-if="isEditting === true"
          class="fas fa-save fa-sm mr-3"
          @click="saveTaskChange"
        ></i>
        <i class="fas fa-times" @click="closeDialog"></i>
      </v-card-title>

      <v-row no-gutters>
        <v-col cols="8">
          <TaskDescription :task="task" />
          <TaskActivity :task="task" />
        </v-col>

        <v-col cols="4">
          <TaskDetail :task="task" />
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import TaskDescription from "@/components/TaskDescription.vue";
import TaskDetail from "@/components/TaskDetail.vue";
import TaskActivity from "@/components/TaskActivity.vue";

export default {
  name: "project-task-detail",

  components: {
    TaskDescription,
    TaskDetail,
    TaskActivity,
  },

  props: {
    value: Boolean,
    task: Object,
  },

  computed: {
    showTaskDetailDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },

  data() {
    return {
      isEditting: false,
      content: this.task.description,
    };
  },

  methods: {
    closeDialog() {
      this.isEditting = false;
      this.showTaskDetailDialog = false;
    },

    saveTaskChange() {
      console.log(this.content);
    },
  },
};
</script>

<style scoped>
.task-info {
  padding: 4px 20px 18px 16px;
}

.task-icon {
  margin-right: 10px;
  color: #42a5f5;
}

.task-key {
  font-size: 15px;
  margin-right: 5px;
  font-weight: 400;
}

.flex-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.task-name {
  font-size: 22px;
  font-weight: 500;
}

.feature-label {
  font-size: 14px;
  font-weight: 500;
  color: #172b4d;
}

.task-description {
  text-align: start;
  padding: 0px 10px;
}

.task-description p {
  margin-bottom: 0px !important;
}
</style>