<template>
  <div class="container rt-wp mt-4">
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Главная</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Расписание</li>
      </ol>
    </nav>

    <loading :isLoading="isLoading">
      <div class="text-center mb-4">
        <h1 class="heading">Расписание</h1>
      </div>

      <div class="row justify-content-center mb-4">
        <div class="col col-md-9 col-lg-6">
          <form-select
            v-model="selectedKlass"
            :options="klassOptions"
            name="klass"
            @change="refreshTimetable"
          />
        </div>
      </div>

      <loading :isLoading="ttLoading">
        <div class="row justify-content-center">
          <div class="col col-md-9 col-lg-6">
            <lesson-card
              v-if="today && today.lessons.length != 0"
              :day="today"
              isToday
            />
            <lesson-card
              v-if="tomorrow && tomorrow.lessons.length != 0"
              :day="tomorrow"
              isTomorrow
            />

            <div v-for="(day, index) in timetable" :key="index">
              <lesson-card :day="day" />
            </div>
          </div>
        </div>
      </loading>
    </loading>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { FormSelect, Loading } from "@/components";
import { listClassesCompact } from "@/api/services/klasses";
import { useStore } from "vuex";
import { key } from "@/store";
import { SelectOption } from "@/components/forms/FormSelect.vue";
import LessonCard from "./LessonCard.vue";
import { APIUser } from "@/api/services/auth";
import { APITimetableLesson, getTimetable } from "@/api/services/timetable";

const store = useStore(key);
const isLoading = ref(true);
const ttLoading = ref(true);
const user = computed(() => store.state.user as APIUser);
const klassOptions = ref<SelectOption[]>([]);
const selectedKlass = ref<string>(String(user.value.school?.id));
const timetable = ref<{ weekday: number; lessons: APITimetableLesson[] }[]>([]);

const getClassesList = async () => {
  const res = await listClassesCompact(parseInt(selectedKlass.value));
  klassOptions.value = res.data.map((klass) => ({
    value: String(klass.id),
    label: klass.name,
    selected: klass.id === parseInt(selectedKlass.value),
  }));
  isLoading.value = false;
};

const refreshTimetable = async () => {
  if (!selectedKlass.value) return;

  const res = (await getTimetable(parseInt(selectedKlass.value))).data;

  timetable.value = [];
  for (let i = 1; i <= 7; i++)
    timetable.value.push({ weekday: i, lessons: [] });

  for (const lesson of res)
    timetable.value[lesson.day - 1].lessons.push(lesson);

  ttLoading.value = false;
};

onMounted(() => {
  getClassesList().then(() => {
    refreshTimetable();
  });
});

const tomorrow = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const day = date.getDay();
  if (!timetable.value) return;
  return timetable.value.find((item) => item.weekday === day);
});

const today = computed(() => {
  const day = new Date().getDay();
  if (!timetable.value) return;
  return timetable.value.find((item) => item.weekday === day);
});
</script>

<style></style>
