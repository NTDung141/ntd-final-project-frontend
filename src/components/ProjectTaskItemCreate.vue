<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card elevation="0">
      <v-card-title> Create Task </v-card-title>

      <v-form v-model="formValid" @submit.prevent="createTask">
        <v-card-text>
          <div class="project-task-dialog-label">
            Name
            <div class="required-label">*</div>
          </div>

          <v-text-field
            v-model="taskName"
            :rules="nameRules"
            @keyup.enter="createTask"
            dense
            outlined
          ></v-text-field>
        </v-card-text>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit" :disabled="!this.formValid">
          Save
        </v-btn>

        <v-btn @click="show = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { integer } from "vuelidate/lib/validators";

export default {
  name: "project-task-item-create",

  props: {
    value: Boolean,
    projectKey: String,
    projectId: integer,
    sprintId: integer,
  },

  data() {
    return {
      taskName: "",
      nameRules: [
        (value) => !!value || "Name is required.",
        (value) => (value && value.length <= 100) || "Max 100 characters",
      ],
      formValid: true,
    };
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },

  methods: {
    createTask() {
      const newTask = new FormData();
      newTask.append("name", this.taskName);
      newTask.append("key", this.projectKey);
      newTask.append("sprint_id", this.sprintId);
      newTask.append("project_id", this.projectId);
      this.$emit("create-task", newTask);
      this.show = false;
      this.taskName = "";
    },
  },
};
</script>

<style scoped>
.project-task-dialog-label {
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