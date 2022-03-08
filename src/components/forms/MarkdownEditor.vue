<template>
  <div class="wrapper">
    <label :for="'id_' + name" v-if="label" class="form-label">{{
      label
    }}</label>
    <textarea
      :id="'id_' + name"
      :cols="cols"
      :rows="rows"
      :name="name"
      ref="mdeRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
import EasyMDE from "easymde";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Object as PropType<EasyMDE.Options>,
      required: true,
    },
    size: {
      type: String,
      default: "30x10",
    },
    label: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const mdeRef = ref<HTMLElement | undefined>(undefined);
    const easyMDE = ref<EasyMDE | undefined>(undefined);

    const cols = props.size.split("x")[0];
    const rows = props.size.split("x")[1];

    onMounted(() => {
      if (mdeRef.value)
        easyMDE.value = new EasyMDE({
          element: mdeRef.value,
          ...props.options,
        });
    });

    const getValue = () => {
      if (easyMDE.value) return easyMDE.value.value();
      return "";
    };

    const setValue = (value: string) => {
      if (easyMDE.value) easyMDE.value.value(value);
    };

    const clearAutosavedValue = () => {
      if (easyMDE.value) easyMDE.value.clearAutosavedValue();
    };

    return {
      easyMDE,
      mdeRef,
      cols,
      rows,
      getValue,
      setValue,
      clearAutosavedValue,
    };
  },
});
</script>

<style>
@import "easymde/dist/easymde.min.css";
</style>
