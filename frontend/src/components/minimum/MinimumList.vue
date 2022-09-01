<template>
  <div class="container rt-wp mt-4">
    <diary-plugin :plugin="DiaryPlugins.MINIMUM">
      <loading :is-loading="isLoading">
        <div class="row justify-content-center" id="settings-section">
          <div class="col-12 col-md-10 col-lg-8">
            <h1 class="mb-4">Образовательный минимум</h1>
            <div class="card card-body mb-4" v-if="minimums === null">
              <div class="mb-3">
                <form-select
                  v-model="selectedGrade"
                  :options="gradeOptions"
                  name="klass"
                  label="Класс"
                  @change=""
                />
              </div>
              <div class="mb-3">
                <form-select
                  v-model="selectedSubject"
                  :options="subjectOptions"
                  name="subject"
                  label="Предмет"
                  @change=""
                />
              </div>
              <div class="mb-3">
                <form-select
                  v-model="selectedQuarter"
                  :options="quarterOptions"
                  name="quarter"
                  label="Четверть"
                  @change=""
                />
              </div>
              <button class="btn btn-outline-dark" @click="minimumSearch">
                <i class="bi bi-search me-2"></i>Поиск
              </button>
            </div>
            <div v-else>
              <div v-if="minimums.count === 1" class="text-center mt-3">
                <div>
                  <a class="btn btn-dark" :href="minimums.results[0].file">
                    <i class="bi bi-download me-2"></i>
                    Скачать</a
                  >
                </div>

                <button class="btn btn-sm btn-outline-dark mt-3" @click="minimums = null">
                  Вернуться к поиску
                </button>
              </div>
              <div v-else-if="minimums.count === 0" class="text-center">
                <img
                  src="@/assets/icons/cactus.svg"
                  alt=""
                  class="mb-3 mt-4"
                  id="cactus-icon"
                  width="80"
                />
                <div class="mb-3">
                  <div>Файл не найден</div>
                  <div class="text-muted">
                    Воспользуйтесь
                    <a
                      href="https://school56.org/obrazovatelnyj-minimum-2015-2016"
                      target="_blank"
                      class="link-secondary"
                      >сайтом гимназии</a
                    >
                    или<br />оповестите нас в
                    <a href="https://diaryx_support.t.me" class="link-secondary" target="_blank"
                      >Telegram</a
                    >
                    об отсутствии минимума
                  </div>
                </div>
                <button class="btn btn-sm btn-outline-dark" @click="minimums = null">
                  Вернуться к поиску
                </button>
              </div>
            </div>
          </div>
        </div>
      </loading>
    </diary-plugin>
  </div>
</template>

<script lang="ts" setup>
import { APIMinimum, listMinimums } from "@/api/services/minimum";
import { listQuarters } from "@/api/services/quarters";
import { Paginator } from "@/api/types";
import { DiaryPlugins, pluginEnabled } from "@/utils/plugins";
import { onMounted, ref } from "vue";
import FormSelect, { SelectOption } from "../forms/FormSelect.vue";
import DiaryPlugin from "../DiaryPlugin.vue";
import Loading from "../Loading.vue";

const SUBJECTS = [
  "Информатика",
  "История",
  "Литература",
  "Математика",
  "Обществознание",
  "Русский язык",
  "Хим-Био",
  "Экономика",
  "Физика",
];

const minimums = ref<Paginator<APIMinimum> | null>(null);

const quarterOptions = ref<SelectOption[]>([]);
const subjectOptions: SelectOption[] = SUBJECTS.map((el) => ({
  label: el,
  value: el,
}));
const gradeOptions: SelectOption[] = Array.from({ length: 8 }, (_, i) => i + 4).map((el) => ({
  label: String(el),
  value: String(el),
  selected: el === 11,
}));

const isLoading = ref(true);

const selectedGrade = ref("11");
const selectedSubject = ref(SUBJECTS[0]);
const selectedQuarter = ref<string | null>(null);

onMounted(async () => {
  if (!pluginEnabled(DiaryPlugins.MINIMUM)) return;
  const quartersData = (await listQuarters()).data;
  quarterOptions.value = quartersData.map((el) => ({
    label: ["I", "II", "III", "IV"][el.number - 1],
    value: String(el.number),
  }));
  selectedQuarter.value = String(quartersData[0].number);
  isLoading.value = false;
});

const minimumSearch = async () => {
  const minimumData = (
    await listMinimums({
      grade: parseInt(selectedGrade.value),
      quarter__number: parseInt(selectedQuarter.value as string),
      subject: selectedSubject.value,
    })
  ).data;

  if (minimumData.count === 1) {
    window.open(minimumData.results[0].file, "_top");
  }

  minimums.value = minimumData;
};
</script>

<style scoped></style>
