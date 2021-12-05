<template>
  <div class="container my-5">
    <div class="row">
      <div
        v-if="user && user.data.is_superuser"
        class="col col-12 col-md-auto mb-3 mb-md-0"
      >
        <router-link to="/blog/create/" class="btn btn-outline-primary">
          <i class="bi bi-pencil me-2"></i><span>Добавить</span>
        </router-link>
      </div>

      <form id="search-form" class="mb-5 col w-100" @submit.prevent="refresh">
        <div class="input-group">
          <a
            v-if="searchDone"
            class="btn btn-outline-secondary"
            id="cancel-search-btn"
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
          />
          <button class="btn btn-outline-primary" id="search-btn" type="submit">
            <i class="bi bi-search" />
          </button>
        </div>
      </form>
    </div>

    <div v-if="posts === undefined">
      <div class="text-center">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    </div>
    <div v-else-if="!posts.results.length">
      <div class="text-center">
        <img
          src="@/assets/icons/cactus.svg"
          alt=""
          class="mb-3"
          id="cactus-icon"
        />
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script lang="ts">
import { Post } from "@/api/models";
import { Paginator } from "@/api/types";
import { defineComponent } from "@vue/runtime-core";
import { LocationQueryValue } from "vue-router";

interface Data {
  posts?: Paginator<Post>;
  search: LocationQueryValue;
  page: number;
  searchDone: boolean;
}

export default defineComponent({
  data() {
    return {
      posts: undefined,
      search: null,
      searchDone: false,
      page: 1,
    } as Data;
  },
  methods: {
    refresh() {
      document.getElementById("search-input")?.blur();
      document.getElementById("search-btn")?.blur();
      this.posts = undefined;
      const start = performance.now();
      this.$api.blog
        .list({
          page: this.page,
          search: this.search ? this.search : undefined,
        })
        .then(async (data) => {
          const t = performance.now() - start;
          if (t < 300) {
            await new Promise((r) => setTimeout(r, 300 - t));
          }
          this.posts = data.data;
          this.searchDone = Boolean(this.search);
        });
    },
    clearSearch() {
      this.search = null;
      this.refresh();
    },
  },
  mounted() {
    this.search = this.$route.query.search as LocationQueryValue;
    const queryPage = Number(this.$route.query.page as LocationQueryValue);
    if (queryPage) this.page = queryPage;
    this.refresh();
  },
  computed: {
    user: (vm) => vm.$store.state.user,
  },
});
</script>

<style scoped>
#cactus-icon {
  width: 80px;
  height: 80px;
}
</style>
