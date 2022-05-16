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
        >
          Start Sprint
        </v-btn>
        <v-btn
          v-if="sprint.status === 2"
          small
          depressed
          color="grey lighten-2"
          class="mr-2"
        >
          Complete Sprint
        </v-btn>

        <div>
          <i
            small
            class="fas fa-pen fa-2xs mr-2"
            @click="showEditSprintDialog = true"
          ></i>

          <i class="fas fa-trash fa-2xs"></i>
        </div>
      </v-card-title>

      <v-card-actions>
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
              @input="handleProjectName"
              @keyup.enter="submit"
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
                @input="menuEndDate = false"
              ></v-date-picker>
            </v-menu>
          </v-card-text>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showEditSprintDialog = false"> Save </v-btn>

          <v-btn color="primary" @click="showEditSprintDialog = false">
            Cancel
          </v-btn>
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
      menuStartDate: false,
      menuEndDate: false,
      startDate: "",
      endDate: "",
      sprintName: this.sprint.name,
    };
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

.v-text-field__slot {
  height: 40px !important;
}
</style>