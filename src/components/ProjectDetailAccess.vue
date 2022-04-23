<template>
  <div class="project-detail-access">
    <v-card elevation="0">
      <v-card-title>
        <div class="project-detail-title">Access</div>

        <v-spacer></v-spacer>

        <v-btn small depressed color="primary" to="/my-project/create">
          Add people
        </v-btn>
      </v-card-title>

      <v-text-field
        class="access-search-input"
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

      <v-data-table :headers="headers" :items="members" :search="search">
        <!-- <template v-slot:[`item.status`]="{ item }">
          <div :class="'project-status ' + getStatusClass(item.status)">
            {{ getStatus(item.status) }}
          </div>
        </template> -->

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
  name: "project-detail-access",

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
          width: "35%",
        },
        { text: "Email", value: "email", width: "35%" },
        { text: "Role", value: "role", width: "30%" },
        {
          text: "",
          value: "actions",
          sortable: false,
          align: "end",
          width: "10%",
        },
      ],
      members: [
        { name: "Nguyen Thanh Dung", email: "ntdung.dut@gmail.com", role: 1 },
        { name: "Nguyen Thanh Dung", email: "ntdung.dut@gmail.com", role: 1 },
        { name: "Nguyen Thanh Dung", email: "ntdung.dut@gmail.com", role: 1 },
        { name: "Nguyen Thanh Dung", email: "ntdung.dut@gmail.com", role: 1 },
        { name: "Nguyen Thanh Dung", email: "ntdung.dut@gmail.com", role: 1 },
      ],
    };
  },
};
</script>

<style scoped>
.project-detail-access {
  margin-bottom: 40px;
}

.access-search-input {
  width: 25%;
}
</style>