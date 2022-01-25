<template>
  <navbar />
  <router-view />
  <base-footer />
</template>

<style>
.card-shadow:hover {
  transition-property: box-shadow;
  transition-duration: 0.5s;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.rt-wp {
  padding-top: 60px;
}
</style>

<script lang="ts">
import Navbar from "@/views/base/Navbar.vue";
import BaseFooter from "@/views/base/BaseFooter.vue";

export default {
  name: "App",
  components: {
    Navbar,
    BaseFooter,
  },
};
</script>
