<template>
  <div class="container mt-4 rt-wp">
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/blog">Блог</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Добавление записи
        </li>
      </ol>
    </nav>
    <h1 class="mb-4">Добавление записи</h1>
    <form novalidate ref="formRef">
      <div class="mb-3">
        <form-input
          name="title"
          label="Заголовок"
          v-model="data.title.value"
          :error="data.title.errorMessage"
          :help="data.title.value ? '/' + getSlug(data.title.value) : ''"
          :isBound="isBound"
          :maxlength="100"
        ></form-input>
      </div>
      <div class="mb-3">
        <form-input
          name="image"
          label="Обложка записи"
          type="file"
          v-model="data.image.value"
          clearButton
          :error="data.image.errorMessage"
          :isBound="isBound"
          @change="handleFileChange"
        />
      </div>
      <markdown-editor
        name="content"
        ref="mdeRef"
        label="Текст"
        :options="editorOptions"
      />
      <button
        class="btn btn-primary"
        type="submit"
        @click.prevent="createPostWrapper"
      >
        Добавить
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";

import { FormInput, MarkdownEditor } from "@/components";
import { APICreatePost, createPost } from "@/api/services/blog";

import { getSlug } from "@/utils/strings";
import { BlogMDEOptions as editorOptions } from "@/utils/mde";
import {
  FormBuilder,
  FormFile,
  handleBackendError,
  handleFilesEvent,
  validateForm,
} from "@/utils/forms";
import { useStore } from "@/store";

import { useRouter } from "vue-router";
import { AxiosError } from "axios";

const mdeRef = ref<typeof MarkdownEditor | undefined>(undefined);
const isBound = ref(false);
const image = ref<FormFile | null>(null);

const store = useStore();
const user = computed(() => store.state.auth.user);

const router = useRouter();

const data = reactive<FormBuilder>({
  title: {
    value: "",
    validators: ["required"],
  },
  image: {
    value: "",
    validators: [],
  },
});

const handleFileChange = (e: InputEvent) => {
  console.log(e);
  const files = handleFilesEvent(e);
  if (files.length) image.value = files[0];
};

const createPostWrapper = () => {
  const verdict = validateForm(data);
  if (!isBound.value) isBound.value = true;
  if (!verdict || image.value === undefined || user.value === null) return;

  const slug = getSlug(data.title.value);
  const content = mdeRef.value?.getValue ? mdeRef.value.getValue() : "";

  const newPost: APICreatePost = {
    title: data.title.value,
    content: content,
    author: String(user.value.id),
    slug: slug,
  };

  if (image.value) newPost.image = image.value.file;

  const fd = new FormData();
  fd.append("title", newPost.title);
  fd.append("content", newPost.content);
  fd.append("slug", newPost.slug);
  fd.append("author", newPost.author);

  if (newPost.image) fd.append("image", newPost.image);

  createPost(fd)
    .then(() => {
      mdeRef.value && mdeRef.value.clearAutosavedValue();
      router.push("/blog");
    })
    .catch((e: AxiosError) => {
      handleBackendError(e, {
        "400": {
          slug: () => {
            data.title.errorMessage = "Запись с таким именем уже существует";
          },
        },
      });
    });
};
</script>

<style></style>
