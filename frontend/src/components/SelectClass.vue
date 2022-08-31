<template>
  <div class="class-select-wrapper">
    <form-select
      v-model="selectedKlass"
      :options="klassOptions"
      name="klass"
      @change="$emit('change', $event.target.value)"
    />
  </div>
</template>

<script lang="ts" setup>
import { listClasses } from "@/api/services/klasses";
import { useStore } from "@/store";
import { onMounted, ref } from "vue";
import FormSelect, { SelectOption } from "./forms/FormSelect.vue";

const store = useStore();
const klassOptions = ref<SelectOption[]>([]);
const selectedKlass = ref<number | null>(
  store.getters.inKlass ? (store.state.auth.user?.options_student?.klass?.id as number) : null
);

const emit = defineEmits(["change"]);

const getClassesList = async () => {
  const res = await listClasses({ compact: true });
  if (selectedKlass.value === null) selectedKlass.value = res.data[0].id;
  emit("change", selectedKlass.value);
  klassOptions.value = res.data.map((klass) => ({
    value: String(klass.id),
    label: klass.name,
    selected: klass.id === selectedKlass.value,
  }));
};

onMounted(() => {
  getClassesList();
});
</script>
