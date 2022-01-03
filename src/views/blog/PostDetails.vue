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

      <div class="my-3">
        <button class="btn btn-outline-danger me-2" @click="showConfirmDialog">
          <i class="bi-trash me-2"></i>Удалить
        </button>
        <button class="btn btn-outline-primary">
          <i class="bi-pen me-2"></i>Изменить
        </button>
      </div>

      <div class="text-center mb-3">
        <h1>{{ post?.title }}</h1>
      </div>
      <div v-html="post?.content"></div>

      <confirm-dialog
        title="Подтверждение удаления"
        content="Вы уверены, что хотите удалить эту запись?"
        :callback="deletePost"
        ref="confirmDialog"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import APIService from "@/api";
import { APIPost } from "@/api/types";
import { getMarked } from "@/utils/marked";
import { useConfirmDialog } from "@/utils/dialog";
import { ConfirmDialog } from "@/components";

export default defineComponent({
  components: { ConfirmDialog },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const post = ref<APIPost | null>(null);
    const postDoesNotExist = ref(false);

    const { showConfirmDialog, confirmDialog } = useConfirmDialog();

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

    const deletePost = () => {
      if (!post.value) return;
      APIService.blog
        .delete(post.value.slug)
        .then(() => {
          router.push("/blog");
        })
        .catch(() => {
          postDoesNotExist.value = true;
        });
    };

    onMounted(() => {
      getPost();
    });

    return {
      post,
      postDoesNotExist,
      deletePost,
      showConfirmDialog,
      confirmDialog,
    };
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
