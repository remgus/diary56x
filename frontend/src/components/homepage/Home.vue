<template>
  <div v-if="isAuthenticated" class="rt-wp container">
    <div v-if="isStudent(user)">
      <home-student />
    </div>
  </div>
  <div v-else>
    <landing />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Landing from "./Landing.vue";
import HomeStudent from "./HomeStudent.vue";
import { useStore } from "@/store";
import { APIUser, isStudent } from "@/api/services/auth";

const store = useStore();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const user = computed(() => store.state.auth.user as APIUser);
</script>

<style scoped></style>
