<template>
  <div class="project-sprint">
    <v-card elevation="0" class="project-sprint-item">
      <v-card-title>
        <div class="project-sprint-item-title">{{ sprint.name }}</div>

        <v-spacer></v-spacer>

        <v-btn
          v-if="sprint.status === 1"
          small
          depressed
          color="grey lighten-2"
          :disabled="disableBtn"
          class="mr-2"
          @click="startSprint"
        >
          Start Sprint
        </v-btn>
        <v-btn
          v-if="sprint.status === 2"
          small
          depressed
          color="grey lighten-2"
          class="mr-2"
          @click="completeSprint"
        >
          Complete Sprint
        </v-btn>
        <div v-if="sprint.status === 3" class="project-sprint-completed">
          Completed
        </div>

        <div class="project-sprint-actions" v-if="sprint.status !== 3">
          <i
            small
            class="fas fa-pen fa-2xs mr-2"
            @click="showEditSprintDialog = true"
          ></i>

          <i
            small
            class="fas fa-trash fa-2xs"
            @click="showDeleteSprintDialog = true"
          ></i>
        </div>
      </v-card-title>

      <v-card-actions v-if="sprint.status !== 3">
        <v-btn small text class="project-sprint-item-create-task">
          <i class="fas fa-plus mr-2"></i>
          Create issue
        </v-btn>
      </v-card-actions>
    </v-card>

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
              <div class="required-label">*</div>
            </div>

            <v-menu
              v-model="menuStartDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startDate"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startDate"
                :max="endDate"
                @input="menuStartDate = false"
              ></v-date-picker>
            </v-menu>

            <div class="project-sprint-dialog-label">
              End date
              <div class="required-label">*</div>
            </div>

            <v-menu
              v-model="menuEndDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endDate"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="endDate"
                :min="startDate"
                @input="menuEndDate = false"
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
  </div>
</template>

<script>
export default {
  name: "project-sprint-item",

  props: {
    sprint: Object,
    disableBtn: Boolean,
  },

  data() {
    return {
      showEditSprintDialog: false,
      showDeleteSprintDialog: false,
      menuStartDate: false,
      menuEndDate: false,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      sprintName: this.sprint.name,
      nameRules: [
        (value) => !!value || "Name is required.",
        (value) => (value && value.length <= 50) || "Max 50 characters",
      ],
    };
  },

  computed: {
    startDateComputed() {
      return new Date(this.startDate).toISOString().slice(0, 10);
    },

    endDateComputed() {
      return new Date(this.endDate).toISOString().slice(0, 10);
    },
  },

  methods: {
    startSprint() {
      this.$emit("start-sprint", this.sprint.id);
    },

    completeSprint() {
      this.$emit("complete-sprint", this.sprint.id);
    },

    deleteSprint() {
      this.$emit("delete-sprint", this.sprint.id);
      this.showDeleteSprintDialog = false;
    },

    updateSprint() {
      let data = {
        id: this.sprint.id,
        name: this.sprintName,
        startDate: this.startDate,
        endDate: this.endDate,
      };
      this.$emit("update-sprint", data);
      this.showEditSprintDialog = false;
    },

    closeEditDialog() {
      this.sprintName = this.sprint.name;
      this.startDate = this.sprint.startDate;
      this.endDate = this.sprint.endDate;
    },
  },
};
</script>

<style scoped>
.project-sprint {
  margin-bottom: 30px;
}

.project-sprint-item {
  width: 100%;
  background: #f4f5f7 !important;
  border-radius: 5px;
}

.project-sprint-item-title {
  font-size: 16px;
}

.project-sprint-item-create-task {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 30px;
}

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

.project-sprint-completed {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  margin-right: 8px;
}

.project-sprint-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>