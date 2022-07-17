<template>
  <v-dialog v-model="showRemovePersonDialog" max-width="400px">
    <v-card elevation="0">
      <v-card-title>
        <i class="fas fa-exclamation-triangle fa-sm delete-dialog-icon"></i>
        Remove person
      </v-card-title>

      <v-card-text>
        <div class="delete-dialog-content">
          Remove
          <div class="delete-dialog-user-name mr-1">
            {{ user.name }}
          </div>
          from the project?
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small color="error" @click="removePerson"> Remove </v-btn>

        <v-btn small @click="showRemovePersonDialog = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { PROJECT_API } from "@/factories/project.js";
import { CookieService } from "@/services/CookieService.js";
import PROJECT_ACTIONS from "@/store/modules/project/project-actions";
import { mapActions } from "vuex";

export default {
  name: "project-detail-access-remove-person-dialog",

  props: {
    value: Boolean,
    user: Object,
    project: Object,
  },

  data() {
    return {};
  },

  computed: {
    showRemovePersonDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },

  methods: {
    ...mapActions({ updateProject: PROJECT_ACTIONS.updateProject }),

    removePerson() {
      var formData = new FormData();
      formData.append("project_id", this.project.id);
      formData.append("user_id", this.user.id);
      axios
        .post(PROJECT_API.removePeopleApi, formData, {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          if (res.data && res.data.project) {
            this.updateProject(res.data.project);
            this.$emit("update-project", res.data.project);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });

      this.showRemovePersonDialog = false;
    },
  },
};
</script>

<style scoped>
.delete-dialog-content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.delete-dialog-user-name {
  font-weight: 500;
  margin-left: 4px;
}

.delete-dialog-icon {
  color: #ff5252;
  margin-right: 5px;
}
</style>