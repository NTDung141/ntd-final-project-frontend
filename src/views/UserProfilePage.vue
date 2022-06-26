<template>
  <div class="user-profile-page">
    <div class="user-profile-avatar">
      <v-avatar size="200" class="mr-2">
        <img src="@/assets/defaultAvatar2.jpg" />
      </v-avatar>
    </div>

    <div class="user-profile-info">
      <v-card elevation="0">
        <v-card-title>
          <div>Details</div>
        </v-card-title>

        <v-card-text class="project-detail-content">
          <v-form v-model="formValid" @submit.prevent="submit">
            <div class="user-profile-label">Full Name</div>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              @input="handleProjectName"
              @change="isDisableSaveButton"
              dense
              outlined
            ></v-text-field>

            <div class="user-profile-label">Email</div>
            <v-text-field
              :value="email"
              dense
              outlined
              disabled
              filled
            ></v-text-field>

            <div class="user-profile-label">
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
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AUTHENTICATION_GETTERS from "@/store/modules/authentication/authentication-getters";
// import AUTHENTICATION_ACTIONS from "@/store/modules/authentication/authentication-actions";
// import { mapActions } from "vuex";
// import axios from "axios";
// import Cookies from "js-cookie";
export default {
  name: "user-profile-page",

  data() {
    return {
      avatar: "",
      name: "",
      email: "",
    };
  },

  computed: {
    ...mapGetters({
      userInfo: AUTHENTICATION_GETTERS.userInfo,
    }),
  },

  mounted() {
    this.name = this.userInfo.name;
    this.email = this.userInfo.email;
  },
};
</script>

<style scoped>
.user-profile-page {
  display: block;
  padding: 8px 20% 60px 20%;
  height: 100%;
  width: 99%;
  overflow-x: hidden;
}

.user-profile-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0px;
}

.user-profile-info {
  padding: 0px 25%;
  margin-bottom: 50px;
}

.user-profile-label {
  display: flex;
  margin-bottom: 5px;
  font-weight: 500;
}
</style>