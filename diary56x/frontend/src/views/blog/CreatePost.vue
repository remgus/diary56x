<template>
  <div class="container my-5">
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
    <form novalidate>
      <div class="mb-3">
        <form-input
          name="author"
          label="Автор"
          v-model="data.author.value"
          :error="data.author.errorMessage"
          :isBound="isBound"
          :maxlength="50"
        ></form-input>
      </div>
      <div class="mb-3">
        <form-input
          name="title"
          label="Заголовок"
          v-model="data.title.value"
          :error="data.title.errorMessage"
          :help="data.title.value ? getSlug(data.title.value) : ''"
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
      <label for="content-textarea" class="form-label">Текст</label>
      <textarea
        name="content"
        id="content-textarea"
        cols="30"
        rows="10"
        ref="mdeRef"
      >
      </textarea>
      <button class="btn btn-primary" type="submit" @click.prevent="createPost">
        Добавить
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import EasyMDE from "easymde";
import { FormBuilder, validateForm } from "@/utils/forms";
import { FormInput } from "@/components";
import slugify from "slugify";
import { MDEOptions } from "@/utils/mde";
import { APICreatePost } from "@/api/types";
import APIService from "@/api";
import router from "@/router";

export default defineComponent({
  setup() {
    const mdeRef = ref<HTMLElement | undefined>(undefined);
    const easyMDE = ref<EasyMDE | undefined>(undefined);
    const data = ref<FormBuilder>({
      title: {
        value: "",
        validators: ["required"],
      },
      author: {
        value: "",
        validators: ["required"],
      },
      image: {
        value: "",
        validators: [],
      },
    });
    const isBound = ref(false);

    const getSlug = (s: string) => {
      return (
        "/" +
        slugify(s, {
          replacement: "-",
          strict: true,
        })
      );
    };

    const createPost = () => {
      const verdict = validateForm(data.value);

      const content = easyMDE.value ? easyMDE.value.value() : "";

      if (!isBound.value) {
        isBound.value = true;
      }

      if (!verdict) {
        console.log(data.value);
        return;
      }

      // In case all data is valid

      const slug = slugify(data.value.title.value, {
        replacement: "-",
        strict: true,
      });

      const image = data.value.image.value ? data.value.image.value : null;

      const newPost: APICreatePost = {
        title: data.value.title.value,
        content: content,
        author: data.value.author.value,
        slug: slug,
      };

      if (image) {
        newPost.image = image;
      }

      APIService.blog.create(newPost);

      easyMDE.value?.clearAutosavedValue();

      router.push("/blog");
    };

    onMounted(() => {
      if (mdeRef.value)
        easyMDE.value = new EasyMDE({
          element: mdeRef.value,
          ...MDEOptions,
        });
    });

    return {
      mdeRef,
      data,
      getSlug,
      isBound,
      createPost,
    };
  },
  components: {
    FormInput,
  },
});
</script>

<style>
@import "~easymde/dist/easymde.min.css";
</style>
