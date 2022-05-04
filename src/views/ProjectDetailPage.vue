<template>
  <div class="project-detail-page">
    <ProjectDetail :project="project" />

    <ProjectDetailAccess :members="project.users" />

    <ProjectDetailSprint />
  </div>
</template>

<script>
import ProjectDetail from "@/components/ProjectDetail.vue";
import ProjectDetailAccess from "@/components/ProjectDetailAccess.vue";
import ProjectDetailSprint from "@/components/ProjectDetailSprint.vue";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "project-detail-page",

  data() {
    return {
      projectId: this.$route.params.id,
      project: {},
    };
  },

  components: {
    ProjectDetail,
    ProjectDetailAccess,
    ProjectDetailSprint,
  },

  beforeMount() {
    console.log(this.projectId);
    const accessToken = Cookies.get("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get(`http://127.0.0.1:8000/api/auth/project/${this.projectId}`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        if (res.data && res.data.project) {
          this.project = res.data.project;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.project-detail-page {
  padding: 8px 20% 60px 20%;
  height: 100%;
  width: 99%;
  overflow-x: hidden;
}
</style>