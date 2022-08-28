<template>
  <div class="container rt-wp mt-4">
    <div class="row justify-content-center" id="settings-section">
      <div class="col-12 col-md-10 col-lg-8">
        <h1 class="mb-3">Аккаунт</h1>

        <div class="row">
          <div class="col-auto">
            <div class="avatar d-flex justify-content-center">
              <svg v-html="jdenticon" id="avatar"></svg>
            </div>
          </div>
          <div class="col">
            <div class="card card-body h-100">
              <h2>
                {{ user.surname }} {{ user.first_name }} {{ user.last_name }}
              </h2>
              <div class="mb-1"><b>Email: </b>{{ user.email }}</div>
              <div class="mb-1">
                <b>Дата регистрации: </b>{{ toShortDate(user.date_joined) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    const jdenticon = computed(() => toSvg(user.value?.id, 150));

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
  width: 150px;
  aspect-ratio: 1/1;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.137);
}
</style>
