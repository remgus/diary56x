<template>
  <div v-if="!store.getters.inKlass">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="alert alert-warning w-100 text-center">
          <img :src="cactus_icon" alt="" width="60" height="60" class="mb-2" />
          <div>
            Данная страница недоступна для не добавленных в класс учеников
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="row justify-content-center">
      <div class="col-12">
        <datepicker
          v-model="(date as Date[])"
          range
          :enableTimePicker="false"
          :partial-range="true"
          :position="'left'"
          locale="ru"
          class="mb-4"
          :select-text="'Выбрать'"
          :cancel-text="'Отмена'"
        />

        <div
          v-if="homework?.results && homework.results.length"
          v-for="(task, index) in homework?.results"
          :key="task.id"
          class="mb-0"
        >
          <TaskCard :subject="subjects[task.subject]" :task="task" />
          <hr v-if="index !== homework?.results.length - 1" class="mt-0" />
        </div>
        <div v-else class="text-center">
          <img :src="cactus_icon" alt="" width="60" height="60" class="mb-2" />
          <div>Домашнее задание не найдено</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { APIHomework, listHomework } from "@/api/services/homework";
import { APISubject, listSubjects } from "@/api/services/subjects";
import { useStore } from "@/store";
import { onMounted, ref, watch } from "vue";
import cactus_icon from "@/assets/icons/cactus.svg";
import Datepicker from "@vuepic/vue-datepicker";
import moment from "moment";
import { Paginator } from "@/api/types";
import TaskCard from "./TaskCard.vue";
import "katex/dist/katex.css";
import "highlight.js/styles/atom-one-dark.css";

const store = useStore();

type DatePickerRef = [Date, Date] | [Date, null];

const date = ref<DatePickerRef>([
  moment().toDate(),
  moment().add(7, "days").toDate(),
]);
const homework = ref<null | Paginator<APIHomework>>(null);
const subjects = ref<{ [n: number]: APISubject }>({});

onMounted(async () => {
  const data = (await listSubjects({ klass: store.getters.klass as number }))
    .data;
  for (const s of data) subjects.value[s.id] = s;
  fetchHomework();
});

const fetchHomework = async () => {
  if (!date.value.length) return;

  const dates = date.value
    .slice()
    .map((val) => (val === null ? null : moment(val).format("YYYY-MM-DD")));

  if (dates[0] === null) return;

  let date_after = dates[0],
    date_before = dates[1] === null ? dates[0] : dates[1];

  homework.value = (
    await listHomework({
      date_after: date_after,
      date_before: date_before,
      has_content: true,
    })
  ).data;
};

watch(date, fetchHomework);
</script>

<style lang="scss">
.dp__action.dp__select {
  color: var(--bs-primary) !important;
}

@import "@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss";
</style>
