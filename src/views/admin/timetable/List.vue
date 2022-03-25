<template>
  <div class="container rt-wp mt-4">
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Главная</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/admin">Панель администратора</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Расписание</li>
      </ol>
    </nav>

    <loading :isLoading="selectedKlass === null">
      <div class="text-center mb-4">
        <h1 class="heading">Редактирование расписания</h1>
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

      <loading :is-loading="isLoading">
        <button class="btn btn-outline-primary mb-4">
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
                  <td class="input-wrapper">
                    <input
                      :disabled="isLoading"
                      :id="`subject-${day.weekday}-${lesson}`"
                      class="field-input"
                      :value="getDayInfo(lesson, day.weekday)[0]"
                      @change="changeTimetable"
                    />
                  </td>
                  <td class="input-wrapper">
                    <input
                      :disabled="isLoading"
                      :id="`classroom-${day.weekday}-${lesson}`"
                      class="field-input"
                      :value="getDayInfo(lesson, day.weekday)[1]"
                      @change="changeTimetable"
                    />
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
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
import { APITimetable, getTimeTable } from "@/api/services/timetable";
import { getDayName } from "@/utils/date";
import { capitalize } from "@/utils/strings";

const store = useStore(key);
const user = computed(() => store.state.user);

// Shows whether the timetable is being loaded
const isLoading = ref(true);

// Class that is currently selected
const selectedKlass = ref<null | string>(null);

// Available options for the select
const klassOptions = ref<SelectOption[]>([]);

// Timetable data
const timetable = ref<APITimetable[]>([]);

// Lessons indexes (array from 1 to 10)
const lessons = Array.from({ length: 10 }, (_, i) => i + 1);

interface TimetableChange {
  subject?: string;
  classroom?: string;
}

const timetableChanges = new Map<string, TimetableChange>();

onMounted(() => {
  if (user.value && user.value.school) {
    listClassesCompact(user.value.school.id).then((res) => {
      klassOptions.value = res.data.map((klass) => ({
        value: String(klass.id),
        label: klass.name,
      }));

      selectedKlass.value = klassOptions.value[0].value;

      refreshTimetable();
    });
  }
});

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
    timetableChanges.delete(change_key);
  } else {
    timetableChanges.set(change_key, {
      subject,
      classroom,
    });
  }

  console.log(timetableChanges);
};

const refreshTimetable = () => {
  if (!selectedKlass.value) return;

  // TODO: Warn user if there are unsaved changes

  getTimeTable(parseInt(selectedKlass.value)).then((res) => {
    timetable.value = res.data;
    isLoading.value = false;
  });
};

const getDayInfo = (lesson: number, day: number): [string, string] => {
  const dayTable = timetable.value.find((d) => d.weekday === day);
  if (!dayTable) return ["", ""];
  const subject = dayTable.lessons.find((l) => l.n === lesson);
  if (!subject) return ["", ""];
  return [subject.subject.title, subject.classroom];
};
</script>

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
</style>
