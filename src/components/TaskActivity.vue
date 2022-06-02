<template>
  <v-card-text>
    <div class="feature-label flex-start mb-3">Activity</div>

    <div class="task-comment">
      <v-avatar size="30" class="mr-3">
        <img src="@/assets/defaultAvatar2.jpg" />
      </v-avatar>

      <v-text-field outlined dense></v-text-field>
    </div>
  </v-card-text>
</template>

<script>
export default {
  name: "task-activity",

  props: {
    task: Object,
  },
};
</script>

<style scoped>
.feature-label {
  font-size: 14px;
  font-weight: 500;
  color: #172b4d;
}

.flex-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.task-comment {
  display: flex;
  justify-content: flex-start;
}
</style>