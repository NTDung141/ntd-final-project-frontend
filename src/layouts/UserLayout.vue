<template>
  <div class="user-layout">
    <TheHeader />

    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
export default {
  name: "user-layout",

  components: {
    TheHeader,
  },
};
</script>

<style>
.user-layout {
  height: 100%;
}
</style>