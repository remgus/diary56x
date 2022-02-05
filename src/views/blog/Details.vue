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

      <div v-if="user && isAdmin(user)" class="my-3">
        <button class="btn btn-outline-danger me-2" @click="showConfirmDialog">
          <i class="bi-trash me-2"></i>Удалить
        </button>
        <button class="btn btn-outline-primary">
          <i class="bi-pen me-2"></i>Изменить
        </button>
      </div>

      <div class="container justify-content-center w-75">
        <div class="text-center mb-3">
          <h1>{{ post?.title }}</h1>
        </div>
        <div v-if="postImage">
          <img class="img-fluid" :src="postImage" alt="Изображение записи" />
        </div>
        <div v-html="post?.content"></div>
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

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { APIPost, deletePost, retrievePost } from "@/api/services/blog";
import { getMarked } from "@/utils/marked";
import { useConfirmDialog } from "@/utils/dialog";
import { ConfirmDialog } from "@/components";
import { getImage } from "@/utils/blog";
import { useStore } from "vuex";
import { key } from "@/store";
import { isAdmin } from "@/api/services/auth";

export default defineComponent({
  components: { ConfirmDialog },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const post = ref<APIPost | null>(null);
    const postDoesNotExist = ref(false);
    const store = useStore(key);

    const { showConfirmDialog, confirmDialog } = useConfirmDialog();

    const getPost = () => {
      const slug = route.params.slug as string;

      retrievePost(slug)
        .then((response) => {
          postDoesNotExist.value = false;
          post.value = response.data;
          post.value.content = getMarked(post.value?.content || "");
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

    return {
      post,
      postDoesNotExist,
      deleteBlogPost,
      showConfirmDialog,
      confirmDialog,
      postImage: computed(() => (post.value ? getImage(post.value) : null)),
      user: computed(() => store.state.user),
      isAdmin: isAdmin,
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
