<template>
  <div class="project-detail-page">
    <ProjectDetail />

    <ProjectDetailAccess />

    <ProjectDetailSprint />
  </div>
</template>

<script>
import ProjectDetail from "@/components/ProjectDetail.vue";
import ProjectDetailAccess from "@/components/ProjectDetailAccess.vue";
import ProjectDetailSprint from "@/components/ProjectDetailSprint.vue";

export default {
  name: "project-detail-page",

  components: {
    ProjectDetail,
    ProjectDetailAccess,
    ProjectDetailSprint,
  },
};
</script>

<style scoped>
.project-detail-page {
  padding: 8px 20% 60px 20%;
  height: 100%;
  overflow-x: hidden;
}
</style>