<template>
  <v-card-text>
    <div class="feature-label flex-start mb-3">Subtask</div>

    <div class="subtask-list">
      <div class="empty-subtask" v-if="subtaskList && subtaskList.length < 1">
        There are no subtask in this task
      </div>

      <SubtaskItem
        v-for="subtask in subtaskList"
        :key="subtask.id"
        :subtask="subtask"
      />

      <v-text-field
        v-if="isCreating"
        dense
        v-model="newSubtaskName"
        @keyup.enter="createNewSubtask"
        outlined
      >
        <template slot="append-outer">
          <v-btn
            small
            color="primary"
            class="mr-1"
            @click="createNewSubtask"
            :disabled="!newSubtaskName"
          >
            <i class="fas fa-check"></i>
          </v-btn>

          <v-btn small @click="cancelCreateNewSubtask">
            <i class="fas fa-times"></i>
          </v-btn>
        </template>
      </v-text-field>

      <v-btn
        v-if="!isCreating"
        small
        text
        class="create-subtask-btn"
        @click="isCreating = true"
      >
        <i class="fas fa-plus mr-2"></i>
        Create subtask
      </v-btn>
    </div>
  </v-card-text>
</template>

<script>
import SubtaskItem from "@/components/SubtaskItem.vue";
export default {
  name: "subtask-list",

  components: {
    SubtaskItem,
  },

  data() {
    return {
      // subtaskList: [
      //   { id: 1, name: "Subtask", status: 1 },
      //   { id: 2, name: "Subtask", status: 1 },
      //   { id: 3, name: "Subtask", status: 1 },
      //   { id: 4, name: "Subtask", status: 1 },
      //   { id: 5, name: "Subtask", status: 1 },
      // ],

      subtaskList: [],

      newSubtaskName: "",
      isCreating: false,
    };
  },

  methods: {
    createNewSubtask() {
      if (this.newSubtaskName) {
        this.isCreating = false;
      } else {
        this.isCreating = true;
      }
    },

    cancelCreateNewSubtask() {
      this.isCreating = false;
      this.newSubtaskName = "";
    },
  },
};
</script>

<style scoped>
.subtask-list {
  display: block;
  width: 100%;
}

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

.create-subtask-btn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 30px;
  font-size: 13px;
}

.empty-subtask {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 100%;
  padding: 5px 10px;
  font-size: 14px;
  margin-bottom: 5px;
  border: 2px dashed #dfe1e6;
  border-radius: 3px;
  color: #6b778c;
}
</style>