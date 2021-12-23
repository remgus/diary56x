<template>
  <div class="container"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Data {
  isAuthenticated: boolean;
}

export default defineComponent({
  name: "Home",
  data() {
    return {
      isAuthenticated: this.$store.getters["isAuthenticated"],
    } as Data;
  },
});
</script>
