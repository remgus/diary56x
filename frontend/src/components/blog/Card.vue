<template>
  <div class="card card-body" :class="{ 'mb-3': !noMargin }">
    <router-link :to="'/blog/' + blogPost.slug" class="stretched-link" />
    <li class="row">
      <div class="col d-flex flex-column">
        <div class="">
          <h5 class="mt-0">{{ blogPost.title }}</h5>
        </div>
        <!-- <div v-if="blogPost.summary">{{ blogPost.summary }}</div> -->
        <div class="mt-auto text-muted">
          {{ author }}<i class="bi bi-dot mx-1"></i>{{ toShortDate(new Date(blogPost.date)) }}
        </div>
      </div>

      <div class="col-auto d-flex align-items-center justify-content-center">
        <div class="w-100">
          <img :src="postImage" class="mr-3 post-image" alt="" height="80" />
        </div>
      </div>
    </li>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";
import { APIPost, postAuthor } from "@/api/services/blog";
import { toShortDate } from "@/utils/date";
import { getImage } from "@/utils/blog";

const props = defineProps({
  blogPost: {
    type: Object as PropType<APIPost>,
    required: true,
  },
  noMargin: {
    type: Boolean,
    default: false,
  },
});

const postImage = computed(() => getImage(props.blogPost, true) as string);
const author = computed(() => postAuthor(props.blogPost));
</script>

<style></style>
