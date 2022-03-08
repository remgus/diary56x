<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    ref="modalEl"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ content }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Отмена
          </button>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="successCallback"
          >
            ОК
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Modal } from "bootstrap";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  callback: {
    type: Function,
    required: false,
  },
});

const modalEl = ref<HTMLElement | null>(null);
const bsModal = ref<Modal | null>(null);

onMounted(() => {
  if (!modalEl.value) return;
  bsModal.value = new Modal(modalEl.value);
});

const open = () => {
  if (!bsModal.value) return;
  bsModal.value.show();
};

const close = () => {
  if (!bsModal.value) return;
  bsModal.value.hide();
};

const successCallback = () => {
  bsModal.value?.hide();
  if (props.callback) props.callback();
};

const toggle = () => {
  if (!bsModal.value) return;
  bsModal.value.toggle();
};

const dispose = () => {
  if (!bsModal.value) return;
  bsModal.value.dispose();
};
</script>

<style></style>
