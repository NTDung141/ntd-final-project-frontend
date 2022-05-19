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
      :key="sprint.name"
      :sprint="sprint"
      :disableBtn="Boolean(isDisableStartSprintBtn())"
      @start-sprint="startSprint"
      @delete-sprint="deleteSprint"
      @complete-sprint="completeSprint"
      @update-sprint="updateSprint"
    />

    <ProjectBacklogList @create-sprint="createSprint" />
  </div>
</template>

<script>
import ProjectBacklogList from "@/components/ProjectBacklogList.vue";
import ProjectSprintItem from "@/components/ProjectSprintItem.vue";
import axios from "axios";
import Cookies from "js-cookie";
import { SPRINT_API } from "@/factories/sprint.js";
import { CookieService } from "@/services/CookieService.js";

export default {
  name: "project-backlog",

  components: {
    ProjectBacklogList,
    ProjectSprintItem,
  },

  data() {
    return {
      projectId: this.$route.params.id,
      project: {},
      sprints: [
        { id: 1, name: "Sprint 1", status: 2 },
        { id: 2, name: "Sprint 2", status: 1 },
        { id: 3, name: "25 Sprint 32", status: 1 },
      ],
    };
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
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
            this.project = res.data.project;
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
            this.project = res.data.project;
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
            this.project = res.data.project;
            this.isDisableStartSprintBtn();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteSprint(id) {
      axios
        .delete(SPRINT_API.deleteSprintApi(id), {
          headers: CookieService.authHeader(),
          data: {},
        })
        .then((res) => {
          if (res.data && res.data.project) {
            this.project = res.data.project;
            this.isDisableStartSprintBtn();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateSprint(data) {
      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("name", data.name);
      formData.append("start_date", data.startDate);
      formData.append("end_date", data.endDate);
      for (var value of formData.values()) {
        console.log(value);
      }

      axios
        .post(SPRINT_API.updateApi, formData, {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          console.log(res);
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
  padding: 20px 30px;
  overflow-x: hidden;
}
</style>