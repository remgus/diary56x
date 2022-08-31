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
        name="change-howework-content"
      />
    </div>
    <div class="mb-3">
      <DropZone name="attachments" ref="dropzoneRef" multiple />
    </div>
    <div>
      <button class="btn btn-outline-dark" @click="submit">Сохранить</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from "vue";
import MarkdownEditor from "../forms/MarkdownEditor.vue";
import Datepicker from "@vuepic/vue-datepicker";
import moment from "moment";
import FormSelect, { SelectOption } from "../forms/FormSelect.vue";
import { listSubjects } from "@/api/services/subjects";
import { useStore } from "@/store";
import DropZone from "../forms/DropZone.vue";
import { APIHomework, CreateHomeworkData } from "@/api/services/homework";
import { Options } from "easymde";

interface Props {
  submitCallback: () => void;
  instance: APIHomework | null;
}

const { submitCallback, instance = null } = defineProps<Props>();
const store = useStore();

const date = ref<Date>(moment(instance?.date).toDate());
const mdeRef = ref<null | typeof MarkdownEditor>(null);
const subjectOptions = ref<SelectOption[]>([]);
const selectedSubject = ref<null | string>(String(instance?.subject));
const dropzoneRef = ref<null | typeof DropZone>(null);

const homeworkMDEOptions: Options = {
  autofocus: false,
  tabSize: 4,
  spellChecker: false,
  renderingConfig: {
    singleLineBreaks: false,
    codeSyntaxHighlighting: true,
  },
  initialValue: instance?.content,
};

onMounted(() => {
  const klass = store.getters.klass?.id;
  if (klass) {
    listSubjects({ klass }).then((res) => {
      subjectOptions.value = res.data.map((s) => ({
        label: s.name,
        value: String(s.id),
        selected: s.id === instance?.subject,
      }));

      selectedSubject.value = String(instance?.subject);
    });
  }
});

const submit = () => {
  const newHomeworkData: CreateHomeworkData = {
    content: mdeRef.value?.getValue ? mdeRef.value.getValue() : "",
    // attachments: dropzoneRef.value ? Object.assign({}, dropzoneRef.value).droppedFiles.slice() : [],
    subject: selectedSubject.value as string,
    klass: String(store.getters.klass?.id),
    date: moment(date.value.toDateString()).format("DD-MM-YYYY"),
  };

  // addHomework(createHomeworkData).then(submitCallback);
};
</script>
