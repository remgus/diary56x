<template>
  <nav
    class="navbar navbar-expand navbar-light w-100 fixed-top"
    id="main-navbar"
    :class="{ scrolled: isScrolled }"
  >
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img
          src="@/assets/icons/logo.svg"
          id="logo"
          class="d-inline-block align-center me-2"
          alt=""
        />
        <span id="brand-name">дневник56</span>
      </router-link>

      <div v-if="!user && !(route.name === 'login')">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/login" class="me-2 btn btn-outline-dark"
              >Войти в аккаунт</router-link
            >
          </li>
        </ul>
      </div>

      <div v-if="user" class="dropdown d-flex">
        <div
          class="d-flex dropdown-toggle align-items-center position-relative"
          data-bs-toggle="dropdown"
          id="mainNavbarDropdown"
        >
          <div class="navbar-text me-3 fw-bold">
            {{ user.surname }} {{ user.first_name }}
          </div>

          <svg v-html="jdenticon" id="avatar"></svg>
          <span
            v-if="unreadNotificationsCount"
            id="notification-count-badge"
            class="position-absolute bg-danger border border-light rounded-circle"
          >
          </span>
        </div>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <router-link class="dropdown-item" to="/account">
              <i class="bi bi-person me-2"></i><span>Аккаунт</span>
            </router-link>
          </li>
          <li>
            <router-link class="dropdown-item" to="/settings">
              <i class="bi bi-gear me-2"></i><span>Настройки</span>
            </router-link>
          </li>
          <li>
            <router-link class="dropdown-item" to="/notifications">
              <i class="bi bi-bell me-2"></i>
              <span>Уведомления</span>
              <span
                class="ms-2 badge bg-danger"
                v-if="unreadNotificationsCount"
              >
                {{ unreadNotificationsCount }}
              </span>
            </router-link>
          </li>
          <li v-if="isAdmin(user)">
            <router-link class="dropdown-item" to="/admin">
              <i class="bi-window me-2"></i>
              <span>Панель администратора</span>
            </router-link>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.prevent="logout">
              <i class="bi bi-box-arrow-right me-2"></i>
              <span>Выйти из аккаунта</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { toSvg } from "jdenticon";
import { useStore } from "@/store";
import router from "@/router";
import { isAdmin } from "@/api/services/auth";
import { AuthActionTypes } from "@/store/modules/auth/types";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const user = computed(() => store.state.auth.user);
const jdenticon = computed(() => toSvg(user.value?.id, 45));
const unreadNotificationsCount = computed<number>(
  () => store.getters.unreadNotificationsCount
);

const isScrolled = ref(false);

const logout = () => {
  store.dispatch(AuthActionTypes.LOGOUT);
  router.push("/");
};

const onScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
#main-navbar {
  transition: background-color 0.2s ease-in-out;
  background-color: #ffffff;
}

#logo {
  width: 35px;
  height: 35px;
}

#brand-name {
  font-weight: bold;
  font-family: "VK Sans Display";
}

#main-navbar.scrolled {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out;
}

#main-navbar #avatar {
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 10%;
}

#main-navbar #avatar {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
}

#mainNavbarDropdown::after {
  content: none;
}

#notification-count-badge {
  padding: 0.45em;
  top: calc(-0.45em + 2px);
  right: calc(-0.45em + 2px);
  animation: notification-pulse 3s infinite;
}

@keyframes notification-pulse {
  0% {
    transform: scale(0.91);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0.91);
  }
}
</style>
