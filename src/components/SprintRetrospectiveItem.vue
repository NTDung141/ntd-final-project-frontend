<template>
  <div class="sprint-retro">
    <v-card elevation="0" class="sprint-retro-item">
      <v-card-title>
        <div class="sprint-retro-item-title">{{ sprint.name }}</div>

        <v-spacer></v-spacer>

        <div v-if="sprint.status === 3" class="sprint-retro-completed">
          Completed
          <i class="fas fa-check completed-icon ml-2"></i>
        </div>

        <div class="sprint-retro-actions" v-if="sprint.status !== 3">
          <v-btn small color="primary" @click="onEdit">Edit</v-btn>
        </div>
      </v-card-title>

      <div
        class="empty-content"
        v-if="
          (!sprint.retrospective ||
            sprint.retrospective === '' ||
            sprint.retrospective === 'null') &&
          !isEditting
        "
      >
        There are no retrospective in this sprint
      </div>

      <div
        class="content"
        v-if="
          sprint.retrospective && !isEditting && sprint.retrospective !== 'null'
        "
        v-html="sprint.retrospective"
      ></div>

      <v-card-text v-if="isEditting">
        <vue-editor class="sprint-retro-editor" v-model="content"></vue-editor>
        <v-card-actions>
          <v-btn color="primary" small @click="changeRetro">Save</v-btn>
          <v-btn small @click="cancelChangeRetro">Cancel</v-btn>
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
  name: "sprint-retrospective-item",

  props: {
    sprint: Object,
  },

  components: {
    VueEditor,
  },

  data() {
    return {
      content: this.sprint.retrospective,
      isEditting: false,
    };
  },

  beforeMount() {
    if (this.sprint.retrospective) {
      this.content = this.sprint.retrospective;
    }
  },

  methods: {
    ...mapActions({ updateProject: PROJECT_ACTIONS.updateProject }),

    onEdit() {
      if (this.sprint.retrospective && this.sprint.retrospective !== "null") {
        this.content = this.sprint.retrospective;
      } else {
        this.content = "";
      }
      this.isEditting = true;
    },

    changeRetro() {
      const formData = new FormData();
      formData.append("id", this.sprint.id);
      if (this.content !== "") {
        formData.append("retrospective", this.content);
      } else {
        formData.append("retrospective", null);
      }

      axios
        .post(SPRINT_API.updateApi, formData, {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          this.updateProject(res.data.project);
        })
        .catch((err) => {
          console.log(err.response.data);
          this.content = this.sprint.retrospective;
        });

      this.isEditting = false;
    },

    cancelChangeRetro() {
      if (this.sprint.retrospective) {
        this.content = this.sprint.retrospective;
      }

      this.isEditting = false;
    },
  },
};
</script>

<style scoped>
.sprint-retro {
  margin-bottom: 30px;
}

.sprint-retro-item {
  width: 100%;
  background: #f4f5f7 !important;
  border-radius: 5px;
  padding: 0px 10px 20px 10px;
}

.sprint-retro-item-title {
  font-size: 16px;
}

.sprint-retro-item-create-task {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 30px;
}

.sprint-retro-completed {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  margin-right: 8px;
}

.sprint-retro-actions {
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

/* .content li::marker {
  margin-left: 3px;
} */

.completed-icon {
  color: #1976d2;
}

.sprint-retro-editor {
  background-color: #fff;
}
</style>