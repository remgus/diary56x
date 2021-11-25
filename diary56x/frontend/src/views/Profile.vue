<template>
  <div class="container">
    <!-- Avatar -->
    <div class="text-center mt-5">
      <div class="avatar d-flex justify-content-center w-100">
        <svg v-html="jdenticon" id="avatar"></svg>
      </div>

      <div class="mt-2">
        {{ user.data.surname }} {{ user.data.first_name }}
        <br />
        {{ user.data.second_name }}
      </div>
    </div>

    <!-- Tab bar content -->
    <div id="sectionsWrapper">
      <div class="mb-4" id="account">
        <h4 class="mb-3">
          <i class="bi bi-person-bounding-box me-2"></i>Данные аккаунта
        </h4>
        <div class="mb-1">
          <i class="bi bi-envelope me-2"></i><b>Email: </b>{{ user.data.email }}
        </div>
        <div class="mb-1">
          <i class="bi bi-calendar-plus me-2"></i><b>Дата регистрации: </b
          >{{ user.data.registration_date }}
        </div>

        <div v-if="user.isStudent">
          <div v-if="user.student">
            <div class="mb-1">
              <i class="bi bi-people me-2"></i>
              <b>Класс: </b><span>{{ user.data.student.klass }}</span>
            </div>
          </div>
          <div v-else>
            <div class="text-muted mb-1">
              Ученикам, не добавленным в класс, недоступна большая часть
              функционала
            </div>
          </div>
        </div>
      </div>
      <div class="" id="settings">
        <h4 class="mb-3"><i class="bi bi-gear me-2"></i>Настройки</h4>
        <div class="mb-1">
          <a href="{% url 'reset_password' %}"
            ><i class="bi bi-key me-2"></i>Сбросить пароль</a
          >
        </div>
        <div class="mb-1">
          <a href="{% url 'message_to_admin' %}"
            ><i class="bi bi-pencil me-2"></i>Изменить данные аккаунта</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { User } from "@/api/types";
import { defineComponent } from "@vue/runtime-core";
import { toSvg } from "jdenticon";

interface Data {
  user: User;
}

export default defineComponent({
  data() {
    return {
      user: this.$store.state.user,
    } as Data;
  },
  computed: {
    jdenticon: (vm) => toSvg(vm.user.id, 100),
  },
});
</script>

<style scoped>
#avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
