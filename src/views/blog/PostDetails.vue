<template>
  <div class="container mt-4 rt-wp">
    <div v-if="postDoesNotExist" class="text-center mt-5">
      <img
        class="mb-3"
        src="@/assets/icons/not-found.svg"
        alt=""
        id="not-found-icon"
      />
      <h2>Запись не найдена</h2>
      <router-link to="/blog">Перейти к списку записей</router-link>
    </div>
    <div v-else>
      <nav aria-label="breadcrumb" class="mb-3">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/blog">Блог</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $route.params.slug }}
          </li>
        </ol>
      </nav>

      <div class="text-center mb-3">
        <h1>{{ post?.title }}</h1>
      </div>
      <div v-html="post?.content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import APIService from "@/api";
import { APIPost } from "@/api/types";
import { getMarked } from "@/utils/marked";

export default defineComponent({
  setup() {
    const route = useRoute();
    const post = ref<APIPost | null>(null);
    const postDoesNotExist = ref(false);

    const getPost = () => {
      const slug = route.params.slug as string;

      APIService.blog
        .retrieve(slug)
        .then((response) => {
          postDoesNotExist.value = false;
          post.value = response.data;
          post.value.content = getMarked(post.value?.content || "");
        })
        .catch(() => {
          postDoesNotExist.value = true;
        });
    };

    onMounted(() => {
      getPost();
    });

    return { post, postDoesNotExist };
  },
});
</script>

<style>
@import "~highlight.js/styles/nord.css";

#not-found-icon {
  width: 100px;
  height: 100px;
}
</style>
