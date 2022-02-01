<template>
  <navbar />
  <router-view />
  <base-footer />
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

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import BaseFooter from "@/components/BaseFooter.vue";
import PopupNotification from "@/components/PopupNotification.vue";
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { key } from "./store";
import { APINotification } from "./api/services/notifications";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
    BaseFooter,
    PopupNotification,
  },
  setup() {
    const store = useStore(key);
    const notifications = ref<APINotification[]>([]);
    const lastTimeFetched = ref<number>(Date.now());

    onMounted(() => {
      store.dispatch("fetchNotifications").then(() => {
        lastTimeFetched.value = Date.now();
      });

      setInterval(() => {
        store.dispatch("fetchNotifications").then(() => {
          lastTimeFetched.value = Date.now();
        });
      }, 20 * 1000);
    });

    store.subscribe(() => {
      for (const notification of store.state.unread_notifications) {
        if (
          new Date(notification.created_at) > new Date(lastTimeFetched.value)
        ) {
          notifications.value.push(notification);
        }
      }
    });

    return { notifications };
  },
});
</script>
