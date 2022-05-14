<template>
  <div class="register-page">
    <form>
      <v-card class="register-form" elevation="5">
        <v-card-title class="register-form-title">Sign up</v-card-title>

        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="50"
          label="Full name"
          outlined
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
          @keyup.enter="submitRegister"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          :counter="50"
          label="E-mail"
          outlined
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          @keyup.enter="submitRegister"
        ></v-text-field>

        <v-text-field
          :type="isShowPassword ? 'text' : 'password'"
          :append-icon="isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
          @click:append="isShowPassword = !isShowPassword"
          v-model="password"
          :error-messages="passwordErrors"
          :counter="50"
          label="Password"
          outlined
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          @keyup.enter="submitRegister"
        ></v-text-field>

        <v-text-field
          :type="isShowConfirmPassword ? 'text' : 'password'"
          :append-icon="
            isShowConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'
          "
          @click:append="isShowConfirmPassword = !isShowConfirmPassword"
          v-model="confirmPassword"
          :error-messages="confirmPasswordErrors"
          :counter="50"
          label="Password"
          outlined
          required
          @input="$v.confirmPassword.$touch()"
          @blur="$v.confirmPassword.$touch()"
          @keyup.enter="submitRegister"
        ></v-text-field>

        <v-btn
          block
          depressed
          color="primary"
          @click="submitRegister"
          :loading="loading"
        >
          Sign up
        </v-btn>
      </v-card>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { AUTH_API } from "@/factories/auth";
import { validationMixin } from "vuelidate";
import { required, maxLength, email, sameAs } from "vuelidate/lib/validators";

export default {
  name: "register-page",

  mixins: [validationMixin],

  validations: {
    email: { required, email, maxLength: maxLength(50) },
    name: { required, maxLength: maxLength(50) },
    password: { required, maxLength: maxLength(50) },
    confirmPassword: {
      required,
      maxLength: maxLength(50),
      sameAsPassword: sameAs("password"),
    },
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",

      error: "",

      loader: null,
      loading: false,
      isShowPassword: false,
      isShowConfirmPassword: false,
    };
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      if (!this.$v.name.required) {
        errors.push("E-mail is required");
      }

      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) {
        return errors;
      }
      if (!this.$v.email.email) {
        errors.push("Must be valid e-mail");
      }
      if (!this.$v.email.required) {
        errors.push("E-mail is required");
      }

      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) {
        return errors;
      }
      if (!this.$v.password.required) {
        errors.push("Password is required");
      }
      return errors;
    },

    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) {
        return errors;
      }
      if (!this.$v.confirmPassword.required) {
        errors.push("Confirm password is required");
      }
      if (!this.$v.confirmPassword.sameAsPassword) {
        errors.push("Password and Confirm Password should match");
      }
      return errors;
    },
  },

  methods: {
    onLoading() {
      this.isLoading = true;
      this.loader = "loading";
    },

    submitRegister() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.onLoading();
        const registerFormData = new FormData();
        registerFormData.append("name", this.name);
        registerFormData.append("email", this.email);
        registerFormData.append("password", this.password);
        registerFormData.append("password_confirmation", this.confirmPassword);
        axios
          .post(AUTH_API.registerApi, registerFormData)
          .then((res) => {
            if (res.data) {
              Vue.$toast.success("Register success!");
              this.$router.push("/login");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },

  watch: {
    loader() {
      this.loading = this.loader;
      this.loading = !this.loading;

      setTimeout(() => (this.loading = false), 8000);

      this.loader = null;
    },
  },
};
</script>

<style>
.register-page {
  background-color: white;
  height: 100%;
  width: 99%;
  overflow-x: hidden;
}

.register-form {
  margin: auto;
  margin-top: 60px;
  padding: 20px 20px;
  min-width: 300px !important;
  min-height: 300px !important;
  max-width: 400px !important;
  max-height: 600px !important;
}

.register-form-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px !important;
  font-weight: 400 !important;
  margin-bottom: 15px;
}
</style>