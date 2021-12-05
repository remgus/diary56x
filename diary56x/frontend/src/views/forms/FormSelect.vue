<template>
  <div class="form-input-wrapper">
    <label :for="prefix + '_' + name" v-if="label">{{ label }}</label>
    <select
      :name="name"
      :id="prefix + '_' + name"
      :multiple="multiple"
      :disabled="disabled"
      :autofocus="autofocus"
      class="form-select"
    >
      <option
        :value="option.value ? option.value : index"
        :selected="option.selected"
        v-for="(option, index) in options"
        :key="option"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface SelectOption {
  value: string;
  label: string;
  selected?: boolean;
}

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
    options: {
      type: Array as PropType<SelectOption[]>,
      required: true,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>
<style></style>
