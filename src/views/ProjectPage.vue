<template>
  <div class="project-page">
    <TheSideBar :projectId="projectId" />

    <router-view></router-view>
  </div>
</template>

<script>
import TheSideBar from "@/components/TheSideBar.vue";
export default {
  name: "project-page",

  data() {
    return {
      projectId: this.$route.params.id,
    };
  },

  components: {
    TheSideBar,
  },
};
</script>

<style scoped>
.project-page {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>