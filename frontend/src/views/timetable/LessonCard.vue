<template>
  <div class="card mb-3 card-body" v-if="day.lessons.length != 0">
    <div class="card-title text-center">
      <div v-if="isToday">
        <h4>Расписание на сегодня</h4>
      </div>
      <div v-else-if="isTomorrow">
        <h4>Расписание на завтра</h4>
      </div>
      <div v-else>
        <h4>{{ getDayName(day.weekday) }}</h4>
      </div>
    </div>
    <div v-for="(lesson, index) in day.lessons" :key="lesson.id">
      <div class="row mt-1">
        <div class="col-2 text-center">
          <div v-if="lesson.subject.icon" class="subject-icon-wrapper">
            <img class="subject-icon" :src="lesson.subject.icon" alt="" />
          </div>
        </div>
        <div class="col" style="position: relative">
          <div style="position: absolute; top: 0; right: 1rem; text-align: end">
            <div>#{{ lesson.n }}</div>
            <div>
              {{ renderTime(lesson.start) }} - {{ renderTime(lesson.end) }}
            </div>
          </div>
          <div>
            <b>{{ lesson.subject.title }}</b>
          </div>
          <div>{{ lesson.classroom }}</div>
        </div>
        <div v-if="index + 1 !== day.lessons.length">
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { APITimetable } from "@/api/services/timetable";
import { getDayName, renderTime } from "@/utils/date";

const props = defineProps({
  day: {
    type: Object as PropType<APITimetable>,
    required: true,
  },
  isToday: {
    type: Boolean,
    default: false,
  },
  isTomorrow: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.card:hover,
div.alert:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition-duration: 0.5s;
}

.subject-icon {
  width: 40px;
}

.subject-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
