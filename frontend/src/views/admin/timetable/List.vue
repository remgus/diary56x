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

    <loading :isLoading="selectedKlass === null">
      <div class="text-center mb-4">
        <h1 class="heading">Редактирование расписания</h1>
      </div>

      <div class="row justify-content-center mb-4">
        <div class="col col-md-9 col-lg-6">
          <form-select
            v-model="selectedKlass"
            :options="klassOptions"
            name="klass"
          />
        </div>
      </div>

      <timetable-edit v-if="selectedKlass" :klass="selectedKlass" />
    </loading>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { FormSelect, Loading } from "@/components";
import { listClasses } from "@/api/services/klasses";
import { useStore } from "@/store";

import { SelectOption } from "@/components/forms/FormSelect.vue";
import TimetableEdit from "@/components/TimetableEdit.vue";

const store = useStore();
const user = computed(() => store.state.auth.user);

// Class that is currently selected
const selectedKlass = ref<null | string>(null);

// Available options for the select
const klassOptions = ref<SelectOption[]>([]);

onMounted(() => {
  if (user.value) {
    listClasses({ compact: true }).then((res) => {
      klassOptions.value = res.data.map((klass) => ({
        value: String(klass.id),
        label: klass.name,
      }));

      selectedKlass.value = klassOptions.value[0].value;
    });
  }
});
</script>
