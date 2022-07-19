<template>
  <v-card-text>
    <div class="feature-label flex-start mb-3">Comments</div>

    <div class="task-comment-list" :ref="`list-${task.id}`">
      <div
        class="task-comment-item"
        v-for="comment in commentList"
        :key="comment.id"
      >
        <div class="task-comment-item-show" v-if="comment.task_id === task.id">
          <v-avatar size="30" class="mr-3">
            <img src="@/assets/defaultAvatar2.jpg" />
          </v-avatar>

          <div class="comment-data">
            <div class="comment-sender">{{ comment.user.name }}</div>
            <div class="comment-content">{{ comment.content }}</div>
          </div>

          <v-spacer></v-spacer>

          <div class="comment-icon-delete">
            <i class="fas fa-trash mr-2" @click="deleteComment(comment)"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="task-comment">
      <v-avatar size="30" class="mr-3">
        <img src="@/assets/defaultAvatar2.jpg" />
      </v-avatar>

      <v-text-field
        v-model="comment"
        outlined
        dense
        @keyup.enter="sendComment"
      ></v-text-field>
    </div>
  </v-card-text>
</template>

<script>
import axios from "axios";
import { CookieService } from "@/services/CookieService.js";
import { COMMENT_API } from "@/factories/comment.js";
export default {
  name: "task-activity",

  props: {
    task: Object,
    commentList: Array,
  },

  computed: {
    commentListComputed() {
      if (this.task.id) {
        return this.commentList.filter(
          (comment) => comment.task_id === this.task.id
        );
      } else {
        return [];
      }
    },
  },

  data() {
    return {
      comment: "",
    };
  },

  methods: {
    sendComment() {
      if (this.comment) {
        let formData = new FormData();
        formData.append("task_id", this.task.id);
        formData.append("content", this.comment);

        axios
          .post(COMMENT_API.createApi, formData, {
            headers: CookieService.authHeader(),
          })
          .then((res) => {
            if (res.data && res.data.newComment) {
              console.log(res.data.newComment);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      this.comment = "";
    },

    deleteComment(item) {
      axios
        .delete(COMMENT_API.deleteApi(item.id), {
          headers: CookieService.authHeader(),
        })
        .then((res) => {
          if (res.data && res.data.deletedComment) {
            console.log(res.data.deletedComment);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
};
</script>

<style scoped>
.feature-label {
  font-size: 14px;
  font-weight: 500;
  color: #172b4d;
}

.flex-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.task-comment {
  display: flex;
  justify-content: flex-start;
}

.task-comment-list {
  display: block;
  width: 100%;
  overflow: auto;
  max-height: 180px;
}

.task-comment-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
}

.task-comment-item-show {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.comment-icon-delete {
  display: none;
}

.task-comment-item-show:hover .comment-icon-delete {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.comment-data {
  display: block;
}

.comment-sender {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 500;
}

.comment-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>