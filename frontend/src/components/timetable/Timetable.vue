<template>
  <div>
    <div class="row justify-content-center mb-4">
      <div class="col-12 col-md-12 col-lg-9 col-xxl-8">
        <select-class @change="classChanged" />
      </div>
    </div>

    <loading :isLoading="ttLoading">
      <div class="row justify-content-center">
        <div class="col-12 col-md-12 col-lg-9 col-xxl-8">
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
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { Loading } from "..";
import LessonCard from "./LessonCard.vue";
import { APITimetableLesson, getTimetable } from "@/api/services/timetable";
import SelectClass from "@/components/SelectClass.vue";

const ttLoading = ref(true);

// TODO: Select student's current class
const selectedKlass = ref<number | null>(null);
const timetable = ref<{ weekday: number; lessons: APITimetableLesson[] }[]>([]);

const refreshTimetable = async () => {
  if (!selectedKlass.value) return;

  const res = (await getTimetable(selectedKlass.value)).data;

  timetable.value = [];
  for (let i = 1; i <= 7; i++)
    timetable.value.push({ weekday: i, lessons: [] });

  for (const lesson of res)
    timetable.value[lesson.day - 1].lessons.push(lesson);

  ttLoading.value = false;
};

const classChanged = (newClass: number | null) => {
  selectedKlass.value = newClass;
  refreshTimetable();
};

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
