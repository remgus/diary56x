<template>
  <div class="container my-5 rt-wp">
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
        />
      </div>
      <markdown-editor name="content" label="Текст" :options="editorOptions" />
      <button class="btn btn-primary" type="submit" @click.prevent="createPost">
        Добавить
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import { FormInput, MarkdownEditor } from "@/components";
import { APICreatePost } from "@/api/types";

import { getSlug } from "@/utils/strings";
import { BlogMDEOptions } from "@/utils/mde";
import { FormBuilder, validateForm } from "@/utils/forms";

export default defineComponent({
  setup() {
    const mdeRef = ref<typeof MarkdownEditor | undefined>(undefined);
    const isBound = ref(false);

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

    const createPost = () => {
      const verdict = validateForm(data);

      const content = mdeRef.value?.getValue ? mdeRef.value.getValue() : "";

      const image = data.image.value ? data.image.value : "";

      if (!isBound.value) {
        isBound.value = true;
      }

      if (!verdict) {
        console.log(data.value);
        return;
      }

      // In case all data is valid

      const slug = getSlug(data.title.value);

      const fd = new FormData();

      const newPost: APICreatePost = {
        title: data.title.value,
        content: content,
        author: data.author.value,
        slug: slug,
      };

      fd.append("title", newPost.title);
      fd.append("content", newPost.content);
      fd.append("slug", newPost.slug);

      // APIService.blog
      //   .create(newPost)
      //   .then(() => {
      //     easyMDE.value?.clearAutosavedValue();
      //     router.push("/blog");
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    };

    return {
      mdeRef,
      data,
      getSlug,
      isBound,
      createPost,
      editorOptions: BlogMDEOptions,
    };
  },
  components: {
    FormInput,
    MarkdownEditor,
  },
});
</script>

<style></style>
