<template>
  <div class="container rt-wp mt-4">
    <div class="row justify-content-center" id="settings-section">
      <div class="col-12 col-md-10 col-lg-8">
        <h1 class="mb-3">Аккаунт</h1>

        <div class="row">
          <div class="col-12 col-md-auto">
            <div
              class="avatar d-flex justify-content-center mb-3 mb-md-0 justify-content-md-center"
            >
              <svg v-html="jdenticon" id="avatar"></svg>
            </div>
          </div>
          <div class="col">
            <div class="card card-body mb-2">
              <h2>{{ user.surname }} {{ user.first_name }} {{ user.last_name }}</h2>
              <table class="table mb-0">
                <tbody>
                  <tr>
                    <td class="fw-bold ps-0">Email</td>
                    <td class="text-start">{{ user.email }}</td>
                  </tr>
                  <tr>
                    <td class="fw-bold ps-0">Дата регистрации</td>
                    <td class="text-start">
                      {{ toShortDate(new Date(user.date_joined)) }}
                    </td>
                  </tr>
                  <tr>
                    <td class="fw-bold ps-0">Образовательное учреждение</td>
                    <td class="text-start">{{ store.state.diary.config?.school_full_name }}</td>
                  </tr>

                  <template v-if="store.getters.inKlass">
                    <tr>
                      <td class="fw-bold border-0 ps-0">Класс</td>
                      <td class="text-start border-0">{{ user.options_student?.klass?.name }}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { toSvg } from "jdenticon";
import { toShortDate } from "@/utils/date";
import { useStore } from "@/store";

import { APIUser } from "@/api/services/auth";

const store = useStore();
const user = computed(() => store.state.auth.user as APIUser);
const jdenticon = computed(() => toSvg(user.value?.id, 150));
</script>

<style scoped>
#avatar {
  width: 150px;
  aspect-ratio: 1/1;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.137);
}
</style>
