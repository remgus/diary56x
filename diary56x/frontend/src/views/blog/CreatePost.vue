<template>
  <div class="container my-5">
    <h1 class="mb-4">Добавление записи</h1>
    <textarea
      name="content"
      id="content-textarea"
      cols="30"
      rows="10"
      v-model="content"
      ref="content"
    >
    </textarea>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import EasyMDE from "easymde";

export default defineComponent({
  data() {
    return {
      content: "",
      mde: undefined,
    };
  },
  name: "CreatePost",
  mounted() {
    this.mde = new EasyMDE({
      element: this.$refs.content,
    });
  },
});
</script>

<style>
@import "~easymde/dist/easymde.min.css";
</style>
