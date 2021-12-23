<template>
  <label class="form-label" :for="prefix + '_' + name" v-if="label">
    {{ label }}
  </label>
  <div :class="{ 'input-group': isInputGroup || clearButton }">
    <input
      :type="type"
      class="form-control"
      :id="prefix + '_' + name"
      :name="name"
      :value="modelValue"
      :class="{
        'is-invalid': isBound && error.length,
        'is-valid': isBound && !error.length,
      }"
      :maxlength="maxlength"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <div v-if="isBound && error" class="invalid-feedback order-1">
      {{ error }}
    </div>

    <button
      v-if="clearButton"
      class="btn btn-outline-secondary"
      @click.prevent="clearValue"
    >
      <i class="bi bi-x-lg"></i>
    </button>

    <div class="form-text" v-if="help">
      {{ help }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Field",
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const clearValue = () => {
      emit("update:modelValue", "");
    };

    return {
      clearValue,
    };
  },
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
    error: {
      type: String,
      default: "",
    },
    isBound: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: String,
      required: false,
    },
    isInputGroup: {
      type: Boolean,
      default: false,
    },
    clearButton: {
      type: Boolean,
      default: false,
    },
    help: {
      type: String,
      default: "",
    },
    maxlength: {
      type: Number,
      default: undefined,
    },
  },
});
</script>
<style></style>
