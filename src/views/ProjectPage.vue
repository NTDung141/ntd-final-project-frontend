<template>
  <div class="project-page">
    <TheSideBar />
  </div>
</template>

<script>
import TheSideBar from "@/components/TheSideBar.vue";
export default {
  name: "project-page",

  components: {
    TheSideBar,
  },
};
</script>

<style scoped>
.project-page {
  width: 100%;
  height: 100%;
}
</style>