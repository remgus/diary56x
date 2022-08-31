<template>
  <div class="container mt-4 rt-wp">
    <div class="row">
      <div v-if="user && isAdmin(user)" class="col col-12 col-md-auto mb-3 mb-md-0">
        <router-link to="/blog/create/" class="btn btn-outline-primary">
          <i class="bi bi-pencil me-2"></i><span>Добавить</span>
        </router-link>
      </div>

      <form id="search-form" class="mb-4 col w-100" @submit.prevent="refresh">
        <div class="input-group">
          <a
            v-if="searchDone"
            class="btn btn-outline-secondary"
            id="cancel-search-btn"
            ref="searchButton"
            @click.prevent="clearSearch"
          >
            <i class="bi bi-x-lg"></i>
          </a>
          <input
            type="text"
            class="form-control"
            name="search"
            v-model="search"
            id="search-input"
            ref="searchInput"
          />
          <button class="btn btn-outline-primary" id="search-btn" type="submit">
            <i class="bi bi-search" />
          </button>
        </div>
      </form>
    </div>

    <div v-if="posts === null">
      <div class="text-center">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    </div>
    <div v-else-if="!posts.results.length">
      <div class="text-center">
        <img :src="cactus" alt="" class="mb-3" id="cactus-icon" />
      </div>
    </div>
    <div v-else>
      <div class="mb-4">
        <div v-for="(post, index) in posts.results" :key="post.id">
          <card :blogPost="post" :no-margin="index + 1 === posts?.results.length"></card>
        </div>
      </div>

      <pagination
        :paginator="posts"
        :curPage="page"
        centered
        @nextPage="nextPage"
        @prevPage="prevPage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { LocationQueryValue, useRoute } from "vue-router";
import { useStore } from "@/store";

import { Paginator } from "@/api/types";
import Pagination from "@/components/Pagination.vue";
import { isAdmin } from "@/api/services/auth";
import { APIPost, listPosts } from "@/api/services/blog";
import Card from "./Card.vue";
import cactus from "@/assets/icons/cactus.svg";

const store = useStore();
const route = useRoute();
const search = ref<string | null>(null);
const searchDone = ref(false);
const page = ref(1);
const searchInput = ref<HTMLElement | null>(null);
const searchButton = ref<HTMLElement | null>(null);
const posts = ref<null | Paginator<APIPost>>(null);

onMounted(() => {
  search.value = route.query.search as LocationQueryValue;
  const queryPage = Number(route.query.page as LocationQueryValue);
  if (queryPage) page.value = queryPage;
  refresh();
});

const refresh = () => {
  searchInput.value?.blur();
  searchButton.value?.blur();
  posts.value = null;
  listPosts({
    page: page.value,
    search: search.value ? search.value : undefined,
  }).then((data) => {
    posts.value = data.data;
    searchDone.value = Boolean(search.value);
  });
};

const clearSearch = () => {
  search.value = null;
  refresh();
};

const nextPage = () => {
  if (posts.value?.next) page.value++;
  refresh();
};

const prevPage = () => {
  if (posts.value?.previous) page.value--;
  refresh();
};

const user = computed(() => store.state.auth.user);
</script>

<style scoped>
#cactus-icon {
  width: 80px;
  height: 80px;
}
</style>
