<template>
  <div class="project-page">
    <TheSideBar :projectId="projectId" />

    <router-view></router-view>
  </div>
</template>

<script>
import TheSideBar from "@/components/TheSideBar.vue";
import { CookieService } from "@/services/CookieService.js";
import PROJECT_ACTIONS from "@/store/modules/project/project-actions";
import { mapActions } from "vuex";
import axios from "axios";
import { PROJECT_API } from "@/factories/project.js";
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

  methods: {
    ...mapActions({ updateProject: PROJECT_ACTIONS.updateProject }),
  },

  beforeMount() {
    axios
      .get(PROJECT_API.getProjectByIdApi(this.projectId), {
        headers: CookieService.authHeader(),
      })
      .then((res) => {
        if (res.data && res.data.project) {
          this.updateProject(res.data.project);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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