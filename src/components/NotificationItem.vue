<template>
  <v-list-item class="notification-item-card">
    <div class="notification-item">
      <div class="notification-item-avatar">
        <v-avatar class="mr-5" size="30" v-bind="attrs" v-on="on">
          <img src="@/assets/defaultAvatar2.jpg" />
        </v-avatar>
      </div>

      <div class="notification-item-content">{{ notification.content }}</div>

      <div class="notification-item-time">{{ notification.created_at }}</div>
    </div>
  </v-list-item>
</template>

<script>
export default {
  name: "notification-item",

  props: {
    notification: Object,
  },
};
</script>

<style scoped>
.notification-item-card {
  border-bottom: 1px solid #dfe1e6;
  padding: 0px 5px !important;
  cursor: pointer;
}

.notification-item-card:hover {
  background-color: #eceff1;
}

.notification-item {
  display: grid;
  grid-template-columns: 2fr 7fr 3fr;
  min-height: 50px;
  padding: 5px 10px;
}

.notification-item-avatar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.notification-item-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.notification-item-time {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>