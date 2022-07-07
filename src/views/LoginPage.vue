<template>
  <div class="login-page">
    <div class="login-form">
      <form>
        <v-card-title class="login-form-title">Sign in</v-card-title>

        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          :counter="50"
          label="E-mail"
          outlined
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          @keyup.enter="submitLogin"
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
          @keyup.enter="submitLogin"
        ></v-text-field>

        <v-btn
          block
          depressed
          color="primary"
          @click="submitLogin()"
          :loading="loading"
        >
          Sign in
        </v-btn>

        <div class="login-form-footer">
          <div class="mr-3">New to app?</div>
          <router-link to="/register">Sign up now</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { AUTH_API } from "@/factories/auth";
import { mapActions } from "vuex";
import AUTHENTICATION_ACTIONS from "@/store/modules/authentication/authentication-actions";
import Cookies from "js-cookie";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  name: "login-page",

  mixins: [validationMixin],

  validations: {
    email: { required, email, maxLength: maxLength(50) },
    password: { required, maxLength: maxLength(50) },
  },

  computed: {
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
  },

  data() {
    return {
      email: "",
      password: "",
      loader: null,
      loading: false,
      isShowPassword: false,
    };
  },

  methods: {
    ...mapActions({ login: AUTHENTICATION_ACTIONS.login }),

    submitLogin() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.onLoading();
        const loginFormData = new FormData();
        loginFormData.append("email", this.email);
        loginFormData.append("password", this.password);
        axios
          .post(AUTH_API.loginApi, loginFormData)
          .then((res) => {
            if (res.data) {
              Cookies.set("accessToken", res.data.access_token);
              Cookies.set("userInfo", JSON.stringify(res.data.user));
              this.login(res.data.user);
              if (res.data.user.is_admin == 1) {
                this.$router.push("/admin");
              } else {
                this.$router.push("/my-project");
              }
            }
          })
          .catch((err) => {
            if (err.response.status && err.response.status === 401) {
              this.error = "Email or Password is incorrect";
            }
          });
      }
    },

    onLoading() {
      this.isLoading = true;
      this.loader = "loading";
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

<style scoped>
.login-page {
  background-color: white;
  height: 100%;
  width: 99%;
  overflow-x: hidden;
}

.login-form {
  margin: auto;
  margin-top: 10%;
  padding: 20px 20px;
  min-width: 300px !important;
  min-height: 300px !important;
  max-width: 400px !important;
  max-height: 450px !important;
  border: solid 1px gray;
  border-radius: 7px;
}

.login-form-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px !important;
  font-weight: 400 !important;
  margin-bottom: 15px;
}

.login-form-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0px;
}
</style>