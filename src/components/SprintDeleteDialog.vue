<template>
  <v-dialog v-model="showDeleteSprintDialog" max-width="400px">
    <v-card elevation="0">
      <v-card-title>
        <i class="fas fa-exclamation-triangle fa-sm delete-dialog-icon"></i>
        Delete Sprint
      </v-card-title>

      <v-card-text>
        <div class="delete-dialog-content">
          Are you sure you want to delete
          <div class="delete-dialog-sprint-name">
            {{ sprint.name }}
          </div>
          ?
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small color="error" @click="deleteSprint"> Delete </v-btn>

        <v-btn small @click="showDeleteSprintDialog = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { SPRINT_API } from "@/factories/sprint.js";
import { CookieService } from "@/services/CookieService.js";
import PROJECT_ACTIONS from "@/store/modules/project/project-actions";
import { mapActions } from "vuex";

export default {
  name: "sprint-delete-dialog",

  props: {
    value: Boolean,
    sprint: Object,
  },

  data() {
    return {};
  },

  computed: {
    showDeleteSprintDialog: {
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

    deleteSprint() {
      axios
        .delete(SPRINT_API.deleteSprintApi(this.sprint.id), {
          headers: CookieService.authHeader(),
          data: {},
        })
        .then((res) => {
          if (res.data && res.data.project) {
            this.updateProject(res.data.project);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      this.showDeleteSprintDialog = false;
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

.delete-dialog-sprint-name {
  font-weight: 500;
  margin-left: 4px;
}

.delete-dialog-icon {
  color: #ff5252;
  margin-right: 5px;
}
</style>