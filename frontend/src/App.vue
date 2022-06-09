<template>
  <main-navbar />
  <router-view />
  <main-footer />
  <div
    class="position-fixed bottom-0 end-0 p-3 toast-container"
    id="popup-notification-container"
  >
    <popup-notification
      :notification="msg"
      v-for="msg in notifications"
      :key="msg.id"
    />
  </div>
</template>

<script lang="ts" setup>
import MainNavbar from "@/components/MainNavbar.vue";
import MainFooter from "@/components/MainFooter.vue";
import PopupNotification from "@/components/PopupNotification.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { key } from "./store";
import { APINotification } from "./api/services/notifications";

const store = useStore(key);
const notifications = ref<APINotification[]>([]);
const lastTimeFetched = ref<number>(Date.now());

const fetchNotifications = () => {
  store.dispatch("fetchNotifications").then(() => {
    lastTimeFetched.value = Date.now();
  });
};

onMounted(() => {
  fetchNotifications();
  setInterval(fetchNotifications, 20 * 1000);
});

store.subscribe(() => {
  for (const notification of store.state.unread_notifications) {
    if (new Date(notification.created_at) > new Date(lastTimeFetched.value)) {
      notifications.value.push(notification);
    }
  }
});
</script>

<style>
.card-shadow:hover {
  transition-property: box-shadow;
  transition-duration: 0.5s;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

#popup-notification-container {
  z-index: 9999;
}

.rt-wp {
  padding-top: 60px;
}
</style>
