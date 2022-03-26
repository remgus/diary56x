<script setup lang="ts">
import { nextTick, onMounted, onUpdated, ref } from "vue";
import { Loading } from "@/components";
import { SelectOption } from "@/components/forms/FormSelect.vue";
import { APITimetable, getTimeTable } from "@/api/services/timetable";
import { getDayName } from "@/utils/date";
import { listSubjects } from "@/api/services/subjects";
import { onBeforeRouteLeave } from "vue-router";

const props = defineProps({
  klass: {
    type: String,
    required: true,
  },
});

// Shows whether the timetable is being loaded
const isLoading = ref(true);

// Timetable data
const timetable = ref<APITimetable[]>([]);

// Lessons indexes (array from 1 to 10)
const lessons = Array.from({ length: 10 }, (_, i) => i + 1);

const subjectOptions = ref<SelectOption[]>([]);

interface TimetableChange {
  subject?: string;
  classroom?: string;
}

const timetableChanges = ref(new Map<string, TimetableChange>());

const setInitialValues = () => {
  lessons.forEach((lesson) => {
    timetable.value.forEach((day) => {
      const [subject, classroom] = getDayInfo(lesson, day.weekday);
      (
        document.getElementById(
          `subject-${day.weekday}-${lesson}`
        ) as HTMLInputElement
      ).value = subject;
      (
        document.getElementById(
          `classroom-${day.weekday}-${lesson}`
        ) as HTMLInputElement
      ).value = classroom;
    });
  });
};

const changeTimetable = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const id = target.id.split("-");
  const weekday = parseInt(id[1]);
  const lesson = parseInt(id[2]);
  const change_key = [weekday, lesson].join("-");

  const subject = (
    document.getElementById(`subject-${weekday}-${lesson}`) as HTMLInputElement
  ).value;
  const classroom = (
    document.getElementById(
      `classroom-${weekday}-${lesson}`
    ) as HTMLInputElement
  ).value;

  const initialValue = getDayInfo(lesson, weekday);
  if (subject === initialValue[0] && classroom === initialValue[1]) {
    timetableChanges.value.delete(change_key);
  } else {
    timetableChanges.value.set(change_key, {
      subject,
      classroom,
    });
  }
};

const refreshTimetable = async () => {
  const klassId = parseInt(props.klass);
  const subjects = (await listSubjects()).data;
  const ttData = (await getTimeTable(klassId)).data;

  subjectOptions.value = subjects.map((subject) => ({
    value: String(subject.id),
    label: subject.name,
  }));

  timetable.value = ttData;
  isLoading.value = false;

  nextTick(() => {
    setInitialValues();
  });
};

const getDayInfo = (lesson: number, day: number): [string, string] => {
  const dayTable = timetable.value.find((d) => d.weekday === day);
  if (!dayTable) return ["", ""];
  const subject = dayTable.lessons.find((l) => l.n === lesson);
  if (!subject) return ["", ""];
  return [String(subject.subject.id), subject.classroom];
};

onMounted(refreshTimetable);
onUpdated(() => {
  if (timetableChanges.value.size !== 0) {
    const answer = window.confirm(
      "Вы действительно хотите выйти? Вы не сохранили изменения."
    );
    if (answer) timetableChanges.value.clear();
  }
  refreshTimetable();
});

onBeforeRouteLeave(() => {
  if (timetableChanges.value.size === 0) return true;
  const answer = window.confirm(
    "Вы действительно хотите выйти? Вы не сохранили изменения."
  );
  // cancel the navigation and stay on the same page
  if (!answer) return false;
  timetableChanges.value.clear();
});
</script>

<template>
  <loading :is-loading="isLoading">
    <button class="btn btn-outline-success btn-sm mb-4">
      <i class="bi bi-cloud-arrow-up me-2"></i> Сохранить
    </button>
    <div class="table-responsive">
      <table class="table table-bordered table-sm">
        <thead>
          <tr class="text-center table-dark">
            <th></th>
            <th v-for="day in timetable" colspan="2">
              {{ getDayName(day.weekday) }}
            </th>
          </tr>
          <tr>
            <th>#</th>
            <template v-for="_ in timetable">
              <th>Предмет</th>
              <th>Аудитория</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lesson in lessons">
            <th>{{ lesson }}</th>
            <template v-for="day in timetable">
              <td
                class="input-wrapper"
                :class="{
                  'was-changed': timetableChanges.has(
                    [day.weekday, lesson].join('-')
                  ),
                }"
              >
                <select
                  :disabled="isLoading"
                  :id="`subject-${day.weekday}-${lesson}`"
                  class="field-input subject-select"
                  @change="changeTimetable"
                >
                  <option value="">---</option>
                  <option
                    v-for="subject in subjectOptions"
                    :value="subject.value"
                    :selected="
                      subject.value === getDayInfo(lesson, day.weekday)[0]
                    "
                  >
                    {{ subject.label }}
                  </option>
                </select>
              </td>
              <td
                class="input-wrapper"
                :class="{
                  'was-changed': timetableChanges.has(
                    [day.weekday, lesson].join('-')
                  ),
                }"
              >
                <input
                  :disabled="isLoading"
                  :id="`classroom-${day.weekday}-${lesson}`"
                  class="field-input"
                  @change="changeTimetable"
                />
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </loading>
</template>

<style scoped>
.field-input {
  border: none;
  border-width: 0;
  box-sizing: border-box;
}

.field-input:focus {
  outline: none;
}

.input-wrapper {
  height: 100%;
}

.subject-select {
  background-color: white;
  width: min-content;
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
</style>
