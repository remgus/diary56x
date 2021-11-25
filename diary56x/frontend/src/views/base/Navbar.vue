<template>
  <nav class="navbar navbar-expand-lg navbar-dark" id="main-navbar">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarcontent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <router-link to="/" class="navbar-brand">
        <img
          src="@/assets/icons/logo.svg"
          id="logo"
          class="d-inline-block align-center me-2"
          alt=""
        />
        <span id="brand-name">Diary56x</span>
      </router-link>

      <div class="collapse navbar-collapse" id="navbarcontent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <span class="nav-link">Расписание</span>
          </li>
          <li class="nav-item">
            <span class="nav-link">Новости</span>
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
              <router-link to="/login" class="me-2 nav-link">Войти</router-link>
            </li>
          </ul>
          <a href="{% url 'register' %}" class="btn btn-outline-light"
            >Регистрация</a
          >
        </li>
      </div>
      <div class="d-flex" v-else>
        <div class="navbar-text text-light d-flex align-items-center me-3">
          {{ user.data.surname }} {{ user.data.first_name }}
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
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <router-link class="dropdown-item" to="/profile">
                <i class="bi bi-person me-2"></i> <span>Аккаунт</span>
              </router-link>
            </li>
            <li>
              <a class="dropdown-item" href="{% url 'logout' %}"
                ><i class="bi bi-box-arrow-right me-2"></i> Выйти</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { User } from "@/api/types";
import { defineComponent } from "vue";
import { toSvg } from "jdenticon";

interface Props {
  user?: User;
}

export default defineComponent({
  data() {
    return {
      user: this.$store.state.user,
    } as Props;
  },
  computed: {
    jdenticon: (vm) => toSvg(vm.user.id, 45),
  },
});
</script>

<style scoped>
#main-navbar {
  background-color: #24292e;
  transition-property: box-shadow;
  transition-duration: 0.5s;
}

#logo {
  width: 35px;
  height: 35px;
}

#brand-name {
  font-weight: bold;
}

#main-navbar:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.707);
}

#main-navbar a.nav-link:hover {
  color: rgba(255, 255, 255, 1);
}

#avatar {
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 50%;
}
</style>
