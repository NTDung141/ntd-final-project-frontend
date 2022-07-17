<template>
  <div class="project-detail-page">
    <div class="project-link">
      <router-link to="/my-project">My Project</router-link>
      <span class="ml-1 mr-1">/</span>

      <router-link :to="`/my-project/${this.projectId}`">
        {{ project.name }}
      </router-link>
      <span class="ml-1 mr-1">/</span>

      <router-link :to="`/my-project/settings/${this.projectId}`">
        Project settings
      </router-link>
    </div>

    <ProjectDetail
      :project="project"
      @change-name-and-key="changeNameAndKey"
      :role="roleInProject"
    />

    <ProjectDetailAccess
      :project="project"
      @update-project="updateProject"
      :role="roleInProject"
    />
  </div>
</template>

<script>
import ProjectDetail from "@/components/ProjectDetail.vue";
import ProjectDetailAccess from "@/components/ProjectDetailAccess.vue";
import axios from "axios";
import Cookies from "js-cookie";
import { mapGetters } from "vuex";
import AUTHENTICATION_GETTERS from "@/store/modules/authentication/authentication-getters";

export default {
  name: "project-detail-page",

  data() {
    return {
      projectId: this.$route.params.id,
      project: {},
      roleInProject: 0,
    };
  },

  components: {
    ProjectDetail,
    ProjectDetailAccess,
  },

  computed: {
    ...mapGetters({
      userInfo: AUTHENTICATION_GETTERS.userInfo,
    }),
  },

  beforeMount() {
    const accessToken = Cookies.get("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get(`http://127.0.0.1:8000/api/project/${this.projectId}`, {
        headers: headers,
      })
      .then((res) => {
        if (res.data && res.data.project) {
          this.project = res.data.project;
          this.checkRoleInProject(res.data.project);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    changeNameAndKey(newName, newKey) {
      this.project.name = newName;
      this.project.key = newKey;
      console.log(this.project);
    },

    updateProject(project) {
      this.project = project;
    },

    checkRoleInProject(project) {
      project.users.forEach((member) => {
        if (member.id == this.userInfo.id) {
          this.roleInProject = member.pivot.role;
        }
      });
    },
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