<template>
  <div
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    ref="toast"
  >
    <div class="toast-header">
      <img
        src="@/assets/icons/logo.svg"
        class="rounded me-2"
        alt="..."
        width="20"
      />
      <strong class="me-auto">{{
        notification.title ? notification.title : "Diary56x"
      }}</strong>
      <small>{{ getTime(notification.created_at) }}</small>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
        @click="markAsRead"
      ></button>
    </div>
    <div class="toast-body" v-html="getMarked(notification.text, true)"></div>
  </div>
</template>

<script lang="ts">
import {
  APINotification,
  markNotificationAsRead,
} from "@/api/services/notifications";
import { Toast } from "bootstrap";
import { defineComponent, onMounted, PropType, ref } from "vue";
import { getMarked } from "@/utils/marked";

export default defineComponent({
  emits: ["toast-closed"],
  setup(props, { emit }) {
    const toast = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      if (toast.value) {
        const toastElement = toast.value;
        const toastInstance = Toast.getOrCreateInstance(toastElement, {
          autohide: true,
          delay: 20000,
        });
        toastInstance?.show();
        toastElement.addEventListener(
          "hidden.bs.toast",
          () => {
            emit("toast-closed", toast.value);
          },
          { once: true }
        );
      }
    });

    const getTime = (date: string) => {
      const d = new Date(date);
      return d.toLocaleString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      });
    };

    const markAsRead = async () => {
      if (props.notification.id) {
        markNotificationAsRead(props.notification.id);
      }
    };

    return { toast, getMarked, getTime, markAsRead };
  },
  props: {
    notification: {
      type: Object as PropType<APINotification>,
      required: true,
    },
  },
});
</script>

<style></style>
