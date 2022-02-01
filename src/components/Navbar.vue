<template>
  <nav
    class="navbar navbar-expand-lg navbar-light w-100 fixed-top"
    id="main-navbar"
    :class="{
      scrolled: isScrolled || navbarToggled,
    }"
  >
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        @click.prevent="toggleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        id="mainNavbarContent"
        ref="navbarContent"
      >
        <router-link to="/" class="navbar-brand d-none d-lg-block">
          <img
            src="@/assets/icons/logo.svg"
            id="logo"
            class="d-inline-block align-center me-2"
            alt=""
          />
          <span id="brand-name">Diary56x</span>
        </router-link>

        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/blog" class="nav-link">Новости</router-link>
          </li>
          <li class="nav-item">
            <span class="nav-link">Помощь</span>
          </li>
        </ul>
      </div>

      <div v-if="!user">
        <li class="d-flex">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/login" class="me-2 btn btn-primary">
                Войти</router-link
              >
            </li>
          </ul>
        </li>
      </div>
      <div class="dropdown d-flex" v-else @click="toggleDropdown">
        <div
          class="d-flex dropdown-toggle align-items-center position-relative"
          data-bs-toggle="dropdown"
          id="mainNavbarDropdown"
          ref="dropdownEl"
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
            <router-link class="dropdown-item" to="/profile">
              <i class="bi bi-person me-2"></i> <span>Аккаунт</span>
            </router-link>
          </li>
          <li>
            <router-link class="dropdown-item" to="/notifications">
              <i class="bi bi-bell me-2"> </i>
              <span>Уведомления</span>
              <span
                class="ms-2 badge bg-danger"
                v-if="unreadNotificationsCount"
              >
                {{ unreadNotificationsCount }}
              </span>
            </router-link>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.prevent="logout">
              <i class="bi bi-box-arrow-right me-2"></i>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from "vue";
import { toSvg } from "jdenticon";
import { useStore } from "vuex";
import { key } from "@/store";
import { useRoute } from "vue-router";
import { Collapse, Dropdown } from "bootstrap";
import router from "@/router";

export default defineComponent({
  setup() {
    const store = useStore(key);
    const route = useRoute();

    const meta = computed(() => route.meta);
    const options = computed(() => meta.value.navbar);
    const user = computed(() => store.state.user);
    const jdenticon = computed(() => toSvg(user.value?.id, 45));
    const unreadNotificationsCount = computed<number>(
      () => store.getters["unreadNotificationsCount"]
    );

    const isScrolled = ref(false);

    const navbarContent = ref<null | HTMLElement>(null);
    const navbarToggled = ref(false);
    const navbarCollapse = ref<null | Collapse>(null);

    const dropdown = ref<null | Dropdown>(null);
    const dropdownEl = ref<null | HTMLElement>(null);

    const logout = () => {
      store.dispatch("logout");
      router.push("/");
    };

    const onScroll = () => {
      isScrolled.value = window.scrollY > 0;
    };

    const toggleNavbar = () => {
      navbarCollapse.value?.toggle();
      navbarToggled.value = !navbarToggled.value;
    };

    const toggleDropdown = () => {
      dropdown.value?.toggle();
    };

    const enableElements = () => {
      if (navbarContent.value)
        navbarCollapse.value = Collapse.getOrCreateInstance(
          navbarContent.value,
          {
            toggle: navbarToggled.value,
          }
        );
      if (dropdownEl.value)
        dropdown.value = Dropdown.getOrCreateInstance(dropdownEl.value);
    };

    onMounted(() => {
      window.addEventListener("scroll", onScroll);
      enableElements();
    });

    onUpdated(enableElements);

    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll);
    });

    return {
      user,
      jdenticon,
      unreadNotificationsCount,
      logout,
      isScrolled,
      options,
      navbarContent,
      navbarToggled,
      dropdownEl,
      toggleNavbar,
      toggleDropdown,
    };
  },
});
</script>

<style scoped>
#main-navbar {
  transition: background-color 0.3s ease-in-out;
}

#main-navbar {
  background-color: #ffffff;
}

.navbar-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
}

#logo {
  width: 35px;
  height: 35px;
}

#brand-name {
  font-weight: bold;
}

#main-navbar.scrolled {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.5s ease-in-out;
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
}
</style>
