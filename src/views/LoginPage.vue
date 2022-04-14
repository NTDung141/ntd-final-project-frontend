<template>
  <div class="login-page">
    <div class="login-form">
      <div class="mb-3">
        <div class="login-form-title">Sign in</div>
      </div>

      <div v-if="this.error" class="alert alert-danger" role="alert">
        <div class="login-form-error">
          {{ this.error }}
        </div>
      </div>

      <div class="mb-3">
        <label class="login-form-label">Email address</label>
        <input
          type="email"
          class="form-control login-input"
          placeholder="Email"
          v-model="loginValue.email"
        />
      </div>

      <div class="mb-3">
        <label class="login-form-label">Password</label>
        <input
          type="password"
          class="form-control login-input"
          placeholder="Password"
          v-model="loginValue.password"
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary login-button"
        @click="submitLogin"
      >
        Sign in
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { AUTH_API } from "@/factories/auth";

export default {
  name: "login-page",

  data() {
    return {
      loginValue: {
        email: "",
        password: "",
      },
      error: "",
    };
  },

  methods: {
    submitLogin() {
      if (!this.checkFormError()) {
        console.log(process.env.VUE_APP_BASE_URL);
        const loginFormData = new FormData();
        loginFormData.append("email", this.loginValue.email);
        loginFormData.append("password", this.loginValue.password);
        axios
          .post(AUTH_API.loginApi, loginFormData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    checkFormError() {
      if (!this.loginValue.email) {
        this.error = "Email is required";
        return true;
      }
      if (!this.loginValue.password) {
        this.error = "Password is required";
        return true;
      }
      if (this.loginValue.password && this.loginValue.password.length < 8) {
        this.error = "Password must be greater 8 character";
        return true;
      }

      this.error = "";
      return false;
    },
  },
};
</script>

<style>
.login-page {
  background-color: white;
  height: 100%;
  width: 100%;
  /* display: table; */
}

.login-form {
  /* display: table-cell;
  vertical-align: middle; */
  margin: auto;
  padding: 20px 20px;
  min-width: 300px;
  min-height: 300px;
  max-width: 400px;
  max-height: 400px;
  border: 1px solid gray;
  border-radius: 5px;
}

.login-form-title {
  font-size: 35px;
  font-weight: 500;
}

.login-form-label {
  display: flex;
  justify-content: flex-start;
}

.login-input {
  width: 100%;
}

.login-button {
  width: 100%;
}

.login-form-error {
  display: flex;
  justify-content: flex-start;
}
</style>