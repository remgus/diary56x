<template>
  <div class="col col-12 col-md-4 mb-3">
    <div class="card card-body h-100">
      <div><i class="mx-2" :class="['bi-' + icon]"></i>{{ title }}</div>
      <router-link class="stretched-link" :to="link"></router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    link: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>

<style></style>
