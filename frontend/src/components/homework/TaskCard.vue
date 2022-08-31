<template>
  <div class="mb-3">
    <!-- Date, if the task is first in a group -->
    <h2 v-if="showDate" class="mb-3 date" :class="{ 'mt-4': index !== 0 }">
      {{ getDateBadge(task.date) }}
    </h2>
    <div class="py-2 task ps-md-3 position-relative">
      <!-- Subject -->
      <div class="d-flex flex-row align-items-center mb-3">
        <img
          v-if="subject.icon && !hideSubject"
          class="subject-icon me-2"
          :src="subject.icon"
          alt=""
        />
        <h3 class="mb-0 gsans fw-bold">
          {{ subject.name }}
        </h3>
      </div>

      <!-- Markdown content -->
      <div
        ref="contentEl"
        class="content"
        v-if="task.content"
        v-html="getMarked(task.content)"
      ></div>

      <!-- Attachments list -->
      <div v-if="task.attachments.length">
        <div class="fw-bold mt-3 mb-1">Прикрепленные файлы:</div>

        <table class="table table-sm mb-0">
          <tbody>
            <tr
              class="file-link"
              style="width: 1%"
              v-for="(file, index) in task.attachments"
              :key="file.id"
              @click="openFile(file.file)"
            >
              <td>
                <i class="text-primary ms-2 bi-file-earmark-arrow-down-fill"></i>
              </td>
              <td class="link-primary file-name">
                {{ getFileName(file.file) }}
              </td>
              <td
                class="file-size text-muted text-end"
                v-if="store.state.settings.homework_show_file_size"
              >
                {{ getFileSize(file.size) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="editing" class="position-absolute top-0 end-0">
        <button class="btn btn-sm btn-outline-dark me-1" @click="openEditPage(task)">
          <i class="bi-pencil"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" @click="showConfirmDialog">
          <i class="bi-trash"></i>
        </button>
      </div>
    </div>
  </div>

  <confirm-dialog
    title="Подтверждение удаления"
    content="Вы уверены, что хотите удалить это задание?"
    :callback="
      () => {
        deleteHomework(task.id);
        deleteCallback();
      }
    "
    ref="confirmDialog"
  />
</template>

<script lang="ts" setup>
import { APIHomework, deleteHomework } from "@/api/services/homework";
import { APISubject } from "@/api/services/subjects";
import { getMarked } from "@/utils/marked";
import { capitalize } from "@/utils/strings";
import { getFileSize } from "@/utils/files";
import { useConfirmDialog } from "@/utils/dialog";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import ClipboardJS from "clipboard";
import { useStore } from "@/store";

interface Props {
  task: APIHomework;
  subject: APISubject;
  showDate?: boolean;
  index: number;
  editing?: boolean;
  deleteCallback: () => void;
  openEditPage: (task: APIHomework) => void;
}

const contentEl = ref<null | HTMLElement>(null);
const clipboards = ref<ClipboardJS[]>([]);
const store = useStore();

const hideSubject = computed(() => store.state.settings.homework_hide_subject_icons);

const getDateBadge = (date: string) => {
  let d = new Date(date);
  return capitalize(
    d.toLocaleDateString("ru", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  );
};

const getFileName = (filepath: string) => {
  const decoded = decodeURI(filepath).split("/");
  return decoded[decoded.length - 1];
};

const openFile = (file: string) => {
  window.open(file, "_blank")?.focus();
};

onMounted(() => {
  nextTick(() => {
    if (!store.state.settings.homework_show_copy_code) return;
    if (!contentEl.value) return;
    const code_els = contentEl.value.querySelectorAll("pre code.hljs");
    if (!code_els.length) return;
    let index = 0;
    for (let c of code_els) {
      c.id = "code-block-" + index;
      const copy_btn_html = `
      <button class="code-copy-btn btn btn-sm btn-outline-light">
        <i class="bi-clipboard"></i>
      </button>`;
      const btnWrapper = document.createElement("div");
      btnWrapper.innerHTML = copy_btn_html;
      btnWrapper.setAttribute("data-clipboard-target", `#code-block-${index}`);
      btnWrapper.classList.add("code-copy-btn-wrapper");

      let walker = document.createTreeWalker(btnWrapper, NodeFilter.SHOW_TEXT, null);

      let node;
      while ((node = walker.nextNode())) {
        if (node.textContent && (!node.previousSibling || !node.nextSibling))
          node.textContent = node.textContent.replace(/^(&nbsp;|\s)*/, "");
      }

      c.appendChild(btnWrapper);

      nextTick(() => {
        clipboards.value.push(new ClipboardJS(btnWrapper));
      });
    }
  });
});

onUnmounted(() => {
  for (const c of clipboards.value) c.destroy();
});

const { showConfirmDialog, confirmDialog } = useConfirmDialog();

const { subject, task, showDate = false, editing = false, deleteCallback } = defineProps<Props>();
</script>

<style scoped>
.subject-icon {
  width: 23px;
  height: 23px;
}

.file-link {
  cursor: pointer;
}

.file-name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 0;
  width: 99%;
}

.file-size {
  white-space: nowrap;
  width: 1%;
}

table tbody tr:last-child td {
  border-bottom: none !important;
}

@media (min-width: 768px) {
  div.task {
    border-left: 4px solid var(--bs-primary);
  }
}
</style>

<style>
pre code.hljs {
  border-radius: 5px !important;
  position: relative;
}

.code-copy-btn-wrapper {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.content :last-child {
  margin-bottom: 0 !important;
}
</style>
