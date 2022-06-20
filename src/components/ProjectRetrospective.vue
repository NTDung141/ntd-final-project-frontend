<template>
  <div class="project-retro">
    <div class="project-link">
      <router-link to="/my-project">My Project</router-link>
      <span class="ml-1 mr-1">/</span>
      <router-link :to="`/my-project/${this.projectId}`">
        {{ project.name }}
      </router-link>
    </div>

    <div class="project-retro-header">
      <div class="retro-name">Retrospective</div>
    </div>

    <div class="project-retro-header">
      <v-text-field
        class="search-bar"
        dense
        outlined
        append-icon="fas fa-search"
      ></v-text-field>
    </div>

    <SprintRetrospectiveItem
      v-for="sprint in project.sprints"
      :key="sprint.id"
      :sprint="sprint"
    />
  </div>
</template>

<script>
import axios from "axios";
import { CookieService } from "@/services/CookieService.js";
import PROJECT_ACTIONS from "@/store/modules/project/project-actions";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import PROJECT_GETTERS from "@/store/modules/project/project-getters.js";
import { PROJECT_API } from "@/factories/project.js";
import SIDEBAR_ACTIONS from "@/store/modules/sidebar/sidebar-actions.js";
import SprintRetrospectiveItem from "@/components/SprintRetrospectiveItem.vue";
export default {
  name: "project-retrospective",

  components: {
    SprintRetrospectiveItem,
  },

  computed: {
    ...mapGetters({
      project: PROJECT_GETTERS.project,
    }),
  },

  data() {
    return {
      projectId: this.$route.params.id,
    };
  },

  beforeMount() {
    this.changeTabIndex(4);

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

  methods: {
    ...mapActions({
      updateProject: PROJECT_ACTIONS.updateProject,
      changeTabIndex: SIDEBAR_ACTIONS.changeTabIndex,
    }),
  },
};
</script>

<style scoped>
.project-retro {
  width: 96%;
  height: 100%;
  padding: 20px 30px 150px 30px;
  overflow-x: hidden;
  margin-bottom: 30px;
}

.project-retro-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
}

.search-bar {
  max-width: 300px !important;
}

.retro-name {
  font-size: 23px;
  font-weight: 500;
}
</style>