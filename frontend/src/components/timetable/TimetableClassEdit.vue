<template>
  <div class="container rt-wp mt-4">
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Главная</router-link>
        </li>
        <li class="breadcrumb-item active">Редактирование расписания</li>
      </ol>
    </nav>

    <div class="row justify-content-center mb-3">
      <div class="col-12 col-md-7">
        <h2 class="heading">
          Расписание
          {{ curClass?.name }} класса
        </h2>
      </div>
    </div>
    
    <loading :is-loading="curClass === null">
      <timetable-edit v-if="curClass !== null" :klass="String(curClass.id)" />
    </loading>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { APIKlass, getClass, listClasses } from "@/api/services/klasses";
import { useStore } from "@/store";

import TimetableEdit from "@/components/TimetableEdit.vue";
import Loading from "../Loading.vue";

const store = useStore();
const user = computed(() => store.state.auth.user);

// Class that is currently selected
const curClass = ref<null | APIKlass>(null);

onMounted(() => {
  if (store.getters.isStudent && store.getters.klass) {
    getClass(store.getters.klass).then((res) => (curClass.value = res.data));
  }
});
</script>
