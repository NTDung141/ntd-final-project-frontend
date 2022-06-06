<template>
  <div class="project-backlog">
    <div class="project-link">
      <router-link to="/my-project">My Project</router-link>
      <span class="ml-1 mr-1">/</span>
      <router-link :to="`/my-project/${this.projectId}`">
        {{ project.name }}
      </router-link>
    </div>
    <ProjectSprintItem
      v-for="sprint in project.sprints"
      :key="sprint.id"
      :sprint="sprint"
      :disableBtn="Boolean(isDisableStartSprintBtn())"
      :projectKey="project.key"
      :projectId="project.id"
      @start-sprint="startSprint"
      @complete-sprint="completeSprint"
    />

    <ProjectBacklogList @create-sprint="createSprint" />
  </div>
</template>

<script>
import ProjectBacklogList from "@/components/ProjectBacklogList.vue";
import ProjectSprintItem from "@/components/ProjectSprintItem.vue";
import axios from "axios";
import { SPRINT_API } from "@/factories/sprint.js";
import { CookieService } from "@/services/CookieService.js";
import PROJECT_ACTIONS from "@/store/modules/project/project-actions";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import PROJECT_GETTERS from "@/store/modules/project/project-getters.js";
import { PROJECT_API } from "@/factories/project.js";
import SIDEBAR_ACTIONS from "@/store/modules/sidebar/sidebar-actions.js";

export default {
  name: "project-backlog",

  components: {
    ProjectBacklogList,
    ProjectSprintItem,
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
    this.changeTabIndex(0);

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

    isDisableStartSprintBtn() {
      let isDisable = false;
      this.project.sprints.forEach((sprint) => {
        if (sprint.status === 2) {
          isDisable = true;
        }
      });
      return isDisable;
    },

    createSprint() {
      const formData = new FormData();
      formData.append("name", this.createNewSprintName());
      formData.append("project_id", this.projectId);
      axios
        .post(SPRINT_API.createApi, formData, {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          if (res.data && res.data.project) {
            this.updateProject(res.data.project);
            this.isDisableStartSprintBtn();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    createNewSprintName() {
      if (this.project.sprints.length < 1) {
        return "Sprint 1";
      } else {
        let lastSprint = this.project.sprints[this.project.sprints.length - 1];
        let lastSprintNumberArr = lastSprint.name.match(/\d+/g);
        if (lastSprintNumberArr.length < 1) {
          return "Sprint 2";
        } else {
          let newSprintNumber =
            parseInt(lastSprintNumberArr[lastSprintNumberArr.length - 1]) + 1;
          return "Sprint " + newSprintNumber;
        }
      }
    },

    startSprint(id) {
      axios
        .post(SPRINT_API.startSprintApi(id), null, {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          if (res.data && res.data.project) {
            this.updateProject(res.data.project);
            this.isDisableStartSprintBtn();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    completeSprint(id) {
      axios
        .post(SPRINT_API.compeleteSprintApi(id), null, {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          if (res.data && res.data.project) {
            this.updateProject(res.data.project);
            this.isDisableStartSprintBtn();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.project-backlog {
  width: 96%;
  height: 100%;
  padding: 20px 30px 150px 30px;
  overflow-x: hidden;
  margin-bottom: 30px;
}
</style>