<template>
  <div class="mb-3">
    <!-- Date, if the task is first in a group -->
    <h2 v-if="showDate" class="mb-3 date" :class="{ 'mt-4': index !== 0 }">
      {{ getDateBadge(task.date) }}
    </h2>
    <div class="py-2 task ps-md-3">
      <!-- Subject -->
      <div class="d-flex flex-row align-items-center mb-3">
        <img class="subject-icon me-2" :src="subject.icon" alt="" />
        <h3 class="mb-0">
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
                <i
                  class="text-primary ms-2 bi-file-earmark-arrow-down-fill"
                ></i>
              </td>
              <td class="link-primary file-name">
                {{ getFileName(file.file) }}
              </td>
              <td class="file-size text-muted">
                {{ getFileSize(file.size) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { APIHomework } from "@/api/services/homework";
import { APISubject } from "@/api/services/subjects";
import { getMarked } from "@/utils/marked";
import { capitalize } from "@/utils/strings";
import { getFileSize } from "@/utils/files";

import { nextTick, onMounted, onUnmounted, ref } from "vue";
import ClipboardJS from "clipboard";

interface Props {
  task: APIHomework;
  subject: APISubject;
  showDate?: boolean;
  index: number;
}

const contentEl = ref<null | HTMLElement>(null);
const clipboards = ref<ClipboardJS[]>([]);

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
  window.location = file as unknown as Location;
};

onMounted(() => {
  nextTick(() => {
    const code_els = (contentEl.value as HTMLElement).querySelectorAll(
      "pre code.hljs"
    );
    if (!code_els) return;
    let index = 0;
    for (let c of code_els) {
      c.id = "code-block-" + index;
      const copy_btn_html = `
      <button class="code-copy-btn btn btn-outline-light">
        <i class="bi-clipboard"></i>
      </button>`;
      const btnWrapper = document.createElement("div");
      btnWrapper.innerHTML = copy_btn_html;
      btnWrapper.setAttribute("data-clipboard-target", `#code-block-${index}`);
      btnWrapper.classList.add("code-copy-btn-wrapper");

      let walker = document.createTreeWalker(
        btnWrapper,
        NodeFilter.SHOW_TEXT,
        null
      );

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

const { subject, task, showDate = false } = defineProps<Props>();
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
  top: 0.8rem;
  right: 0.8rem;
}

.content :last-child {
  margin-bottom: 0 !important;
}
</style>
