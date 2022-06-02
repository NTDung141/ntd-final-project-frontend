<template>
  <div>
    <v-card-text>
      <div
        v-if="!isEditTaskName"
        class="task-name task-feature-value flex-start mb-2"
        @click="isEditTaskName = true"
      >
        {{ task.name }}
      </div>

      <v-text-field v-if="isEditTaskName" v-model="taskName" outlined>
        <template slot="append-outer">
          <v-btn small class="mr-1">
            <i class="fas fa-check"></i>
          </v-btn>

          <v-btn small @click="isEditTaskName = false">
            <i class="fas fa-times"></i>
          </v-btn>
        </template>
      </v-text-field>
    </v-card-text>

    <v-card-text>
      <div class="feature-label flex-start mb-3">Description</div>

      <div
        v-if="!isEditting && task.description"
        v-html="task.description"
        class="task-description task-feature-value"
        @click="isEditting = true"
      ></div>

      <div
        v-if="!isEditting && !task.description"
        class="task-description task-feature-value"
      >
        There is no description
      </div>
    </v-card-text>

    <v-card-text v-if="isEditting">
      <vue-editor v-model="content"></vue-editor>
      <v-card-actions>
        <v-btn color="primary" small>Save</v-btn>
        <v-btn small @click="isEditting = false">Cancel</v-btn>
      </v-card-actions>
    </v-card-text>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "task-description",

  props: {
    task: Object,
  },

  components: {
    VueEditor,
  },

  data() {
    return {
      isEditting: false,
      isEditTaskName: false,
      content: this.task.description,
      taskName: this.task.name,
    };
  },
};
</script>

<style scoped>
.flex-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.task-name {
  font-size: 22px;
  font-weight: 500;
}

.feature-label {
  font-size: 14px;
  font-weight: 500;
  color: #172b4d;
}

.task-description {
  text-align: start;
  padding: 15px 15px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
}

.task-feature-value {
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
}

.task-feature-value:hover {
  background-color: #d1d1d1;
}

.v-application p {
  margin-bottom: 0px !important;
}
</style>