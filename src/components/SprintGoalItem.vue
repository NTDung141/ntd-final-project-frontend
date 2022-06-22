<template>
  <div class="sprint-goal">
    <v-card elevation="0" class="sprint-goal-item">
      <v-card-title>
        <div class="sprint-goal-item-title">{{ sprint.name }}</div>

        <v-spacer></v-spacer>

        <div v-if="sprint.status === 3" class="sprint-goal-completed">
          Completed
          <i class="fas fa-check completed-icon ml-2"></i>
        </div>

        <div class="sprint-goal-actions" v-if="sprint.status !== 3">
          <v-btn small color="primary" @click="onEdit">Edit</v-btn>
        </div>
      </v-card-title>

      <div
        class="empty-content"
        v-if="
          (!sprint.goal || sprint.goal === '' || sprint.goal === 'null') &&
          !isEditting
        "
      >
        There are no goal in this sprint
      </div>

      <div
        class="content"
        v-if="sprint.goal && !isEditting && sprint.goal !== 'null'"
        v-html="sprint.goal"
      ></div>

      <v-card-text v-if="isEditting">
        <vue-editor v-model="content"></vue-editor>
        <v-card-actions>
          <v-btn color="primary" small @click="changeGoal">Save</v-btn>
          <v-btn small @click="cancelChangeGoal">Cancel</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import { SPRINT_API } from "@/factories/sprint.js";
import { CookieService } from "@/services/CookieService.js";
import PROJECT_ACTIONS from "@/store/modules/project/project-actions";
import { mapActions } from "vuex";
export default {
  name: "sprint-goal-item",

  props: {
    sprint: Object,
  },

  components: {
    VueEditor,
  },

  data() {
    return {
      content: this.sprint.goal,
      isEditting: false,
    };
  },

  beforeMount() {
    if (this.sprint.goal) {
      this.content = this.sprint.goal;
    }
  },

  methods: {
    ...mapActions({ updateProject: PROJECT_ACTIONS.updateProject }),

    onEdit() {
      if (this.sprint.goal && this.sprint.goal !== "null") {
        this.content = this.sprint.goal;
      } else {
        this.content = "";
      }
      this.isEditting = true;
    },

    changeGoal() {
      const formData = new FormData();
      formData.append("id", this.sprint.id);
      if (this.content !== "") {
        formData.append("goal", this.content);
      } else {
        formData.append("goal", null);
      }

      console.log(this.content);

      axios
        .post(SPRINT_API.updateApi, formData, {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          this.updateProject(res.data.project);
          this.content = this.sprint.goal;
        })
        .catch((err) => {
          console.log(err.response.data);
          this.content = this.sprint.goal;
        });

      this.isEditting = false;
    },

    cancelChangeGoal() {
      if (this.sprint.goal) {
        this.content = this.sprint.goal;
      }

      this.isEditting = false;
    },
  },
};
</script>

<style scoped>
.sprint-goal {
  margin-bottom: 30px;
}

.sprint-goal-item {
  width: 100%;
  background: #f4f5f7 !important;
  border-radius: 5px;
  padding: 0px 10px 20px 10px;
}

.sprint-goal-item-title {
  font-size: 16px;
}

.sprint-goal-item-create-task {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 30px;
}

.sprint-goal-completed {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  margin-right: 8px;
}

.sprint-goal-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.empty-content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  min-height: 40px;
  border: 2px dashed #dfe1e6;
  border-radius: 3px;
  font-size: 14px;
  color: #6b778c;
}

.content {
  display: block;
  margin-top: 5px;
  min-height: 40px;
  border-radius: 3px;
  font-size: 16px;
  color: #6b778c;
  background-color: #fff;
  padding: 10px 10px;
  text-align: left;
}

.completed-icon {
  color: #1976d2;
}
</style>