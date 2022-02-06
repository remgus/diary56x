<template>
  <div class="container rt-wp mt-4">
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Главная</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/admin">Панель администратора</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Расписание</li>
      </ol>
    </nav>

    <loading :isLoading="isLoading">
      <div class="text-center mb-4">
        <h1 class="heading">Расписание</h1>
      </div>

      <div>
        <form-select :options="klassOptions" name="klass" />
      </div>
    </loading>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { FormSelect, Loading } from "@/components";
import { listClassesCompact } from "@/api/services/klasses";
import { useStore } from "vuex";
import { key } from "@/store";
import { SelectOption } from "@/components/forms/FormSelect.vue";

export default defineComponent({
  components: { FormSelect, Loading },
  setup() {
    const store = useStore(key);
    const isLoading = ref(true);
    const user = computed(() => store.state.user);
    const klassOptions = ref<SelectOption[]>([]);

    onMounted(() => {
      if (user.value && user.value.school) {
        listClassesCompact(user.value.school.id).then((res) => {
          klassOptions.value = res.data.map((klass) => ({
            value: String(klass.id),
            label: klass.name,
          }));

          isLoading.value = false;
        });
      }
    });
    return {
      isLoading,
      klassOptions,
    };
  },
});
</script>

<style></style>
