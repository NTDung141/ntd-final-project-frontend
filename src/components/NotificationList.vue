<template>
  <div class="notification-list">
    <div class="notification-list-header">Notifications</div>
    <v-list>
      <NotificationItem
        v-for="notification in notificationList"
        :key="notification.id"
        :notification="notification"
        :projectKey="project.key"
      />
    </v-list>

    <div
      v-if="notificationList && notificationList.length < 1"
      class="empty-notification"
    >
      You have no notifications
    </div>
  </div>
</template>

<script>
import NotificationItem from "@/components/NotificationItem.vue";
import { mapGetters } from "vuex";
import NOTIFICATION_GETTERS from "@/store/modules/notification/notification-getters";
import PROJECT_GETTERS from "@/store/modules/project/project-getters.js";
export default {
  name: "notification-list",

  components: {
    NotificationItem,
  },

  computed: {
    ...mapGetters({
      notificationList: NOTIFICATION_GETTERS.notificationList,
      project: PROJECT_GETTERS.project,
    }),
  },

  data() {
    return {};
  },
};
</script>

<style scoped>
.notification-list {
  background-color: #fff;
  display: block;
  min-width: 300px;
  max-width: 600px;
  max-height: 400px;
  padding: 10px 0px;
}

.notification-list-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  padding: 0px 10px;
}

.empty-notification {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}
</style>