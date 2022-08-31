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
        <h2 class="heading">Расписание {{ store.getters.klass?.name }} класса</h2>
      </div>
    </div>

    <timetable-edit v-if="store.getters.klass" :klass="String(store.getters.klass.id)" />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import TimetableEdit from "@/components/TimetableEdit.vue";

const store = useStore();
</script>
