<template>
  <div class="form-input-wrapper">
    <label class="form-label" :for="prefix + '_' + name" v-if="label">
      {{ label }}
    </label>
    <input
      :type="type"
      class="form-control"
      :id="prefix + '_' + name"
      :value="value"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Field",
  props: {
    label: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: false,
      default: "id",
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    value: {
      type: String,
      required: false,
    },
  },
});
</script>
<style></style>
