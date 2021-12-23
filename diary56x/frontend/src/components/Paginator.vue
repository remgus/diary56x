<template>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#"><span>&laquo;</span></a>
      </li>
      <li class="page-item active">
        <a class="page-link" href="#"></a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#"><span>&raquo;</span></a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Paginator } from "@/api/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    paginator: Object as PropType<Paginator<unknown>>,
  },
});
</script>

<style></style>
