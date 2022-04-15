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
        <label class="register-form-label">Email address</label>
        <input
          type="email"
          class="form-control register-input"
          placeholder="Email"
          v-model="registerValue.email"
        />
      </div>

      <div class="mb-3">
        <label class="register-form-label">Password</label>
        <input
          type="password"
          class="form-control register-input"
          placeholder="Password"
          v-model="registerValue.password"
        />
      </div>

      <div class="mb-3">
        <label class="register-form-label">Confirm Password</label>
        <input
          type="password"
          class="form-control register-input"
          placeholder="Password"
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
export default {
  name: "register-page",

  data() {
    return {
      registerValue: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: "",
    };
  },

  methods: {
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

    submitRegister() {
      if (!this.checkFormError()) {
        // const loginFormData = new FormData();
        // loginFormData.append("email", this.loginValue.email);
        // loginFormData.append("password", this.loginValue.password);
        // axios
        //   .post(AUTH_API.loginApi, loginFormData)
        //   .then((res) => {
        //     if (res.data) {
        //       this.login(res.data.user);
        //       this.$router.push("/");
        //     }
        //   })
        //   .catch((err) => {
        //     if (err.response.status && err.response.status === 401) {
        //       this.error = "Email or Password is incorrect";
        //     }
        //   });
        this.$router.push("/login");
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
  max-width: 450px;
  max-height: 450px;
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