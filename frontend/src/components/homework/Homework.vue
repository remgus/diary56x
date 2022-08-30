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
    <div v-if="!addHwPage" class="row justify-content-center">
      <div class="col-12">
        <div class="d-flex flex-row mb-4">
          <datepicker
            v-model="(date as Date[])"
            range
            :enableTimePicker="false"
            :partial-range="true"
            :position="'left'"
            locale="ru"
            class="w-100"
            :select-text="'Выбрать'"
            :cancel-text="'Отмена'"
            :clearable="false"
            :markers="markers"
            title="Выбор даты"
          />
          <button class="btn btn-outline-dark ms-2">
            <i class="bi-arrow-clockwise" @click="fetchHomework(true)"></i>
          </button>
          <button
            title="Режим редактирования"
            v-if="monitorsPluginEnabled && store.getters.isMonitor"
            class="btn btn-outline-dark ms-2"
            @click="editingMode = !editingMode"
          >
            <i
              :class="{ 'bi-pencil': !editingMode, 'bi-check': editingMode }"
            ></i>
          </button>
          <button
            v-if="editingMode"
            title="Добавить задание"
            class="btn btn-outline-dark ms-2"
            @click="() => (addHwPage = true)"
          >
            <i class="bi-plus"></i>
          </button>
        </div>

        <Loading :is-loading="hwLoading">
          <div v-if="homework?.results && homework.results.length">
            <div
              v-for="(task, index) in homework?.results"
              :key="task.id"
              class="mb-0"
            >
              <TaskCard
                :subject="subjects[task.subject]"
                :task="task"
                :show-date="
                  index === 0 ||
                  (index > 0 && homework.results[index - 1].date !== task.date)
                "
                :index="index"
                :editing="editingMode"
                :delete-callback="() => fetchHomework(true)"
              />
            </div>
            <div
              v-if="homework.next"
              class="text-center"
              @click="
                () => {
                  page++;
                  fetchHomework();
                }
              "
            >
              <button class="btn btn-outline-primary">Загрузить ещё</button>
            </div>
          </div>

          <div v-else class="text-center">
            <img :src="cactus_icon" alt="" width="80" class="mb-2" />
            <div>Домашнее задание не найдено</div>
          </div>
        </Loading>
      </div>
    </div>
    <div v-else>
      <div class="d-flex flex-row align-items-center w-100">
        <h2 class="my-0 me-auto">Добавить домашнее задание</h2>
        <button class="btn btn-outline-dark" @click="() => (addHwPage = false)">
          <i class="bi-x-lg"></i>
        </button>
      </div>

      <AddHomework :added-callback="addedHwCallback" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  APIHomework,
  listHomework,
  listHomeworkDates,
} from "@/api/services/homework";
import { APISubject, listSubjects } from "@/api/services/subjects";
import { useStore } from "@/store";
import { computed, onMounted, ref, watch } from "vue";
import cactus_icon from "@/assets/icons/cactus.svg";
import Datepicker from "@vuepic/vue-datepicker";
import moment from "moment";
import { Paginator } from "@/api/types";
import TaskCard from "./TaskCard.vue";
import "katex/dist/katex.css";
import "highlight.js/styles/atom-one-dark.css";
import AddHomework from "./AddHomework.vue";
import Loading from "../Loading.vue";
import { DiaryPlugins, pluginEnabled } from "@/utils/plugins";

const store = useStore();
const monitorsPluginEnabled = computed(() =>
  pluginEnabled(DiaryPlugins.MONITORS)
);


type DatePickerRef = [Date, Date] | [Date, null];

type Marker = {
  date: Date | string;
  type?: "dot" | "line";
  tooltip?: { text: string; color?: string }[];
  color?: string;
};

const date = ref<DatePickerRef>([
  moment().toDate(),
  moment().add(7, "days").toDate(),
]);
const homework = ref<null | Paginator<APIHomework>>(null);
const subjects = ref<{ [n: number]: APISubject }>({});
const page = ref(1);
const markers = ref<Marker[]>([]);
const addHwPage = ref(false);
const hwLoading = ref(true);

// Get list of markers for datepicker component
const getHomeworkDates = async () => {
  const hwDates = (
    await listHomeworkDates({
      klass: store.getters.klass as number,
      has_content: true,
    })
  ).data;

  markers.value = hwDates.map(
    (val): Marker => ({
      date: val,
      color: "blue",
    })
  );
};

// When the component is mounted, get a list of subjects and fetch homework.
onMounted(async () => {
  const data = (await listSubjects()).data;
  for (const s of data) subjects.value[s.id] = s;
  fetchHomework();
});

const fetchHomework = async (reset = false) => {
  hwLoading.value = true;

  if (!date.value.length) return;

  const dates = date.value
    .slice()
    .map((val) => (val === null ? null : moment(val).format("YYYY-MM-DD")));

  if (dates[0] === null) return;

  let date_after = dates[0],
    date_before = dates[1] === null ? dates[0] : dates[1];

  const data = (
    await listHomework({
      date_after: date_after,
      date_before: date_before,
      has_content: true,
      page: page.value,
      page_size: store.state.settings.homework_limit_tasks ? 10 : 100,
      klass: store.getters.klass as number,
    })
  ).data;

  homework.value = {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: homework.value?.results.length ? homework.value.results : [],
  };

  if (!reset) homework.value.results.push(...data.results);
  else homework.value.results = data.results;

  if (store.state.settings.homework_dates_preview) getHomeworkDates();

  hwLoading.value = false;
};

// Refresh homework list every time user changes the date
watch(date, () => fetchHomework(true));

const editingMode = ref(
  store.state.settings.homework_monitor_mode_default === "edit" &&
    monitorsPluginEnabled
);

const addedHwCallback = () => {
  fetchHomework(true);
  addHwPage.value = false;
  if (store.state.settings.homework_edit_after_add) editingMode.value = false;
};
</script>

<style lang="scss">
.dp__action.dp__select {
  color: var(--bs-primary) !important;
}

@import "@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss";
</style>
