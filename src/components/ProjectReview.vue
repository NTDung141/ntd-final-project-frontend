<template>
  <div class="project-review">
    <div class="project-link">
      <router-link to="/my-project">My Project</router-link>
      <span class="ml-1 mr-1">/</span>
      <router-link :to="`/my-project/${this.projectId}`">
        {{ project.name }}
      </router-link>
    </div>

    <div class="project-review-header">
      <div class="review-name">Review</div>
    </div>

    <div class="project-review-header">
      <v-text-field
        class="search-bar"
        dense
        outlined
        append-icon="fas fa-search"
      ></v-text-field>
    </div>

    <SprintReviewItem
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
import SprintReviewItem from "@/components/SprintReviewItem.vue";
export default {
  name: "project-review",

  components: {
    SprintReviewItem,
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
    this.changeTabIndex(3);

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
.project-review {
  width: 96%;
  height: 100%;
  padding: 20px 30px 150px 30px;
  overflow-x: hidden;
  margin-bottom: 30px;
}

.project-review-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
}

.search-bar {
  max-width: 300px !important;
}

.review-name {
  font-size: 23px;
  font-weight: 500;
}
</style>