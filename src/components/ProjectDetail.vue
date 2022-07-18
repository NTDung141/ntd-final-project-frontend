<template>
  <div class="project-detail">
    <v-card elevation="0">
      <v-card-title>
        <div class="project-detail-title">Details</div>
      </v-card-title>

      <v-card-text class="project-detail-content">
        <div class="project-detail-details">
          <v-form v-model="formValid" @submit.prevent="submit">
            <div class="project-detail-label">Name</div>
            <v-text-field
              v-model="projectName"
              :rules="nameRules"
              @input="handleProjectName"
              @change="isDisableSaveButton"
              dense
              outlined
              :disabled="role == 2"
            ></v-text-field>

            <div class="project-detail-label">Key</div>
            <v-text-field
              v-model="projectKey"
              :rules="keyRules"
              @input="handleProjectKey"
              @change="isDisableSaveButton"
              dense
              outlined
              :disabled="role == 2"
            ></v-text-field>

            <div class="project-detail-label">
              <v-btn
                small
                depressed
                color="primary"
                @click="submit"
                :disabled="isDisableSaveButton"
              >
                Save</v-btn
              >
            </div>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import { integer } from "vuelidate/lib/validators";

export default {
  name: "project-detail",

  data() {
    return {
      projectId: "",
      projectName: "",
      projectKey: "",
      formValid: true,

      keyRules: [
        (value) => !!value || "Key is required.",
        (value) => (value && value.length <= 6) || "Max 6 characters",
      ],

      nameRules: [
        (value) => !!value || "Name is required.",
        (value) => (value && value.length <= 50) || "Max 50 characters",
      ],
    };
  },

  props: {
    project: Object,
    role: integer,
  },

  methods: {
    handleProjectName() {
      const sep = /\s/;
      const projectNameArr = this.projectName.split(sep);

      this.autoUpperCaseFirstLetter(projectNameArr);
    },

    handleProjectKey() {
      this.projectKey = this.projectKey.toUpperCase().replace(" ", "");
    },

    autoUpperCaseFirstLetter(projectNameArr) {
      let newProjectName = "";
      for (let item of projectNameArr) {
        newProjectName += item.charAt(0).toUpperCase() + item.slice(1) + " ";
      }
      this.projectName = newProjectName.trim();
    },

    submit() {
      const accessToken = Cookies.get("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const formData = new FormData();
      formData.append("id", this.projectId);
      formData.append("name", this.projectName);
      formData.append("key", this.projectKey);

      axios
        .post(`http://127.0.0.1:8000/api/project/update/name-key`, formData, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          if (res.data && res.data.updatedProject) {
            const updatedProject = res.data.updatedProject;
            this.changeNameAndKey(updatedProject.name, updatedProject.key);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    changeNameAndKey(newName, newKey) {
      this.$emit("change-name-and-key", newName, newKey);
    },
  },

  computed: {
    isDisableSaveButton() {
      if (
        (this.project.name !== this.projectName ||
          this.project.key !== this.projectKey) &&
        this.formValid
      ) {
        return false;
      } else {
        return true;
      }
    },
  },

  watch: {
    project() {
      this.projectName = this.project.name;
      this.projectKey = this.project.key;
      this.projectId = this.project.id;
    },
  },
};
</script>

<style scoped>
.project-detail {
  margin-bottom: 40px;
}

.project-detail-content {
  margin: 8px 0px;
}

.project-detail-details {
  padding: 0px 25%;
}

.project-detail-label {
  display: flex;
  margin-bottom: 5px;
  font-weight: 500;
}

.combobox-item-name {
  display: flex !important;
  align-items: flex-start !important;
  padding: 0px 5px;
}
</style>