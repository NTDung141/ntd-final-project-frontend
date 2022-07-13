<template>
  <v-dialog v-model="showTaskDetailDialog" max-width="1200px" max-height="100%">
    <v-card elevation="0" class="task-info">
      <v-card-title>
        <i class="fas fa-check-square task-icon"></i>
        <div class="task-key">{{ project.key + "-" + task.key }}</div>
        <v-spacer></v-spacer>
        <i class="fas fa-times" @click="closeDialog"></i>
      </v-card-title>

      <v-row no-gutters>
        <v-col cols="8">
          <TaskDescription
            :task="task"
            :showTaskDetailDialog="showTaskDetailDialog"
          />

          <SubtaskList :task="task" />

          <TaskActivity
            :task="task"
            :commentList="commentList"
            :showTaskDetailDialog="showTaskDetailDialog"
          />
        </v-col>

        <v-col cols="4">
          <TaskDetail
            :task="task"
            :project="project"
            :showTaskDetailDialog="showTaskDetailDialog"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import TaskDescription from "@/components/TaskDescription.vue";
import TaskDetail from "@/components/TaskDetail.vue";
import TaskActivity from "@/components/TaskActivity.vue";
import { mapGetters, mapActions } from "vuex";
import PROJECT_GETTERS from "@/store/modules/project/project-getters.js";
import axios from "axios";
import { CookieService } from "@/services/CookieService.js";
import { TASK_API } from "@/factories/task.js";
import REALTIMECOMMENT_ACTIONS from "@/store/modules/realtimeComment/realtimeComment-actions";
import REALTIMECOMMENT_GETTERS from "@/store/modules/realtimeComment/realtimeComment-getters";
import SubtaskList from "@/components/SubtaskList.vue";

export default {
  name: "project-task-detail",

  components: {
    TaskDescription,
    TaskDetail,
    TaskActivity,
    SubtaskList,
  },

  props: {
    value: Boolean,
    task: Object,
  },

  computed: {
    ...mapGetters({
      project: PROJECT_GETTERS.project,
      commentList: REALTIMECOMMENT_GETTERS.commentList,
    }),

    showTaskDetailDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },

  data() {
    return {
      isEditting: false,
      content: this.task.description,
    };
  },

  methods: {
    ...mapActions({
      replaceCommentList: REALTIMECOMMENT_ACTIONS.replaceCommentList,
    }),

    closeDialog() {
      this.isEditting = false;
      this.showTaskDetailDialog = false;
    },

    saveTaskChange() {
      console.log(this.content);
    },

    fetchTaskInfo() {
      axios
        .get(TASK_API.getByIdApi(this.task.id), {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          if (res.data && res.data.task) {
            this.replaceCommentList(res.data.task.comments);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  watch: {
    showTaskDetailDialog() {
      this.replaceCommentList([]);
      if (this.showTaskDetailDialog) {
        this.fetchTaskInfo();
      }
    },
  },
};
</script>

<style scoped>
.task-info {
  padding: 4px 20px 18px 16px;
}

.task-icon {
  margin-right: 10px;
  color: #42a5f5;
}

.task-key {
  font-size: 15px;
  margin-right: 5px;
  font-weight: 400;
}

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
  padding: 0px 10px;
}

.task-description p {
  margin-bottom: 0px !important;
}
</style>