<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import { Loading } from "@/components";
import { SelectOption } from "@/components/forms/FormSelect.vue";
import {
  APICreateLessons,
  getTimetable,
  APIDeleteLessons,
  createTimetable,
  deleteTimetable,
} from "@/api/services/timetable";
import { getDayName } from "@/utils/date";
import { listSubjects } from "@/api/services/subjects";
import { onBeforeRouteLeave } from "vue-router";

export interface TimetableLesson {
  n: number;
  subject: number;
  classroom: string;
  group: number;
  day: number;
  status: "initial" | "new";
}

export interface TimetableDay {
  weekday: number;
  lessons: TimetableLesson[];
}

interface TimetableDeleteChange {
  day: number;
  n: number;
  group: number;
  klass: number;
  subject: number;
}

const props = defineProps({
  klass: {
    type: String,
    required: true,
  },
});

const isLoading = ref(true);
const timetable = ref<TimetableDay[]>([]);
const subjectOptions = ref<SelectOption[]>([]);
const groupOptions = ref<SelectOption[]>([]);
const lessonsToDelete = ref<TimetableDeleteChange[]>([]);

const getChangesNumber = () => {
  const to_create = timetable.value.filter((day) =>
    day.lessons.some((lesson) => lesson.status === "new")
  );
  return to_create.length + lessonsToDelete.value.length;
};

const refreshTableValues = () => {
  for (const day of timetable.value) {
    for (const lesson of day.lessons) {
      const n = lesson.n;
      const classroom = lesson.classroom;

      // Find corresponsing HTML elements and set values

      // Lesson number
      const nEl = document.querySelector(
        `#n-${getLessonId(lesson)}`
      ) as HTMLInputElement;
      if (nEl) nEl.value = String(n);

      // Classroom
      const classroomEl = document.querySelector(
        `#classroom-${getLessonId(lesson)}`
      ) as HTMLInputElement;
      if (classroomEl) classroomEl.value = classroom;
    }
  }
};

const refreshTimetable = async () => {
  const klassId = parseInt(props.klass); // Selected class

  const subjectGetParams = new URLSearchParams();
  subjectGetParams.append("klass", props.klass);

  const subjects = (await listSubjects(subjectGetParams)).data; // Fetch subjects
  const res = (await getTimetable(klassId)).data; // Get the timetable

  subjectOptions.value = subjects.map((subject) => ({
    value: String(subject.id),
    label: subject.name,
  }));

  groupOptions.value = [
    [0, "-"],
    [1, "I"],
    [2, "II"],
    [3, "III"],
  ].map(([group, label]) => ({
    value: String(group),
    label: String(label),
  }));

  lessonsToDelete.value = [];

  isLoading.value = false;

  // Initial table data
  timetable.value = [];
  for (let i = 1; i <= 7; i++)
    timetable.value.push({ weekday: i, lessons: [] });

  for (const lesson of res) {
    timetable.value[lesson.day - 1].lessons.push({
      n: lesson.n,
      subject: lesson.subject ? lesson.subject.id : 0,
      classroom: lesson.classroom ? lesson.classroom : "",
      group: lesson.group ? lesson.group : 0,
      day: lesson.day,
      status: "initial",
    });
  }

  nextTick(refreshTableValues);
};

onMounted(refreshTimetable);

const askForSave = (): boolean => {
  // No changes
  if (getChangesNumber() === 0) return true;

  // Ask for save
  const answer = window.confirm(
    "Вы действительно хотите выйти? Вы не сохранили изменения."
  );
  if (!answer) return false;
  return true;
};

watch(
  () => props.klass,
  (oldKlass, newKlass) => {
    if (oldKlass === newKlass) return;
    if (getChangesNumber() !== 0) askForSave();
    refreshTimetable();
  }
);

onBeforeRouteLeave(askForSave);

const addLesson = (day: number) => {
  const l = timetable.value[day - 1].lessons.length;
  timetable.value[day - 1].lessons.push({
    n: l > 0 ? timetable.value[day - 1].lessons[l - 1].n + 1 : 1,
    classroom: "",
    group: 0,
    subject: parseInt(subjectOptions.value[0].value),
    day: day,
    status: "new",
  });
  nextTick(refreshTableValues);
};

const editLesson = (e: Event, day: number, lessonIndex: number) => {
  const newValue = (e.target as HTMLInputElement).value;
  const field = (e.target as HTMLInputElement).name;

  const lesson = timetable.value[day - 1].lessons[lessonIndex];
  const lessonCopy = JSON.parse(JSON.stringify(lesson));

  switch (field) {
    case "n":
      lesson.n = Math.max(Math.min(parseInt(newValue), 15), 1);
      break;
    case "classroom":
      lesson.classroom = newValue;
      break;
    case "group":
      lesson.group = parseInt(newValue);
      break;
    case "subject":
      lesson.subject = parseInt(newValue);
      break;
  }

  const alreadyExists =
    timetable.value[day - 1].lessons.filter(
      (l) =>
        l.n === lesson.n &&
        l.group === lesson.group &&
        l.subject === lesson.subject
    ).length > 1;

  if (alreadyExists) {
    alert("Такой урок уже добавлен");
    timetable.value[day - 1].lessons.splice(lessonIndex, 1);
  } else {
    if (lesson.status === "initial") {
      lessonsToDelete.value.push({
        day: lessonCopy.day,
        n: lessonCopy.n,
        group: lessonCopy.group,
        klass: parseInt(props.klass),
        subject: lessonCopy.subject,
      });
      lesson.status = "new";
    }
  }

  const deleted = lessonsToDelete.value.findIndex(
    (l) =>
      l.day === lesson.day &&
      l.n === lesson.n &&
      l.group === lesson.group &&
      l.subject === lesson.subject
  );

  if (deleted !== -1) lessonsToDelete.value.splice(deleted, 1);

  // Sort lessons in the day
  timetable.value[day - 1].lessons.sort(
    (a, b) => a.n - b.n || a.subject - b.subject || a.group - b.group
  );

  nextTick(refreshTableValues);
};

const deleteLesson = (day: number, index: number) => {
  const lesson = timetable.value[day - 1].lessons[index];
  if (lesson.status === "initial") {
    lessonsToDelete.value.push({
      day: day,
      n: lesson.n,
      group: lesson.group,
      subject: lesson.subject,
      klass: parseInt(props.klass),
    });
  }
  timetable.value[day - 1].lessons.splice(index, 1);
  nextTick(refreshTableValues);
};

const getLessonId = (lesson: TimetableLesson) => {
  return `${lesson.day}-${lesson.n}-${lesson.group}-${lesson.subject}`;
};

const saveTimetable = async () => {
  if (getChangesNumber() === 0) return;

  const to_create: APICreateLessons[] = [];
  const to_delete: APIDeleteLessons[] = [];

  for (const day of timetable.value) {
    for (const lesson of day.lessons) {
      if (lesson.status === "new") {
        to_create.push({
          day: lesson.day,
          n: lesson.n,
          group: lesson.group,
          subject: lesson.subject,
          classroom: lesson.classroom,
          klass: parseInt(props.klass),
        });
      }
    }
  }

  for (const lesson of lessonsToDelete.value) {
    to_delete.push({
      day: lesson.day,
      n: lesson.n,
      group: lesson.group,
      subject: lesson.subject,
      klass: parseInt(props.klass),
    });
  }

  isLoading.value = true;

  if (to_delete.length !== 0) await deleteTimetable(to_delete);
  if (to_create.length !== 0) await createTimetable(to_create);

  refreshTimetable();
};
</script>

<template>
  <loading :is-loading="isLoading">
    <div class="row justify-content-center">
      <div class="col-7 mb-5">
        <button class="btn btn-outline-success me-auto" @click="saveTimetable">
          <i class="bi bi-cloud-arrow-up me-2"></i> Сохранить
        </button>
      </div>
      <div v-for="day in timetable" class="col-7">
        <table class="table table-sm table">
          <thead>
            <tr class="text-center table-dark">
              <th colspan="5">{{ getDayName(day.weekday) }}</th>
            </tr>
            <tr v-if="day.lessons.length" class="text-center">
              <th style="width: 10%">#</th>
              <th>Предмет</th>
              <th>Аудитория</th>
              <th>Группа</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="day.lessons.length"
              v-for="(lesson, lessonIndex) in day.lessons"
            >
              <!-- Lesson number -->
              <td>
                <input
                  :disabled="isLoading"
                  class="n-field-input"
                  :id="`n-${getLessonId(lesson)}`"
                  type="number"
                  min="1"
                  max="15"
                  @change="editLesson($event, lesson.day, lessonIndex)"
                  name="n"
                />
              </td>
              <!-- Subject -->
              <td>
                <select
                  :disabled="isLoading"
                  :id="`subject-${getLessonId(lesson)}`"
                  class="field-input subject-select"
                  @change="editLesson($event, lesson.day, lessonIndex)"
                  name="subject"
                >
                  <option
                    v-for="subject in subjectOptions"
                    :value="subject.value"
                    :selected="String(lesson.subject) === subject.value"
                  >
                    {{ subject.label }}
                  </option>
                </select>
              </td>
              <!-- Classroom -->
              <td>
                <input
                  :disabled="isLoading"
                  :id="`classroom-${getLessonId(lesson)}`"
                  class="field-input"
                  @change="editLesson($event, lesson.day, lessonIndex)"
                  name="classroom"
                />
              </td>
              <!-- Group -->
              <td>
                <select
                  :disabled="isLoading"
                  class="field-input group-select"
                  :id="`group-${getLessonId(lesson)}`"
                  @change="editLesson($event, lesson.day, lessonIndex)"
                  name="group"
                >
                  <option
                    v-for="group in groupOptions"
                    :value="group.value"
                    :selected="String(lesson.group) === group.value"
                  >
                    {{ group.label }}
                  </option>
                </select>
              </td>
              <!-- Delete lesson button -->
              <td
                class="text-center delete-lesson"
                @click="deleteLesson(lesson.day, lessonIndex)"
              >
                <i class="bi-dash-circle text-danger"></i>
              </td>
            </tr>
            <tr v-else>
              <td colspan="5" class="text-center py-3">Нет уроков</td>
            </tr>
          </tbody>
        </table>
        <div class="mt-2 mb-4 text-center">
          <div
            class="btn btn-sm btn-outline-success"
            @click="addLesson(day.weekday)"
          >
            <i class="bi bi-plus"></i>
          </div>
        </div>
      </div>
    </div>
  </loading>
</template>

<style scoped>
.field-input {
  border: none;
  border-width: 0;
  box-sizing: border-box;
}

.n-field-input {
  border: none;
  border-width: 0;
  box-sizing: border-box;
  width: 100%;
}

.field-input:focus {
  outline: none;
}

.input-wrapper {
  height: 100%;
}

.subject-select {
  background-color: white;
  width: 100%;
}

.group-select {
  background-color: white;
  width: 100%;
}

.was-changed {
  background-color: #f0f0f0;
}

.was-changed > .subject-select {
  background-color: #f0f0f0;
}

.was-changed > .field-input {
  background-color: #f0f0f0;
}

.delete-lesson:hover {
  background-color: #f0f0f0;
}
</style>
