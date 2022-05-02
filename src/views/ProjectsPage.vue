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
        <template v-slot:[`item.status`]="{ item }">
          <div :class="'project-status ' + getStatusClass(item.status)">
            {{ getStatus(item.status) }}
          </div>
        </template>

        <template v-slot:[`item.lead`]="{ item }">
          <v-avatar size="20" class="mr-2">
            <img src="@/assets/defaultAvatar2.jpg" />
          </v-avatar>
          {{ item.lead }}
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
import Cookies from "js-cookie";

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
        { text: "Status", value: "status", width: "20%" },
        { text: "Lead", value: "lead", width: "20%" },
        {
          text: "",
          value: "actions",
          sortable: false,
          align: "end",
          width: "10%",
        },
      ],
      projects: [
        {
          name: "Frozen Yogurt",
          key: "FY",
          status: 1,
          lead: "Nguyen Thanh Dung",
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          key: "ICS",
          status: 2,
          lead: "Le Canh Kieu Oanh",
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          key: "EC",
          status: 3,
          lead: "Nguyen Thanh Dung",
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          key: "CC",
          status: 4,
          lead: "Le Canh Kieu Oanh",
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          key: "GB",
          status: 1,
          lead: "Nguyen Thanh Dung",
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          key: "JB",
          status: 2,
          lead: "Le Canh Kieu Oanh",
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          key: "LP",
          status: 3,
          lead: "Nguyen Thanh Dung",
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          key: "HC",
          status: 4,
          lead: "Le Canh Kieu Oanh",
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          key: "DO",
          status: 1,
          lead: "Nguyen Thanh Dung",
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          key: "KK",
          status: 2,
          lead: "Le Canh Kieu Oanh",
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },

  mounted() {
    const accessToken = Cookies.get("accessToken");
    console.log("token", accessToken);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get("http://127.0.0.1:8000/api/auth/project/get-all", {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    getStatus(status) {
      if (status === 1) {
        return "Opened";
      }
      if (status === 2) {
        return "In Progress";
      }
      if (status === 3) {
        return "Released";
      }
      if (status === 4) {
        return "Closed";
      }
    },

    getStatusClass(status) {
      if (status === 1) {
        return "status-1";
      }
      if (status === 2) {
        return "status-2";
      }
      if (status === 3) {
        return "status-3";
      }
      if (status === 4) {
        return "status-4";
      }
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