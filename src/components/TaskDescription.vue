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

      <v-text-field
        v-if="isEditTaskName"
        v-model="taskName"
        @keyup.enter="changeName"
        outlined
      >
        <template slot="append-outer">
          <v-btn
            small
            color="primary"
            class="mr-1"
            @click="changeName"
            :disabled="!taskName"
          >
            <i class="fas fa-check"></i>
          </v-btn>

          <v-btn small @click="cancelChangeName">
            <i class="fas fa-times"></i>
          </v-btn>
        </template>
      </v-text-field>
    </v-card-text>

    <v-card-text>
      <div class="feature-label flex-start mb-3">Description</div>

      <div
        v-if="!isEditting && task.description && task.description !== 'null'"
        v-html="this.task.description"
        class="task-description task-feature-value"
        @click="onEditDescription"
      ></div>

      <div
        v-if="
          !isEditting &&
          (!task.description ||
            task.description === '' ||
            task.description === 'null')
        "
        class="task-description task-feature-value"
        @click="onEditDescription"
      >
        There is no description
      </div>
    </v-card-text>

    <v-card-text v-if="isEditting">
      <vue-editor v-model="content"></vue-editor>
      <v-card-actions>
        <v-btn color="primary" small @click="changeDescription">Save</v-btn>
        <v-btn small @click="cancelChangeDescription">Cancel</v-btn>
      </v-card-actions>
    </v-card-text>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import { CookieService } from "@/services/CookieService.js";
import { TASK_API } from "@/factories/task.js";
import PROJECT_ACTIONS from "@/store/modules/project/project-actions";
import { mapActions } from "vuex";

export default {
  name: "task-description",

  props: {
    task: Object,
    showTaskDetailDialog: Boolean,
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

  methods: {
    ...mapActions({ updateProject: PROJECT_ACTIONS.updateProject }),

    onEditDescription() {
      if (this.task.description && this.task.description !== "null") {
        this.content = this.task.description;
      } else {
        this.content = "";
      }
      this.isEditting = true;
    },

    updateTaskAxios(updateTask) {
      axios
        .post(TASK_API.updateApi, updateTask, {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          if (res.data && res.data.project) {
            this.updateProject(res.data.project);
            this.content = this.task.description;
          }
        })
        .catch((err) => {
          console.log(err);
          this.content = this.task.description;
        });
    },

    changeName() {
      const updateTask = new FormData();
      updateTask.append("id", this.task.id);
      updateTask.append("name", this.taskName);

      this.isEditTaskName = false;

      this.updateTaskAxios(updateTask);
    },

    cancelChangeName() {
      this.taskName = this.task.name;
      this.isEditTaskName = false;
    },

    changeDescription() {
      const updateTask = new FormData();
      updateTask.append("id", this.task.id);
      if (this.content !== "") {
        updateTask.append("description", this.content);
      } else {
        updateTask.append("description", null);
      }

      this.isEditting = false;

      this.updateTaskAxios(updateTask);
    },

    cancelChangeDescription() {
      this.content = this.task.description;
      this.isEditting = false;
    },
  },

  watch: {
    showTaskDetailDialog() {
      if (!this.showTaskDetailDialog) {
        this.isEditting = false;
        this.isEditTaskName = false;
      }
    },
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