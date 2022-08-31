<script setup lang="ts">
import Tooltip from "bootstrap/js/dist/tooltip";
import { nextTick, onMounted, PropType } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  placement: {
    type: String as PropType<"top" | "bottom" | "left" | "right">,
    default: "top",
  },
});

onMounted(() => {
  nextTick(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltips].map((el) => new Tooltip(el));
  });
});
</script>

<template>
  <div data-bs-toggle="tooltip" :data-bs-placement="placement" :title="title" class="vue-tooltip">
    <slot></slot>
  </div>
</template>

<style scoped>
.vue-tooltip {
  width: fit-content;
}
</style>
