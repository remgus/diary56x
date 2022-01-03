<template>
  <div class="card card-body" :class="{ 'mb-3': !noMargin }">
    <router-link :to="'/blog/' + blogPost.slug" class="stretched-link" />
    <li class="row mt-2">
      <div class="col">
        <div>
          <h5 class="mt-0">{{ blogPost.title }}</h5>
        </div>
        <p class="my-0">Автор: {{ author }}</p>
        <p class="text-muted my-0">
          {{ postDate }}
        </p>
      </div>

      <div class="col-auto">
        <div class="w-100">
          <img
            :src="postImage"
            class="align-self-center mr-3 post-image"
            alt=""
            height="70"
            width="70"
          />
        </div>
      </div>
    </li>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { APIPost } from "@/api/types";
import { toShortDateTime } from "@/utils/date";
import { postAuthor } from "@/utils/models/post";

export default defineComponent({
  setup(props) {
    const getImage = () => {
      return props.blogPost.thumbnail
        ? props.blogPost.thumbnail
        : require("@/assets/icons/document.svg");
    };

    const processDate = () => {
      return toShortDateTime(new Date(props.blogPost.date));
    };

    return {
      postImage: computed(() => getImage()),
      postDate: computed(() => processDate()),
      author: computed(() => postAuthor(props.blogPost)),
    };
  },
  props: {
    blogPost: {
      type: Object as PropType<APIPost>,
      required: true,
    },
    noMargin: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style></style>
