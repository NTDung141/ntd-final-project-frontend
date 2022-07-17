<template>
  <div class="project-detail-access">
    <v-card elevation="0">
      <v-card-title>
        <div class="project-detail-title">Access</div>

        <v-spacer></v-spacer>

        <v-btn
          small
          depressed
          color="primary"
          @click="openDialog"
          :disabled="role == 2"
        >
          Add people
        </v-btn>

        <v-dialog v-model="showAddPeopleDialog" max-width="500px">
          <v-card class="add-people-form">
            <v-card-title class="add-people-form-title">
              Add people
            </v-card-title>
            <v-autocomplete
              v-model="friends"
              :items="people"
              filled
              chips
              label="Select"
              item-text="name"
              return-object
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img src=""></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>

              <template v-slot:item="data">
                <template>
                  <v-list-item-avatar size="30">
                    <img src="@/assets/defaultAvatar2.jpg" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ data.item.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>

            <v-card-actions class="add-people-form-actions">
              <v-btn @click="showAddPeopleDialog = false">Cancel</v-btn>
              <v-btn
                color="primary"
                :loading="saveButtonLoading"
                @click="submit"
                >Add</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
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

      <v-data-table :headers="headers" :items="project.users" :search="search">
        <template v-slot:[`item.role`]="{ item }">
          <div v-if="item.pivot.role === 1">Administrator</div>
          <div v-else>Member</div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon v-if="role == 1" x-small @click="deleteItem">
            fas fa-trash
          </v-icon>

          <ProjectDetailAccessRemovePersonDialog
            v-model="showRemovePersonDialog"
            :project="project"
            :user="item"
            @update-project="updateProject"
          />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
// import { mapGetters } from "vuex";
// import PROJECT_GETTERS from "@/store/modules/project/project-getters.js";
import ProjectDetailAccessRemovePersonDialog from "@/components/ProjectDetailAccessRemovePersonDialog.vue";
import { integer } from "vuelidate/lib/validators";

export default {
  name: "project-detail-access",

  props: {
    project: Object,
    role: integer,
  },

  components: {
    ProjectDetailAccessRemovePersonDialog,
  },

  // computed: {
  //   ...mapGetters({
  //     project: PROJECT_GETTERS.project,
  //   }),
  // },

  data() {
    return {
      search: "",
      saveButtonLoading: false,
      showAddPeopleDialog: false,
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
      people: [],
      friends: [],
      showRemovePersonDialog: false,
    };
  },

  methods: {
    remove(item) {
      const index = this.friends.indexOf(item);
      if (index >= 0) this.friends.splice(index, 1);
    },

    openDialog() {
      this.showAddPeopleDialog = true;
      this.loadPeopleList();
    },

    loadPeopleList() {
      const accessToken = Cookies.get("accessToken");

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      axios
        .get("http://127.0.0.1:8000/api/auth/get-all", {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          if (res.data && res.data.users) {
            this.people = res.data.users;

            for (var i = 0; i < this.people.length; i++) {
              const personId = this.people[i].id;

              let personIndex = this.project.users.findIndex(
                (person) => person.id === personId
              );

              if (personIndex !== -1) {
                this.people.splice(i, 1);
                i--;
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submit() {
      this.saveButtonLoading = true;

      const accessToken = Cookies.get("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const formData = new FormData();
      formData.append("projectId", this.project.id);
      formData.append("people", JSON.stringify(this.friends));

      axios
        .post(`http://127.0.0.1:8000/api/project/update/add-people`, formData, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          this.showAddPeopleDialog = false;
          this.saveButtonLoading = false;
          if (res.data && res.data.project) {
            this.$emit("update-project", res.data.project);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteItem() {
      this.showRemovePersonDialog = true;
    },

    updateProject(project) {
      this.$emit("update-project", project);
    },
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
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

.add-people-form {
  padding: 20px 15px 20px 15px;
}

.add-people-form-title {
  padding: 0px 0px 20px !important;
}

.add-people-form-actions {
  justify-content: flex-end;
}

.v-list-item__title {
  display: flex;
  justify-content: flex-start;
}
</style>