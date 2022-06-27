<template>
  <div class="project-page">
    <v-card elevation="0">
      <v-card-title class="project-page-title">
        <div class="project-title">Project</div>

        <v-spacer></v-spacer>

        <v-btn depressed color="primary" @click.stop="showProjectCreate = true">
          Create
        </v-btn>

        <ProjectCreate
          :visible="showProjectCreate"
          @close="showProjectCreate = false"
          @fetch-project-list="fetchProjectList"
        />
      </v-card-title>

      <v-text-field
        class="project-page-search-input"
        v-model="search"
        dense
        clearable
        label="Search"
        outlined
        type="text"
      >
        <template v-slot:append>
          <v-icon small>fas fa-search</v-icon>
        </template>
      </v-text-field>

      <v-data-table :headers="headers" :items="projects" :search="search">
        <template v-slot:[`item.name`]="{ item }">
          <router-link :to="`/my-project/${item.id}`">{{
            item.name
          }}</router-link>
        </template>

        <template v-slot:[`item.created_at`]="{ item }">
          <div>{{ item.created_at }}</div>
        </template>

        <template v-slot:[`item.lead`]="{ item }">
          <div v-for="user in item.users" :key="user.id">
            <div v-if="user.pivot.role === 1">
              <v-avatar size="20" class="mr-2">
                <img src="@/assets/defaultAvatar2.jpg" />
              </v-avatar>
              {{ user.name }}
            </div>
          </div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon x-small class="mr-2" @click="editItem(item)">
            fas fa-pen
          </v-icon>
          <v-icon x-small @click="deleteItem(item)"> fas fa-trash </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
  
<script>
import ProjectCreate from "@/components/ProjectCreate.vue";
import axios from "axios";
import { PROJECT_API } from "@/factories/project.js";
import { CookieService } from "@/services/CookieService.js";

export default {
  name: "projects-page",

  components: {
    ProjectCreate,
  },

  data() {
    return {
      showProjectCreate: false,
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
          width: "30%",
        },
        { text: "Key", value: "key", width: "20%" },
        { text: "Created at", value: "created_at", width: "20%" },
        { text: "Lead", value: "lead", width: "20%" },
        {
          text: "",
          value: "actions",
          sortable: false,
          align: "end",
          width: "10%",
        },
      ],
      projects: [],
    };
  },

  mounted() {
    this.fetchProjectList();
  },

  methods: {
    editItem(item) {
      this.$router.push(`/my-project/settings/${item.id}`);
    },

    deleteItem(item) {
      axios
        .delete(PROJECT_API.deleteApi(item.id), {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          if (res.data && res.data.projects) {
            this.projects = res.data.projects;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchProjectList() {
      axios
        .get(PROJECT_API.getAllApi, {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          if (res.data && res.data.projects) {
            this.projects = res.data.projects;
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
.project-page {
  height: 100%;
  width: 99%;
  padding: 30px 30px 100px 30px;
  margin-bottom: 50px;
  overflow-x: hidden;
}

.project-page-title {
  padding: 16px 0px !important;
}

.project-page-search-input {
  width: 25%;
}

.project-title {
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 10px;
}

.project-status {
  padding: 2px 3px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
}

.status-1 {
  background-color: #ef9a9a;
  color: #c62828;
}

.status-2 {
  background-color: #90caf9;
  color: #1565c0;
}

.status-3 {
  background-color: #a5d6a7;
  color: #2e7d32;
}

.status-4 {
  background-color: #b0bec5;
  color: #37474f;
}
</style>