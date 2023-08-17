<template>
  <div class="mt-4">
    <div
      v-for="e in generalErrors"
      id="add-hw-general-errors"
      v-if="isBound && generalErrors.length"
      class="alert alert-danger"
    >
      {{ e }}
    </div>
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
      >
        <template #dp-input="{ value, onInput, onEnter, onTab, onClear }">
          <input
            type="text"
            :value="value"
            class="form-control"
            :class="{
              'is-invalid': isBound && dateErrors.length,
            }"
            @click="if (isBound) isBound = false;"
          />
          <div v-for="e in dateErrors" class="invalid-feedback order-1">
            {{ e }}
          </div>
        </template>
      </Datepicker>
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
      <DropZone name="attachments" ref="dropzoneRef" multiple />
      <div
        v-for="e in fileErrors"
        v-if="isBound && fileErrors.length"
        class="alert alert-danger mt-3"
      >
        {{ e }}
      </div>
    </div>
    <div>
      <button class="btn btn-outline-dark" @click="submit">Добавить</button>
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
import { homeworkMDEOptions } from "@/utils/mde";
import DropZone from "../forms/DropZone.vue";
import { addHomework, CreateHomeworkData } from "@/api/services/homework";
import { AxiosError } from "axios";
import { handleBackendError } from "@/utils/forms";

interface Props {
  addedCallback: () => void;
}

const props = defineProps<Props>();
const store = useStore();

const dropzoneRef = ref<null | typeof DropZone>(null);
const mdeRef = ref<null | typeof MarkdownEditor>(null);

const date = ref<Date>(moment().add(1, "days").toDate());
const subjectOptions = ref<SelectOption[]>([]);
const selectedSubject = ref<null | string>(null);

// Field error messages
const generalErrors = ref<string[]>([]);
const dateErrors = ref<string[]>([]);
const fileErrors = ref<string[]>([]);

const isBound = ref(false);

onMounted(() => {
  const klass = store.getters.klass?.id;
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
  isBound.value = true;
  generalErrors.value = [];
  dateErrors.value = [];
  fileErrors.value = [];

  const createHomeworkData: CreateHomeworkData = {
    content: mdeRef.value?.getValue ? mdeRef.value.getValue() : "",
    attachments: dropzoneRef.value ? Object.assign({}, dropzoneRef.value).droppedFiles.slice() : [],
    subject: selectedSubject.value as string,
    klass: String(store.getters.klass?.id),
    date: moment(date.value).format("DD-MM-YYYY"),
  };

  addHomework(createHomeworkData)
    .then(props.addedCallback)
    .catch((e: AxiosError) => {
      handleBackendError(e, {
        "400": {
          date: (msgs) => {
            if (msgs) dateErrors.value = msgs;
          },
          attachments: (msgs) => {
            if (msgs) fileErrors.value = msgs;
          },
          non_field_errors: (msgs) => {
            if (msgs) {
              generalErrors.value = msgs;
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          },
        },
      });
    });
};
</script>
