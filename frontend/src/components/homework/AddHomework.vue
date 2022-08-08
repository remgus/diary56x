<template>
  <div class="mt-4">
    <div class="mb-3">
      <label for="dp-input-datepicker" class="form-label">Дата</label>
      <Datepicker
        v-model="date"
        :enableTimePicker="false"
        :position="'left'"
        locale="ru"
        class="w-100"
        :select-text="'Выбрать'"
        :cancel-text="'Отмена'"
        :clearable="false"
        title="Выбор даты"
        uid="datepicker"
        required
      />
    </div>
    <div class="mb-3">
      <FormSelect
        name="subject"
        label="Предмет"
        :options="subjectOptions"
        v-model="selectedSubject"
      />
    </div>
    <div class="mb-3">
      <MarkdownEditor
        label="Текст задания"
        :options="homeworkMDEOptions"
        ref="mdeRef"
        name="content"
      />
    </div>
    <div class="mb-3">
      <DropZone name="attachments" ref="dropzoneRef" />
    </div>
    <div>
      <button class="btn btn-outline-dark" @click="submit">Добавить</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import MarkdownEditor from "../forms/MarkdownEditor.vue";
import Datepicker from "@vuepic/vue-datepicker";
import moment from "moment";
import FormSelect, { SelectOption } from "../forms/FormSelect.vue";
import { listSubjects } from "@/api/services/subjects";
import { useStore } from "@/store";
import { homeworkMDEOptions } from "@/utils/mde";
import DropZone from "../forms/DropZone.vue";
import { addHomework, CreateHomeworkData } from "@/api/services/homework";
import router from "@/router";

const store = useStore();

const date = ref<Date>(moment().add(1, "days").toDate());
const mdeRef = ref<null | typeof MarkdownEditor>(null);
const subjectOptions = ref<SelectOption[]>([]);
const selectedSubject = ref<null | string>(null);
const dropzoneRef = ref<null | typeof DropZone>(null);

onMounted(() => {
  const klass = store.getters.klass;
  if (klass) {
    listSubjects({ klass }).then((res) => {
      subjectOptions.value = res.data.map((s) => ({
        label: s.name,
        value: String(s.id),
      }));

      selectedSubject.value = subjectOptions.value[0].value;
    });
  }
});

const submit = () => {
  const createHomeworkData: CreateHomeworkData = {
    content: mdeRef.value?.getValue ? mdeRef.value.getValue() : "",
    attachments:
      dropzoneRef.value && dropzoneRef.value.droppedFiles.value
        ? dropzoneRef.value.droppedFiles.value
        : [],
    subject: selectedSubject.value as string,
    klass: String(store.getters.klass),
    date: moment(date.value.toDateString()).format("DD-MM-YYYY"),
  };

  addHomework(createHomeworkData).then((res) => {
    router.push({
      name: "home",
      query: {
        section: "homework",
      },
    });
  });
};
</script>
