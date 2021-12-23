<template>
  <div>
    <div
      class="atk-box"
      @drag.prevent
      @dragstart.prevent
      @dragend.prevent="setBoxHighlight(false)"
      @dragover.prevent
      @dragenter.prevent="setBoxHighlight(true)"
      @dragleave.prevent="setBoxHighlight(false)"
      @drop.prevent="fileDropped"
      :class="{ 'atk-invalid': !isValid, 'is-dragover': boxHighlighted }"
    >
      <div class="text-center">
        <input
          id="file"
          type="file"
          ref="inputRef"
          class="box__file"
          @change.prevent="fileSelected"
          :multiple="multiple"
          :required="isRequired"
          :accept="accept"
        />
        <label for="file" class="atk-dropzone-label">
          <strong>Выберите файл</strong>
          <span> или перетащите его</span>
        </label>
        <div class="atk-error" v-if="boxError">
          {{ boxError }}
        </div>
        <div class="atk-file-list">
          <div v-if="droppedFiles.length">
            {{
              $utils.stringUtils.capitalize(
                $utils.translation.plural(droppedFiles.length, [
                  "выбран",
                  "выбрано",
                  "выбрано",
                ])
              )
            }}
            {{
              $utils.translation.plural(
                droppedFiles.length,
                ["файл", "файла", "файлов"],
                true
              )
            }}
            <div v-for="file in droppedFiles" :key="file">
              {{ file.name }} ({{ $utils.files.getFileSize(file.size) }})
            </div>
          </div>
          <div v-else>Не выбрано ни одного файла</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement | null>(null);
    const droppedFiles = ref<Array<File>>([]);
    const boxHighlighted = ref(false);
    const boxError = ref("");

    const isValid = computed(() => {
      return !boxError.value;
    });

    const setBoxHighlight = (s: boolean) => {
      boxHighlighted.value = s;
    };

    const submitForm = (): void => {
      boxError.value = "";
      let data = new FormData();
      if (droppedFiles.value.length) {
        droppedFiles.value.forEach((file) => data.append(props.name, file));
        emit("update:modelValue", data);
      }
    };

    const fileDropped = (e: DragEvent) => {
      setBoxHighlight(false);
      if (!props.multiple) droppedFiles.value = [];
      if (e.dataTransfer) {
        for (let file of e.dataTransfer.files) droppedFiles.value.push(file);
      }
      submitForm();
    };

    const fileSelected = () => {
      console.log("Changed", inputRef.value);
      if (!props.multiple) droppedFiles.value = [];
      if (inputRef.value?.files?.length) {
        for (let file of inputRef.value.files) {
          if (!droppedFiles.value.includes(file)) droppedFiles.value.push(file);
        }
      }
      submitForm();
    };

    const clearInput = () => {
      droppedFiles.value = [];
      if (inputRef.value) inputRef.value.value = "";
    };

    const validate = () => {
      if (props.isRequired && droppedFiles.value.length === 0) {
        boxError.value = "Необходимо выбрать файл";
        return false;
      }
      if (props.multiple && droppedFiles.value.length > props.fileLimit) {
        boxError.value = "Выбрано слишком много файлов";
        return false;
      }
      return true;
    };

    return {
      inputRef,
      boxHighlighted,
      setBoxHighlight,
      fileDropped,
      isValid,
      clearInput,
      fileSelected,
      validate,
      boxError,
      droppedFiles,
    };
  },
  props: {
    // Name that is used to pass dropped/selected files to `FormData`.
    name: { type: String, required: true },
    multiple: { type: Boolean, default: false },
    fileLimit: { type: Number, default: 1 },
    isRequired: { type: Boolean, default: false },
    accept: { type: String, default: "" },
  },
});
</script>

<style scoped>
:root {
  --bs-primary: #0d6efd;
  --bs-danger: #dc3545;
}

.atk-box.atk-invalid {
  outline: var(--bs-danger) dashed 2px;
}

.atk-box {
  font-size: 1rem;
  background-color: #f1f1f1;
  position: relative;
  outline: var(--bs-primary) dashed 2px;
  outline-offset: -10px;
  padding: 3rem;
  -webkit-transition: outline-offset 0.15s ease-in-out,
    background-color 0.15s linear;
  transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear;
}

.atk-box.is-dragover {
  outline-offset: -20px;
  outline-color: #a1baff;
  background-color: #ffffff;
}

.box__file {
  width: 100%;
  height: 100%;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

.box__file + label {
  max-width: 80%;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
}

.box__file + label:hover strong,
.box__file:focus + label strong,
.box__file.has-focus + label strong {
  color: var(--bs-primary);
}

.box__file:focus + label,
.box__file.has-focus + label {
  outline: 1px dotted #000000;
}

.atk-error {
  font-style: italic;
}

.atk-file-list {
  font-size: 0.8rem;
}
</style>
