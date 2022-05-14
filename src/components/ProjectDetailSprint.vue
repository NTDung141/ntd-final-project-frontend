<template>
  <div class="project-detail-sprint">
    <v-card elevation="0">
      <v-card-title>
        <div class="project-detail-title">Sprints</div>

        <v-spacer></v-spacer>

        <v-btn small depressed color="primary" to="/my-project/create">
          Create
        </v-btn>
      </v-card-title>

      <v-text-field
        class="sprint-search-input"
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

      <v-data-table :headers="headers" :items="sprints" :search="search">
        <template v-slot:[`item.status`]="{ item }">
          <div :class="'sprint-status ' + getStatusClass(item.status)">
            {{ getStatus(item.status) }}
          </div>
        </template>

        <!-- <template v-slot:[`item.lead`]="{ item }">
          <v-avatar size="20" class="mr-2">
            <img src="@/assets/defaultAvatar2.jpg" />
          </v-avatar>
          {{ item.lead }}
        </template> -->

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon x-small @click="deleteItem(item)"> fas fa-trash </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "project-detail-sprint",

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
          width: "30%",
        },
        { text: "Start date", value: "startDate", width: "20%" },
        { text: "End date", value: "endDate", width: "20%" },
        { text: "Status", value: "status", width: "20%" },
        {
          text: "",
          value: "actions",
          sortable: false,
          align: "end",
          width: "10%",
        },
      ],
      sprints: [
        {
          name: "Sprint 1",
          startDate: "1/1/2022",
          endDate: "14/1/2022",
          status: 1,
        },
        {
          name: "Sprint 2",
          startDate: "1/1/2022",
          endDate: "14/1/2022",
          status: 2,
        },
        {
          name: "Sprint 3",
          startDate: "1/1/2022",
          endDate: "14/1/2022",
          status: 3,
        },
        {
          name: "Sprint 4",
          startDate: "1/1/2022",
          endDate: "14/1/2022",
          status: 4,
        },
        {
          name: "Sprint 5",
          startDate: "1/1/2022",
          endDate: "14/1/2022",
          status: 1,
        },
      ],
    };
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
.project-detail-sprint {
  margin-bottom: 40px;
}

.sprint-search-input {
  width: 25%;
}

.sprint-status {
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