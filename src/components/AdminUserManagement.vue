<template>
  <div class="admin-user-management-page">
    <v-card elevation="0" class="use-management-card" color="#f6f7fb">
      <v-card-title>
        <div class="user-management-table-title">Users</div>
      </v-card-title>

      <v-text-field
        class="user-search-input"
        v-model="search"
        dense
        label="Search"
        outlined
        type="text"
      >
        <template v-slot:append>
          <v-icon small>fas fa-search</v-icon>
        </template>
      </v-text-field>

      <v-data-table :headers="headers" :items="users" :search="search">
        <template v-slot:[`item.name`]="{ item }">
          <v-avatar size="20" class="mr-2">
            <img src="@/assets/defaultAvatar2.jpg" />
          </v-avatar>
          {{ item.name }}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small color="error" v-if="item.is_blocked === 0">Block</v-btn>
          <v-btn small color="primary" v-if="item.is_blocked === 1"
            >Unblock</v-btn
          >
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { AUTH_API } from "@/factories/auth.js";
import { CookieService } from "@/services/CookieService.js";

export default {
  name: "admin-user-management",

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
          width: "40%",
        },
        { text: "Created at", value: "created_at", width: "20%" },
        { text: "Updated at", value: "updated_at", width: "20%" },
        {
          text: "",
          value: "actions",
          sortable: false,
          align: "end",
          width: "20%",
        },
      ],
      users: [],
    };
  },

  mounted() {
    axios
      .get(AUTH_API.getAllUserApi, {
        headers: CookieService.authHeader(),
      })
      .then((res) => {
        if (res.data && res.data.users) {
          this.users = res.data.users;
          console.log(res.data.users);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.admin-user-management-page {
  height: 100%;
  width: 99%;
  padding: 30px 30px 100px 30px;
  margin-bottom: 50px;
  overflow-x: hidden;
}

.user-management-table-title {
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 10px;
}

.user-search-input {
  width: 25%;
}

.use-management-card {
  padding: 15px 15px !important;
  border-radius: 5px;
  height: 100%;
}
</style>