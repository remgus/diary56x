<template>
  <nav
    class="navbar navbar-expand-lg navbar-light w-100 fixed-top"
    id="main-navbar"
    :class="{
      'bg-solid': solid,
      scrolled: isScrolled,
    }"
  >
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarcontent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarcontent">
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
              <router-link
                to="/login"
                class="me-2 btn"
                :class="{
                  'btn-primary': solid,
                  'btn-light': !solid,
                }"
              >
                Войти</router-link
              >
            </li>
          </ul>
        </li>
      </div>
      <div class="d-flex" v-else>
        <div class="navbar-text d-flex align-items-center me-3 fw-bold">
          {{ user.surname }} {{ user.first_name }}
        </div>
        <div class="dropdown">
          <div
            class="dropdown-toggle"
            data-bs-toggle="dropdown"
            id="navbarDropdown"
            title="Аккаунт"
          >
            <svg v-html="jdenticon" id="avatar"></svg>
          </div>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <router-link class="dropdown-item" to="/profile">
                <i class="bi bi-person me-2"></i> <span>Аккаунт</span>
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
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import { toSvg } from "jdenticon";
import { useStore } from "vuex";
import { key } from "@/store";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore(key);
    const route = useRoute();

    const meta = computed(() => route.meta);
    const options = computed(() => meta.value.navbar);
    const user = computed(() => store.state.user);
    const jdenticon = computed(() => toSvg(user.value?.id, 45));

    const isScrolled = ref(false);

    const logout = () => {
      store.dispatch("logout");
    };

    const onScroll = () => {
      isScrolled.value = window.scrollY > 0;
    };

    const solid = computed(() => {
      if (options.value?.transparent) {
        return isScrolled.value;
      }
      return true;
    });

    onMounted(() => {
      window.addEventListener("scroll", onScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll);
    });

    return {
      user,
      jdenticon,
      logout,
      isScrolled,
      options,
      solid,
    };
  },
});
</script>

<style scoped>
#main-navbar {
  transition: background-color 0.3s ease-in-out;
}

#main-navbar:not(.bg-solid) {
  background-color: #ffffff00;
}

#main-navbar.bg-solid {
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

/**
Shadow is dispayed if navbar was scrolled or
it's transparent and hovered.
*/
#main-navbar:hover:not(.bg-solid) {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
}

#main-navbar.scrolled {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

#main-navbar #avatar {
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 10%;
}

#main-navbar.bg-solid #avatar {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
}

#navbarDropdown::after {
  content: none;
}
</style>
