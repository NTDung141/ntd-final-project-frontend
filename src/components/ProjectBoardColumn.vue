<template>
  <v-card class="mr-6" elevation="0" color="grey lighten-4" width="270px">
    <v-card-title>
      <div class="column-title">{{ columnName }}</div>
    </v-card-title>

    <v-card-text v-if="!activeSprint && columnStatus === 1">
      <div class="no-active-sprint">
        <div class="flex-center">
          <v-img
            height="128px"
            width="128px"
            :src="require('../assets/scrum2x.png')"
          ></v-img>
        </div>

        <div class="no-active-sprint-content-bold">
          You haven't started a sprint
        </div>

        <div class="no-active-sprint-content">
          You can't do anything on your board because you haven't started a
          sprint yet. Go to the backlog to plan and start a sprint.
        </div>
      </div>

      <v-btn depressed color="grey lighten-2" small @click="goToProjectBacklog"
        >Go to Backlog</v-btn
      >
    </v-card-text>

    <div class="task-list" v-if="activeSprint">
      <BoardTaskItem
        v-for="task in taskList"
        :key="task.id"
        :task="task"
        :projectKey="projectKey"
      />
    </div>
  </v-card>
</template>

<script>
import BoardTaskItem from "@/components/BoardTaskItem.vue";
import { integer } from "vuelidate/lib/validators";
export default {
  name: "project-board-column",

  props: {
    activeSprint: Object,
    columnStatus: integer,
    columnName: String,
    projectKey: String,
  },

  components: {
    BoardTaskItem,
  },

  computed: {
    taskList() {
      let taskList = this.activeSprint.tasks.filter(
        (task) => task.status === this.columnStatus
      );
      return taskList;
    },
  },

  methods: {
    goToProjectBacklog() {
      this.$emit("go-to-project-backlog");
    },
  },
};
</script>

<style scoped>
.column-title {
  font-size: 12px;
  font-weight: 500;
  color: #5e6c84;
  text-transform: uppercase;
}

.no-active-sprint {
  display: block;
}

.no-active-sprint-content-bold {
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}

.no-active-sprint-content {
  text-align: center;
  font-size: 14px;
  margin-bottom: 15px;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-list {
  padding: 5px 7px 10px 7px;
}
</style>