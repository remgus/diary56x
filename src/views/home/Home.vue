<template>
  <div v-if="isAuthenticated" class="rt-wp mt-4 container">
    <div class="row">
      <card
        icon="timetable"
        title="Расписание"
        v-if="pluginEnabled(user, 'timetable')"
      />
      <card
        icon="homework"
        title="Домашнее задание"
        v-if="pluginEnabled(user, 'homework')"
      />
      <card
        icon="notes"
        title="Конспекты"
        v-if="pluginEnabled(user, 'notes')"
      />
    </div>
  </div>
  <div v-else>
    <landing />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import Landing from "./components/Landing.vue";
import Card from "./components/Card.vue";

import { key } from "@/store";
import { useStore } from "vuex";

import { APIUser, is, pluginEnabled } from "@/api/services/auth";

export default defineComponent({
  name: "Home",
  components: {
    Landing,
    Card,
  },
  setup() {
    const store = useStore(key);

    const isAuthenticated = computed(() => store.getters["isAuthenticated"]);
    const user = computed(() => store.state.user as APIUser);

    return { isAuthenticated, pluginEnabled, user, is };
  },
});
</script>

<style scoped></style>
