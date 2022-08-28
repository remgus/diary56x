<template>
  <div class="container rt-wp mt-4">
    <div class="row justify-content-center" id="settings-section">
      <div class="col-12 col-md-10 col-lg-8">
        <h1 class="mb-3">Настройки</h1>

        <div class="card card-body mb-3">
          <h2 class="mb-3 card-title">Домашнее задание</h2>
          <div v-if="store.getters.isMonitor">
            <VuexSetting :options="homework_monitor_mode_default_options" />
            <hr class="mt-0 mb-2" />
            <VuexSetting :options="homework_edit_after_add_options" />
            <hr class="mt-0 mb-2" />
          </div>

          <VuexSetting :options="homework_max_page_count_options" />
          <hr class="mt-0 mb-2" />
          <VuexSetting :options="homework_hide_subject_icons_options" />
          <hr class="mt-0 mb-2" />
          <VuexSetting :options="homework_dates_preview_options" />
          <hr class="mt-0 mb-2" />
          <VuexSetting :options="homework_show_copy_code_options" />
          <hr class="mt-0 mb-2" />
          <VuexSetting :options="homework_show_file_size_options" />
        </div>

        <div class="card card-body">
          <h2 class="mb-3 card-title">Расписание</h2>
          <VuexSetting :options="timetable_show_today_tomorrow_options" />
          <hr class="mt-0 mb-2" />
          <VuexSetting :options="timetable_group_pairs_options" />
          <hr class="mt-0 mb-2" />
          <VuexSetting :options="timetable_hide_subject_icons_options" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { CheckboxSettingOptions } from "./types";
import VuexSetting from "./VuexSetting.vue";

const store = useStore();

const homework_monitor_mode_default_options: CheckboxSettingOptions<"homework_monitor_mode_default"> =
  {
    name: "homework_monitor_mode_default",
    label: "Режим редактирования для старост по умолчанию",
    type: "switch",
    checkedCondition: (val) => val === "edit",
    values: (v) => (v ? "edit" : "view"),
    special: true,
  };

const homework_max_page_count_options: CheckboxSettingOptions<"homework_limit_tasks"> =
  {
    name: "homework_limit_tasks",
    label: "Уменьшить отображаемое количество заданий",
    help: "Влияет на скорость загрузки",
    type: "switch",
  };

const homework_hide_subject_icons_options: CheckboxSettingOptions<"homework_hide_subject_icons"> =
  {
    name: "homework_hide_subject_icons",
    label: "Скрыть иконки предметов",
    type: "switch",
  };

const homework_dates_preview_options: CheckboxSettingOptions<"homework_hide_subject_icons"> =
  {
    name: "homework_dates_preview",
    label: "Предпросмотр домашнего задания в календаре",
    help: "При поиске показывает, на какие даты задано д/з",
    type: "switch",
  };

const timetable_show_today_tomorrow_options: CheckboxSettingOptions<"timetable_show_today_tomorrow"> =
  {
    name: "timetable_show_today_tomorrow",
    label: "Быстрый просмотр расписания",
    help: "Отдельно отображает расписание на сегодняшний и завтрашний дни",
    type: "switch",
  };

const timetable_group_pairs_options: CheckboxSettingOptions<"timetable_group_pairs"> =
  {
    name: "timetable_group_pairs",
    label: "Группировать парные уроки",
    type: "switch",
  };

const timetable_hide_subject_icons_options: CheckboxSettingOptions<"timetable_compact_mode"> =
  {
    name: "timetable_compact_mode",
    label: "Скрыть иконки предметов",
    type: "switch",
  };

const homework_edit_after_add_options: CheckboxSettingOptions<"homework_edit_after_add"> =
  {
    name: "homework_edit_after_add",
    label: "Выключать режим редактирования после добавления задания",
    type: "switch",
    special: true,
  };

const homework_show_copy_code_options: CheckboxSettingOptions<"homework_show_copy_code"> =
  {
    name: "homework_show_copy_code",
    label: "Показывать кнопку для копирования блоков кода",
    type: "switch",
  };
const homework_show_file_size_options: CheckboxSettingOptions<"homework_show_file_size"> =
  {
    name: "homework_show_file_size",
    label: "Показывать размер прикрепленных к заданию файлов",
    type: "switch",
  };
</script>

<style>
.vuex-setting:not(:last-child) {
  margin-bottom: 0.5rem;
}
</style>
