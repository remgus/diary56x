<template>
  <div v-if="isAuthenticated" class="rt-wp mt-4 container">
    <div class="row">
      <card icon="admin" title="Панель администратора" />
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

export default defineComponent({
  name: "Home",
  components: {
    Landing,
    Card,
  },
  setup() {
    const store = useStore(key);

    const isAuthenticated = computed(() => store.getters["isAuthenticated"]);

    return { isAuthenticated };
  },
});
</script>

<style scoped></style>
