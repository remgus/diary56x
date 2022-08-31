<template>
  <main-navbar />
  <div
    class="view-wrapper"
    :class="{
      'student-home': route.name === 'home' && store.getters.isStudent,
    }"
  >
    <router-view />
  </div>
  <main-footer />
  <div class="position-fixed bottom-0 end-0 p-3 toast-container" id="popup-notification-container">
    <popup-notification :notification="msg" v-for="msg in notifications" :key="msg.id" />
  </div>
</template>

<script lang="ts" setup>
import MainNavbar from "@/components/MainNavbar.vue";
import PopupNotification from "@/components/PopupNotification.vue";
import { onMounted, ref } from "vue";
import { useStore } from "@/store";
import { APINotification } from "./api/services/notifications";
import { DiaryActionTypes } from "./store/modules/diary/types";
import { AuthActionTypes } from "./store/modules/auth/types";
import MainFooter from "./components/MainFooter.vue";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const notifications = ref<APINotification[]>([]);
const lastTimeFetched = ref<number>(Date.now());

const fetchNotifications = () => {
  store.dispatch(DiaryActionTypes.FETCH_NOTIFICATIONS).then(() => {
    lastTimeFetched.value = Date.now();
  });
};

onMounted(() => {
  store.dispatch(DiaryActionTypes.FETCH_CONFIG);
  if (store.state.auth.user) store.dispatch(AuthActionTypes.FETCH_CURRENT_USER);
  fetchNotifications();
  setInterval(fetchNotifications, 20 * 1000);
});

store.subscribe(() => {
  for (const notification of store.state.diary.unread_notifications) {
    if (new Date(notification.created_at) > new Date(lastTimeFetched.value)) {
      notifications.value.push(notification);
    }
  }
});
</script>

<style>
.card-shadow:hover {
  transition-property: box-shadow;
  transition-duration: 0.1s;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
}

#popup-notification-container {
  z-index: 9999;
}

.rt-wp {
  padding-top: 60px;
}

h1 {
  font-size: 30px;
  font-weight: bold;
}

h2 {
  font-size: 25px;
  font-weight: bold;
}

h3 {
  font-size: 23px;
}

h4 {
  font-size: 20px;
}

body {
  font-family: "Google Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
}

@media (max-width: 768px) {
  .view-wrapper:not(.student-home) {
    margin-bottom: 400px;
  }
  .view-wrapper.student-home {
    margin-bottom: 50px;
  }
}

@media (min-width: 768px) {
  .view-wrapper {
    margin-bottom: 320px;
  }
}

.gsans-display-bold {
  font-family: "Google Sans", Roboto, sans-serif;
  font-weight: bold;
}
</style>
