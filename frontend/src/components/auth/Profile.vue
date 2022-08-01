<template>
  <div class="text-center">
    <div class="avatar d-flex justify-content-center w-100">
      <svg v-html="jdenticon" id="avatar"></svg>
    </div>

    <div class="mt-2 mb-3">
      {{ user.surname }} {{ user.first_name }}
      <br />
      {{ user.last_name }}
    </div>
  </div>

  <!-- Tab bar content -->
  <div class="mb-4" id="account">
    <h4 class="mb-3">
      <i class="bi bi-person-bounding-box me-2"></i>Данные аккаунта
    </h4>
    <div class="mb-1"><b>Email: </b>{{ user.email }}</div>
    <div class="mb-1">
      <b>Дата регистрации: </b>{{ toShortDate(user.date_joined) }}
    </div>

    <div v-if="isStudent(user)">
      <!-- TODO: Add info about student's class. -->
      <div>
        <div class="text-muted mb-1">
          Ученикам, не добавленным в класс, недоступна большая часть функционала
        </div>
      </div>
    </div>
  </div>
  <div class="" id="settings">
    <h4 class="mb-3"><i class="bi bi-gear me-2"></i>Настройки</h4>
    <div class="mb-1">
      <!-- <a href="{% url 'reset_password' %}"
            ><i class="bi bi-key me-2"></i>Сбросить пароль</a
          > -->
    </div>
    <div class="mb-1">
      <!-- <a href="{% url 'message_to_admin' %}"
            ><i class="bi bi-pencil me-2"></i>Изменить данные аккаунта</a
          > -->
    </div>

    <div>
      <h2>Домашнее задание</h2>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="monitorEditModeDefault"
        />
        <label class="form-check-label" for="monitorEditModeDefault"></label>
      </div>
    </div>
  </div>

  <div class="container rt-wp mt-4"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { toSvg } from "jdenticon";
import { toShortDate } from "@/utils/date";
import { useStore } from "@/store";

import { APIUser, isStudent } from "@/api/services/auth";

export default defineComponent({
  setup() {
    const store = useStore();
    const user = computed(() => store.state.auth.user as APIUser);
    const jdenticon = computed(() => toSvg(user.value?.id, 100));

    return {
      jdenticon,
      user,
      isStudent,
    };
  },
  methods: {
    toShortDate(date: string) {
      return toShortDate(new Date(date));
    },
  },
});
</script>

<style scoped>
#avatar {
  width: 100px;
  height: 100px;
  border-radius: 10%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
