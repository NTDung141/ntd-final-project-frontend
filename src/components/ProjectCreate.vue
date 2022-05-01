<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card elevation="0">
      <v-toolbar>
        <v-btn icon @click="show = false">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <div class="project-create">
        <v-form v-model="formValid" @submit.prevent="submit">
          <v-card-title class="project-create-title">
            <div class="project-title">Create Project</div>
          </v-card-title>

          <v-card-subtitle>
            <div class="project-subtitle">
              You can change these details anytime in your project settings.
            </div>
          </v-card-subtitle>

          <div class="project-create-label">
            Name
            <div class="required-label">*</div>
          </div>
          <v-text-field
            v-model="projectName"
            :rules="nameRules"
            @input="autoGetKey"
            dense
            outlined
          ></v-text-field>

          <div class="project-create-label">
            Key
            <div class="required-label">*</div>
          </div>
          <v-text-field
            class="project-create-key-input"
            v-model="projectKey"
            :rules="keyRules"
            dense
            outlined
          >
            <template v-slot:append>
              <v-menu offset-x right max-width="200px">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-on="on" v-bind="attrs" color="primary">
                    fas fa-info-circle
                  </v-icon>
                </template>

                <v-card>
                  <v-card-text>
                    Choose a descriptive prefix for your project’s issue keys
                  </v-card-text>
                </v-card>
              </v-menu>
            </template>
          </v-text-field>

          <div class="project-create-label">
            <v-btn
              color="primary"
              type="submit"
              :disabled="!projectName || !projectKey || !formValid"
              >Save</v-btn
            >
          </div>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "project-create",

  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(50) },
    key: { required, maxLength: maxLength(10) },
  },

  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },

    nameErrors() {
      const errors = [];
      if (this.show) {
        if (!this.$v.email.$dirty) {
          return errors;
        }
        if (!this.$v.email.required) {
          errors.push("Project name is required");
        }
        return errors;
      } else {
        return errors;
      }
    },

    keyErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) {
        return errors;
      }
      if (!this.$v.password.required) {
        errors.push("Key is required");
      }
      return errors;
    },
  },

  props: ["visible"],

  data() {
    return {
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

  methods: {
    submit() {
      console.log(this.formValid);
      let data = new FormData();
      data.append("name", this.projectName);
      data.append("key", this.projectKey);

      this.projectName = "";
      this.projectKey = "";

      const accessToken = Cookies.get("accessToken");
      console.log("token", accessToken);
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      axios
        .post("http://127.0.0.1:8000/api/auth/project/create", data, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      this.show = false;
    },

    autoGetKey() {
      const sep = /\s/;
      const projectNameArr = this.projectName.split(sep);

      let newKey = "";
      let keyCounter = 0;
      for (let item of projectNameArr) {
        if (keyCounter < 6) {
          newKey += item.charAt(0).toUpperCase();
          keyCounter++;
        } else {
          break;
        }
      }
      this.projectKey = newKey;
    },
  },
};
</script>

<style scoped>
.project-create {
  height: 100%;
  padding: 30px 30%;
  overflow-x: hidden;
}

.project-create-title {
  padding: 16px 0px !important;
}

.project-title {
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 10px;
}

.v-card__subtitle {
  padding-left: 0px !important;
}

.project-subtitle {
  display: flex;
  justify-content: flex-start;
}

.project-create-label {
  display: flex;
  margin-bottom: 5px;
  font-weight: 500;
}

.required-label {
  display: flex;
  align-items: flex-start;
  color: red;
}

.project-create-key-input {
  width: 50%;
}
</style>