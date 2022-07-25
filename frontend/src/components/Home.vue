<template>
  <div v-if="isAuthenticated" class="rt-wp mt-4 container">
    <!-- <div class="row" v-if="isStudent(user)">
      <card
        icon="timetable"
        title="Расписание"
        v-if="pluginEnabled(user, 'timetable')"
        link="/timetable"
      />
      <card
        icon="homework"
        title="Домашнее задание"
        v-if="pluginEnabled(user, 'homework')"
        link="/"
      />
      <card
        icon="notes"
        title="Конспекты"
        v-if="pluginEnabled(user, 'notes')"
        link="/"
      />
    </div>
    <div class="row" v-if="isAdmin(user)">
      <card icon="admin" title="Панель администратора" link="/admin" />
    </div> -->
    <div class="row">
      <div class="col-3">
        <ul class="nav flex-column nav-pills">
          <a class="nav-link active" aria-current="page" href="#">
            <i class="bi-clock me-3"></i>Расписание</a
          >

          <router-link to="/" class="nav-link" aria-current="page" href="#">
            <i class="bi-book me-3"></i>Домашнее задание</router-link
          >

          <router-link to="/" class="nav-link" aria-current="page" href="#">
            <i class="bi-journals me-3"></i>Конспекты</router-link
          >

          <router-link to="/" class="nav-link" aria-current="page" href="#">
            <i class="bi-table me-3"></i>Оценки</router-link
          >

          <a href="#" class="nav-link">
            <i class="bi-people me-3"></i>Класс
          </a>

          <a href="#" class="nav-link">
            <i class="bi-bar-chart me-3"></i>Успеваемость
          </a>

          <a href="#" class="nav-link">
            <i class="bi-person me-3"></i>Аккаунт и портфолио
          </a>
          
        </ul>
      </div>
      <div class="col-9 tab-content">
        <div
          class="tab-pane fade show active"
          id="timetable-pane"
          role="tabpanel"
          tabindex="0"
        >
          <timetable />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <landing />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import Landing from "./Landing.vue";
import Timetable from "../views/timetable/Timetable.vue";

import { key } from "@/store";
import { useStore } from "vuex";

import {
  APIUser,
  isStudent,
  pluginEnabled,
  isAdmin,
} from "@/api/services/auth";

export default defineComponent({
  name: "Home",
  components: {
    Landing,
    Timetable,
  },
  setup() {
    const store = useStore(key);

    const isAuthenticated = computed(() => store.getters["isAuthenticated"]);
    const user = computed(() => store.state.user as APIUser);

    return { isAuthenticated, pluginEnabled, user, isStudent, isAdmin };
  },
});
</script>

<style scoped></style>
