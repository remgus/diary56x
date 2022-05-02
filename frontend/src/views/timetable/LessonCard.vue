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
    <div v-for="(lesson, index) in timetable" :key="lesson.id">
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
          <div class="subject-name">
            <b>{{ lesson.subject.name }}</b>
          </div>
          <div
            v-if="
              lesson.classrooms.length === 1 && lesson.classrooms[0].group === 0
            "
          >
            {{ lesson.classrooms[0].classroom }}
          </div>
          <div v-else>
            <table
              class="table table-sm table-borderless mb-0"
              style="width: fit-content"
            >
              <tbody>
                <tr v-for="classroom in lesson.classrooms">
                  <td style="">Группа {{ groups[classroom.group] }}</td>
                  <td>
                    {{ classroom.classroom }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="index + 1 !== timetable.length">
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, PropType, ref } from "vue";
import { APITimetableDay } from "@/api/services/timetable";
import { getDayName, renderTime } from "@/utils/date";
import { APISubject } from "@/api/services/subjects";

interface TimetableData {
  subject: APISubject;
  classrooms: {
    group: number;
    classroom: string;
  }[];
  n: number;
  start: string;
  end: string;
  id: number;
}

const groups = {
  1: "I",
  2: "II",
  3: "III",
};

const timetable = ref<TimetableData[]>([]);

const processTimetable = () => {
  const day = props.day;

  let ns = new Set(day.lessons.map((l) => l.n));
  console.log(ns);
  for (let n of ns) {
    const lessons = day.lessons.filter((l) => l.n === n);
    if (lessons.length > 1) {
      const subjects = new Set(lessons.map((l) => l.subject.id));
      for (const subject of subjects) {
        timetable.value.push({
          subject: lessons.find((l) => l.subject.id === subject)!.subject,
          classrooms: lessons
            .filter((l) => l.subject.id === subject)
            .map((l) => {
              return {
                group: l.group,
                classroom: l.classroom,
              };
            }),
          n,
          start: lessons[0].start,
          end: lessons[0].end,
          id: lessons[0].id,
        });
      }
    } else {
      timetable.value.push({
        subject: lessons[0].subject,
        classrooms: [
          {
            group: lessons[0].group,
            classroom: lessons[0].classroom,
          },
        ],
        n,
        start: lessons[0].start,
        end: lessons[0].end,
        id: lessons[0].id,
      });
    }
  }
};

onMounted(() => {
  processTimetable();
});

const props = defineProps({
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

h4 {
  font-weight: bold;
}

.subject-name {
  font-size: 1.1rem;
}
</style>
