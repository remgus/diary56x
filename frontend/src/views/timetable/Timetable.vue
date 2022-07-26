<template>
  <div>
    <loading :isLoading="isLoading">
      <div class="row justify-content-center mb-4">
        <div class="col-9">
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
          <div class="col-9">
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
import { listClasses } from "@/api/services/klasses";
import { useStore } from "@/store";

import { SelectOption } from "@/components/forms/FormSelect.vue";
import LessonCard from "./LessonCard.vue";
import { APIUser } from "@/api/services/auth";
import { APITimetableLesson, getTimetable } from "@/api/services/timetable";

const store = useStore();
const isLoading = ref(true);
const ttLoading = ref(true);
const user = computed(() => store.state.user as APIUser);
const klassOptions = ref<SelectOption[]>([]);

// TODO: Select student's current class
const selectedKlass = ref<number | null>(null);
const timetable = ref<{ weekday: number; lessons: APITimetableLesson[] }[]>([]);

const getClassesList = async () => {
  const res = await listClasses({ compact: true });
  if (selectedKlass.value === null) selectedKlass.value = res.data[0].id;
  klassOptions.value = res.data.map((klass) => ({
    value: String(klass.id),
    label: klass.name,
    selected: klass.id === selectedKlass.value,
  }));
  isLoading.value = false;
};

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
