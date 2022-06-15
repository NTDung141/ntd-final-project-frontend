<template>
  <v-dialog v-model="showEditSprintDialog" max-width="500px">
    <v-card elevation="0">
      <v-card-title> Edit Sprint </v-card-title>

      <v-form>
        <v-card-text>
          <div class="project-sprint-dialog-label">
            Name
            <div class="required-label">*</div>
          </div>

          <v-text-field
            v-model="sprintName"
            :rules="nameRules"
            dense
            outlined
          ></v-text-field>

          <div class="project-sprint-dialog-label">
            Start date
            <div v-if="sprint.status === 2" class="required-label">*</div>
          </div>

          <v-menu
            v-model="menuStartDate"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="computedStartDate"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                dense
                :filled="startDate ? false : true"
                :append-icon="startDate ? 'fas fa-times-circle' : ''"
                @click:append="clearStartDate"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startDatePicked"
              :max="endDate ? endDate : false"
              @change="menuStartDate = false"
              no-title
              scrollable
            ></v-date-picker>
          </v-menu>

          <div class="project-sprint-dialog-label">
            End date
            <div v-if="sprint.status === 2" class="required-label">*</div>
          </div>

          <v-menu
            v-model="menuEndDate"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="computedEndDate"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                dense
                :filled="endDate ? false : true"
                :append-icon="endDate ? 'fas fa-times-circle' : ''"
                @click:append="clearEndDate"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDatePicked"
              :min="startDate ? startDate : false"
              @input="menuEndDate = false"
              no-title
              scrollable
            ></v-date-picker>
          </v-menu>
        </v-card-text>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="updateSprint"> Save </v-btn>

        <v-btn @click="showEditSprintDialog = false"> Cancel </v-btn>
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
  name: "sprint-edit-dialog",

  props: {
    value: Boolean,
    sprint: Object,
  },

  beforeMount() {
    this.sprintName = this.sprint.name;

    if (this.sprint.start_date) {
      this.startDate = this.sprint.start_date.slice(0, 10);
    }

    if (this.sprint.end_date) {
      this.endDate = this.sprint.end_date.slice(0, 10);
    }
  },

  data() {
    return {
      sprintName: "",
      menuStartDate: false,
      menuEndDate: false,
      startDate: "",
      endDate: "",
      startDatePicked: new Date().toISOString(),
      endDatePicked: new Date().toISOString(),
      nameRules: [
        (value) => !!value || "Name is required.",
        (value) => (value && value.length <= 50) || "Max 50 characters",
      ],
    };
  },

  computed: {
    showEditSprintDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },

    computedStartDate() {
      if (this.startDate) {
        return this.startDate;
      } else {
        return "e.g  " + new Date().toISOString().slice(0, 10);
      }
    },

    computedEndDate() {
      if (this.endDate) {
        return this.endDate;
      } else {
        return "e.g  " + new Date().toISOString().slice(0, 10);
      }
    },
  },

  methods: {
    ...mapActions({ updateProject: PROJECT_ACTIONS.updateProject }),

    updateSprint() {
      const formData = new FormData();
      formData.append("id", this.sprint.id);
      formData.append("name", this.sprintName);
      formData.append("start_date", this.startDate);
      formData.append("end_date", this.endDate);

      axios
        .post(SPRINT_API.updateApi, formData, {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          this.updateProject(res.data.project);
        })
        .catch((err) => {
          console.log(err.response.data);
        });

      this.showEditSprintDialog = false;
    },

    clearStartDate() {
      this.startDate = "";
    },

    clearEndDate() {
      this.endDate = "";
    },
  },

  watch: {
    startDatePicked() {
      this.startDate = this.startDatePicked;
    },

    endDatePicked() {
      this.endDate = this.endDatePicked;
    },
  },
};
</script>

<style scoped>
.project-sprint-dialog-label {
  display: flex;
  margin-bottom: 5px;
  font-weight: 500;
}

.required-label {
  display: flex;
  align-items: flex-start;
  color: red;
}
</style>