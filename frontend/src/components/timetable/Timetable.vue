<template>
  <div>
    <div class="row justify-content-center mb-4">
      <div class="col-12 col-md-12 col-lg-9 col-xxl-8">
        <div class="d-flex">
          <select-class @change="classChanged" class="flex-fill" />
          <router-link
            v-if="store.getters.isMonitor"
            class="ms-2 btn btn-outline-dark"
            :to="{ name: 'timetable-edit' }"
          >
            <i class="bi bi-pencil"></i>
          </router-link>
        </div>
      </div>
    </div>

    <loading :isLoading="ttLoading">
      <div class="row justify-content-center">
        <div class="col-12 col-md-12 col-lg-9 col-xxl-8">
          <div v-if="store.state.settings.timetable_show_today_tomorrow">
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
          </div>

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
import { getTimetable, TimetableData } from "@/api/services/timetable";
import SelectClass from "@/components/SelectClass.vue";
import { useStore } from "@/store";

const ttLoading = ref(true);

// TODO: Select student's current class
const selectedKlass = ref<number | null>(null);
const timetable = ref<
  {
    weekday: number;
    lessons: TimetableData[][];
  }[]
>([]);
const store = useStore();

const refreshTimetable = async () => {
  if (!selectedKlass.value) return;

  let res = (await getTimetable(selectedKlass.value)).data;

  timetable.value = [];
  for (let i = 1; i <= 7; i++)
    timetable.value.push({ weekday: i, lessons: [] });

  const lessons: TimetableData[] = res.map((l) => ({
    ...l,
    classrooms: l.classroom.match(/((.+-.+)(\||,))*(.+-.+)/)
      ? l.classroom.split(/,|\|/).map((l) => l.trim())
      : l.classroom,
  }));

  for (const lesson of lessons) {
    const b4 = timetable.value[lesson.day - 1].lessons;
    if (b4.length === 0 || !store.state.settings.timetable_group_pairs) {
      b4.push([lesson]);
      continue;
    }
    let prev = b4[b4.length - 1];
    if (lessonsEqual(prev[0], lesson)) {
      prev.push(lesson);
    } else b4.push([lesson]);
  }

  ttLoading.value = false;
};

const lessonsEqual = (first: TimetableData, second: TimetableData) => {
  return (
    first.classrooms === second.classrooms &&
    first.subject.id === second.subject.id
  );
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
