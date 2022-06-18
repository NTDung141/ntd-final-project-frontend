<template>
  <v-dialog v-model="showCompleteSprintDialog" max-width="500px">
    <v-card elevation="0">
      <v-card-title> Complete {{ sprint.name }} </v-card-title>

      <v-form>
        <div class="complete-dialog-body">
          <v-card-text>
            <div class="complete-dialog-content">This sprint contains:</div>
            <ul>
              <li>
                <div class="complete-dialog-content-2">
                  {{
                    sprint.tasks ? sprint.tasks.length - openedTask.length : 0
                  }}
                  completed issues
                </div>
              </li>
              <li>
                <div class="complete-dialog-content-2">
                  {{ openedTask.length }} opened issues
                </div>
              </li>
            </ul>
          </v-card-text>

          <v-card-text>
            <div class="complete-dialog-content">Move opened issues to</div>

            <v-autocomplete
              v-model="chosenSprint"
              :items="sprints"
              item-value="id"
              item-text="name"
              chips
              dense
              outlined
            >
              <template v-slot:selection="data">
                <div class="flex-start">
                  {{ data.item.name }}
                </div>
              </template>

              <template v-slot:item="data">
                <template>
                  <v-list-item-content>
                    <v-list-item-title class="flex-start">
                      {{ data.item.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-card-text>
        </div>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small color="primary" @click="completeSprint">
          Complete sprint
        </v-btn>

        <v-btn small @click="showCompleteSprintDialog = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import PROJECT_GETTERS from "@/store/modules/project/project-getters.js";

export default {
  name: "sprint-complete-dialog",

  props: {
    value: Boolean,
    sprint: Object,
  },

  data() {
    return {
      sprints: [],
      chosenSprint: null,
      openedTask: [],
    };
  },

  beforeMount() {
    if (this.project.sprints) {
      this.sprints = this.project.sprints.filter(
        (sprint) => sprint.id !== this.sprint.id && sprint.status === 1
      );
    }

    this.sprints.unshift({ id: 0, name: "Backlog" });

    this.chosenSprint = this.sprints[1];

    if (this.sprint.tasks) {
      this.openedTask = this.sprint.tasks.filter((task) => task.status !== 4);
    }
  },

  computed: {
    ...mapGetters({
      project: PROJECT_GETTERS.project,
    }),

    showCompleteSprintDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },

  methods: {
    completeSprint() {
      this.showCompleteSprintDialog = false;

      let formData = new FormData();
      formData.append("complete_sprint", this.sprint);
      formData.append("move_to", this.chosenSprint);
    },
  },
};
</script>

<style scoped>
.complete-dialog-body {
  padding: 0px 8px;
}

.complete-dialog-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font: 15px;
  font-weight: 500;
  margin-bottom: 10px;
}

.complete-dialog-content-2 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font: 15px;
  font-weight: 400;
}

.flex-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>