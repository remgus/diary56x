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
    <div v-for="(lesson, index) in day.lessons" :key="lesson[0].id">
      <div class="row mt-1">
        <div
          v-if="!compactMode"
          class="col-2 text-center"
        >
          <div v-if="lesson[0].subject.icon" class="subject-icon-wrapper">
            <img class="subject-icon" :src="lesson[0].subject.icon" alt="" />
          </div>
        </div>
        <div class="col">
          <div class="subject-name">
            <b>{{ lesson[0].subject.name }}</b
            ><i v-if="lesson.length > 1"> x{{ lesson.length }}</i>
          </div>
          <div v-if="lesson[0].classrooms instanceof Array">
            <div v-for="classroom in lesson[0].classrooms">
              <td>{{ classroom.replace("-", "－") }}</td>
            </div>
          </div>
          <div v-else>
            {{ lesson[0].classrooms }}
          </div>
        </div>
        <div class="col-auto text-end">
          <div v-if="lesson.length === 1">#{{ lesson[0].n }}</div>
          <div v-else>
            #{{ lesson[0].n }} - {{ lesson[lesson.length - 1].n }}
          </div>
          <div>
            {{ renderTime(lesson[0].start) }} -
            {{ renderTime(lesson[lesson.length - 1].end) }}
          </div>
        </div>
        <div v-if="index + 1 !== day.lessons.length">
          <hr
            :class="{
              'mt-1 mb-0': compactMode,
              'mt-2 mb-1': !compactMode,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";
import { APITimetableDay } from "@/api/services/timetable";
import { getDayName, renderTime } from "@/utils/date";
import { useStore } from "@/store";

const store = useStore();

const compactMode = computed(() => store.state.settings.timetable_compact_mode)

defineProps({
  day: {
    type: Object as PropType<APITimetableDay>,
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

h4 {
  font-weight: bold;
}

.subject-name {
  font-size: 1.1rem;
}

.classrooms-table > tbody > tr:last-child td {
  border-bottom: none !important;
}
</style>
