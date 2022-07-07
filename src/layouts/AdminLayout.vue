<template>
  <div class="admin-page">
    <AdminSideBar />

    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SIDEBAR_ACTIONS from "@/store/modules/sidebar/sidebar-actions.js";
import AdminSideBar from "@/components/AdminSideBar.vue";
export default {
  name: "admin-layout",

  components: {
    AdminSideBar,
  },

  methods: {
    ...mapActions({ changeTabIndex: SIDEBAR_ACTIONS.changeTabIndex }),
  },

  mounted() {
    this.changeTabIndex(0);
  },
};
</script>

<style scoped>
.admin-page {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>