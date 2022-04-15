<template>
  <div class="register-page">
    <div class="register-form">
      <div class="mb-3">
        <div class="register-form-title">Sign up</div>
      </div>

      <div v-if="this.error" class="alert alert-danger" role="alert">
        <div class="register-form-error">
          {{ this.error }}
        </div>
      </div>

      <div class="mb-3">
        <label class="register-form-label">Name</label>
        <input
          type="text"
          class="form-control register-input"
          v-model="registerValue.name"
        />
      </div>

      <div class="mb-3">
        <label class="register-form-label">Email address</label>
        <input
          type="email"
          class="form-control register-input"
          v-model="registerValue.email"
        />
      </div>

      <div class="mb-3">
        <label class="register-form-label">Password</label>
        <input
          type="password"
          class="form-control register-input"
          v-model="registerValue.password"
        />
      </div>

      <div class="mb-3">
        <label class="register-form-label">Confirm Password</label>
        <input
          type="password"
          class="form-control register-input"
          v-model="registerValue.confirmPassword"
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary register-button"
        @click="submitRegister"
      >
        Sign up
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { AUTH_API } from "@/factories/auth";

export default {
  name: "register-page",

  data() {
    return {
      registerValue: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: "",
    };
  },

  methods: {
    checkFormError() {
      if (!this.registerValue.name) {
        this.error = "Name is required";
        return true;
      }
      if (!this.registerValue.email) {
        this.error = "Email is required";
        return true;
      }
      if (!this.registerValue.password) {
        this.error = "Password is required";
        return true;
      }
      if (!this.registerValue.confirmPassword) {
        this.error = "Confirm password is required";
        return true;
      }
      if (
        this.registerValue.password &&
        this.registerValue.password.length < 8
      ) {
        this.error = "Password must be greater 8 character";
        return true;
      }
      if (
        this.registerValue.confirmPassword &&
        this.registerValue.confirmPassword.length < 8
      ) {
        this.error = "Confirm password must be greater 8 character";
        return true;
      }
      if (this.registerValue.confirmPassword !== this.registerValue.password) {
        this.error = "Confirm password does not match";
        return true;
      }

      this.error = "";
      return false;
    },

    submitRegister() {
      if (!this.checkFormError()) {
        const registerFormData = new FormData();
        registerFormData.append("name", this.registerValue.name);
        registerFormData.append("email", this.registerValue.email);
        registerFormData.append("password", this.registerValue.password);
        registerFormData.append(
          "password_confirmation",
          this.registerValue.confirmPassword
        );
        axios
          .post(AUTH_API.registerApi, registerFormData)
          .then((res) => {
            if (res.data) {
              this.$router.push("/login");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style>
.login-page {
  background-color: white;
  height: 100%;
  width: 100%;
}

.register-form {
  margin: auto;
  margin-top: 60px;
  padding: 20px 20px;
  min-width: 300px;
  min-height: 300px;
  max-width: 400px;
  max-height: 600px;
  border: 1px solid gray;
  border-radius: 5px;
}

.register-form-title {
  font-size: 35px;
  font-weight: 500;
}

.register-form-label {
  display: flex;
  justify-content: flex-start;
}

.register-input {
  width: 100%;
}

.register-button {
  width: 100%;
}

.register-form-error {
  display: flex;
  justify-content: flex-start;
}
</style>