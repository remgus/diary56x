<script setup lang="ts">
import { nextTick, onMounted, onUpdated, ref, watch, computed } from "vue";
import { Loading } from "@/components";
import { SelectOption } from "@/components/forms/FormSelect.vue";
import { getTimeTable } from "@/api/services/timetable";
import { getDayName } from "@/utils/date";
import { listSubjects } from "@/api/services/subjects";
import { onBeforeRouteLeave } from "vue-router";
import { plural } from "@/utils/translation";

export interface TimetableLesson {
  n: number;
  subject?: string;
  classroom: string;
  group: number;
  day: number;
}

export interface TimetableDay {
  weekday: number;
  lessons: TimetableLesson[];
}

const props = defineProps({
  klass: {
    type: String,
    required: true,
  },
});

const isLoading = ref(true);

// Table data
const timetable = ref<TimetableDay[]>([]);

const subjectOptions = ref<SelectOption[]>([]);
const groupOptions = ref<SelectOption[]>([]);

interface TimetableChange {
  subject?: string;
  classroom?: string;
  group?: string;
}

const timetableChanges = ref(new Map<string, TimetableChange>());

const refreshTableValues = () => {
  for (const day of timetable.value) {
    for (const lesson of day.lessons) {
      const n = lesson.n;
      const classroom = lesson.classroom;

      // Find corresponsing HTML elements and set values

      // Lesson number
      const nEl = document.querySelector(
        `#n-${day.weekday}-${n}-${lesson.group}`
      ) as HTMLInputElement;
      if (nEl) nEl.value = String(n);

      // Classroom
      const classroomEl = document.querySelector(
        `#classroom-${day.weekday}-${n}-${lesson.group}`
      ) as HTMLInputElement;
      if (classroomEl) classroomEl.value = classroom;
    }
  }
};

const refreshTimetable = async () => {
  const klassId = parseInt(props.klass); // Selected class
  // TODO: Fetch subjects depending on selected class
  const subjects = (await listSubjects()).data; // Fetch subjects
  const res = (await getTimeTable(klassId)).data; // Get the timetable

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

  isLoading.value = false;

  // Initial table data
  timetable.value = [];
  for (let i = 1; i <= 7; i++)
    timetable.value.push({ weekday: i, lessons: [] });

  for (const lesson of res) {
    timetable.value[lesson.day - 1].lessons.push({
      n: lesson.n,
      subject: lesson.subject ? String(lesson.subject.id) : undefined,
      classroom: lesson.classroom ? lesson.classroom : "",
      group: lesson.group ? lesson.group : 0,
      day: lesson.day,
    });
  }

  nextTick(refreshTableValues);
};

onMounted(refreshTimetable);

const askForSave = (): boolean => {
  if (timetableChanges.value.size === 0) return true;
  const answer = window.confirm(
    "Вы действительно хотите выйти? Вы не сохранили изменения."
  );
  if (!answer) return false;
  timetableChanges.value.clear();
  return true;
};

watch(
  () => props.klass,
  (oldKlass, newKlass) => {
    if (oldKlass === newKlass) return;
    if (timetableChanges.value.size !== 0) askForSave();
    refreshTimetable();
  }
);

onBeforeRouteLeave(askForSave);

const changesInfo = computed(() => {
  return plural(
    timetableChanges.value.size,
    ["изменение", "изменения", "изменений"],
    true
  );
});

/**
 * Add a new lesson to the table.
 *
 * @param day Day of the week
 */
const addLesson = (day: number) => {
  timetable.value[day - 1].lessons.push({
    n: timetable.value[day - 1].lessons.length + 1,
    classroom: "",
    group: 0,
    subject: undefined,
    day: day,
  });
  nextTick(refreshTableValues);
};

const editLesson = (e: Event) => {
  const target = (e.target as HTMLInputElement).id;
  const newValue = (e.target as HTMLInputElement).value;
  const [field, day, lesson, group] = target.split("-");
  const dayN = parseInt(day);
  const curDay = timetable.value[dayN - 1];

  let curLesson = curDay.lessons.findIndex(
    (l) =>
      l.n === parseInt(lesson) && l.day === dayN && l.group === parseInt(group)
  );
  const newLesson = JSON.parse(JSON.stringify(curLesson)); // Copy the lesson

  console.log("Old lesson before the change", curLesson);

  // Set a new value
  switch (field) {
    case "n":
      newLesson!.n = parseInt(newValue);
      break;
    case "classroom":
      newLesson!.classroom = newValue;
      break;
    case "group":
      newLesson!.group = parseInt(newValue);
      break;
    case "subject":
      newLesson!.subject = newValue;
      break;
  }

  console.log("New lesson: ", newLesson);
  console.log("Old lesson", curLesson);

  // Check if the lesson is already in the timetable
  const isLessonInTimetable = timetable.value[dayN - 1].lessons.find(
    (l) =>
      l.n === newLesson.n &&
      l.day === newLesson.day &&
      l.group === newLesson.group &&
      l.subject === newLesson.subject &&
      l.classroom === newLesson.classroom
  );

  console.log("Is lesson in timetable?", isLessonInTimetable);

  // If lesson's already in the timetable, do not apply the change
  if (isLessonInTimetable) {
    alert("Урок уже есть в расписании");
    nextTick(refreshTableValues);
    return;
  }

  // Apply the change
  curLesson = JSON.parse(JSON.stringify(newLesson));

  // Sort lessons by number and group
  curDay.lessons = timetable.value[dayN - 1].lessons.sort((a, b) =>
    a.n !== b.n ? a.n - b.n : a.group - b.group
  );

  // Refresh the table
  nextTick(refreshTableValues);
};

const deleteLesson = (lesson: TimetableLesson) => {
  timetable.value[lesson.day - 1].lessons.splice(
    timetable.value[lesson.day - 1].lessons.indexOf(lesson),
    1
  );
};
</script>

<template>
  <loading :is-loading="isLoading">
    <div class="row justify-content-center">
      <div class="col-7 mb-5">
        <button class="btn btn-outline-success me-auto">
          <i class="bi bi-cloud-arrow-up me-2"></i> Сохранить
        </button>
        <div v-if="timetableChanges.size">{{ changesInfo }}</div>
      </div>
      <div v-for="day in timetable" class="col-7">
        <table class="table table-bordered table-sm table">
          <thead>
            <tr class="text-center table-dark">
              <th colspan="5">{{ getDayName(day.weekday) }}</th>
            </tr>
            <tr>
              <th style="width: 10%">#</th>
              <th>Предмет</th>
              <th>Аудитория</th>
              <th>Группа</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lesson in day.lessons">
              <!-- Lesson number -->
              <td>
                <input
                  :disabled="isLoading"
                  class="n-field-input"
                  :id="`n-${day.weekday}-${lesson.n}-${lesson.group}`"
                  type="number"
                  min="1"
                  max="15"
                  @change="editLesson"
                />
              </td>
              <!-- Subject -->
              <td>
                <select
                  :disabled="isLoading"
                  :id="`subject-${day.weekday}-${lesson.n}-${lesson.group}`"
                  class="field-input subject-select"
                  @change="editLesson"
                >
                  <option value="">---</option>
                  <option
                    v-for="subject in subjectOptions"
                    :value="subject.value"
                    :selected="lesson.subject === subject.value"
                  >
                    {{ subject.label }}
                  </option>
                </select>
              </td>
              <!-- Classroom -->
              <td>
                <input
                  :disabled="isLoading"
                  :id="`classroom-${day.weekday}-${lesson.n}-${lesson.group}`"
                  class="field-input"
                  @change="editLesson"
                />
              </td>
              <!-- Group -->
              <td>
                <select
                  :disabled="isLoading"
                  class="field-input group-select"
                  :id="`group-${day.weekday}-${lesson.n}-${lesson.group}`"
                  @change="editLesson"
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
                @click="deleteLesson(lesson)"
              >
                <i class="bi-dash-circle text-danger"></i>
              </td>
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
