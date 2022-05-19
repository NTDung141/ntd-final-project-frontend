<template>
  <div class="project-backlog-list">
    <v-card elevation="0">
      <v-card-title>
        <div class="project-backlog-list-title">Backlog</div>

        <v-spacer></v-spacer>

        <v-btn small depressed @click="createSprint"> Create Sprint </v-btn>
      </v-card-title>

      <v-card-actions>
        <v-btn small text class="project-backlog-list-create-task">
          <i class="fas fa-plus mr-2"></i>
          Create issue
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "project-backlog-list",

  methods: {
    createSprint() {
      this.$emit("create-sprint");
    },
  },
};
</script>

<style scoped>
.project-backlog-list {
  width: 100%;
  border-radius: 5px;
}

.project-backlog-list-title {
  font-size: 16px;
}

.project-backlog-list-create-task {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 30px;
}
.mr-2 {
  margin-right: 2px;
}
</style>