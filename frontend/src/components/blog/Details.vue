<template>
  <div class="container mt-4 rt-wp">
    <div v-if="postDoesNotExist" class="text-center mt-5">
      <img class="mb-3" :src="not_found" alt="" id="not-found-icon" />
      <h2>Запись не найдена</h2>
      <router-link to="/blog">Перейти к списку записей</router-link>
    </div>
    <div v-else>
      <nav aria-label="breadcrumb" class="mb-3">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/blog">Блог</router-link>
          </li>
          <li class="breadcrumb-item active">
            {{ $route.params.slug }}
          </li>
        </ol>
      </nav>

      <div class="row justify-content-center">
        <div class="col-12 col-sm-12 col-md-10 col-lg-8">
          <div class="text-start mb-3" v-if="post">
            <div class="d-flex flex-row align-items-center mb-3 position-relative">
              <div class="me-2">
                <svg v-if="jdenticon" v-html="jdenticon" class="author-avatar"></svg>
              </div>
              <div class="d-flex flex-column">
                <div>{{ postAuthor(post) }}</div>
                <div>{{ toShortDate(new Date(post.date)) }}</div>
              </div>
              <div
                v-if="store.getters.isAdmin"
                class="justify-content-end d-flex position-absolute end-0 align-items-center"
              >
                <button class="btn btn-outline-danger btn-sm me-2" @click="showConfirmDialog">
                  <i class="bi-trash"></i>
                </button>
                <button class="btn btn-outline-dark btn-sm">
                  <i class="bi-pen"></i>
                </button>
              </div>
            </div>
            <h1>{{ post.title }}</h1>
          </div>
          <div v-if="postImage">
            <img class="img-fluid mb-3" :src="postImage" alt="Изображение записи" />
          </div>
          <div v-html="post?.content"></div>
        </div>
      </div>

      <confirm-dialog
        title="Подтверждение удаления"
        content="Вы уверены, что хотите удалить эту запись?"
        :callback="deleteBlogPost"
        ref="confirmDialog"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { APIPost, deletePost, retrievePost, postAuthor } from "@/api/services/blog";
import { getMarked } from "@/utils/marked";
import { useConfirmDialog } from "@/utils/dialog";
import { getImage } from "@/utils/blog";
import { useStore } from "@/store";
import { toShortDate } from "@/utils/date";

import not_found from "@/assets/icons/not-found.svg";
import { toSvg } from "jdenticon";

const jdenticon = ref<null | string>(null);

const route = useRoute();
const router = useRouter();
const post = ref<APIPost | null>(null);
const postDoesNotExist = ref(false);
const store = useStore();

const { showConfirmDialog, confirmDialog } = useConfirmDialog();

const getPost = () => {
  const slug = route.params.slug as string;

  retrievePost(slug)
    .then((response) => {
      postDoesNotExist.value = false;
      post.value = response.data;
      post.value.content = getMarked(post.value?.content || "");
      jdenticon.value = toSvg(post.value.author?.id, 40);
    })
    .catch(() => {
      postDoesNotExist.value = true;
    });
};

const deleteBlogPost = () => {
  if (!post.value) return;
  deletePost(post.value.slug)
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

const postImage = computed(() => (post.value ? getImage(post.value) : null));
</script>

<style>
@import "highlight.js/styles/nord.css";

#not-found-icon {
  width: 100px;
  height: 100px;
}

.author-avatar {
  width: 40px;
  height: 40px;
}
</style>
