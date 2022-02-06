<template>
  <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-4 mb-3">
    <div class="card h-100">
      <img :src="getImage(icon)" class="card-img-top icon" :alt="title" />
      <div class="card-body text-center">
        <h5 class="card-title">{{ title }}</h5>
      </div>
      <router-link :to="link" class="stretched-link"> </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "/",
    },
  },
  setup() {
    const getImage = (name: string) => {
      return require("@/assets/icons/" + name + ".svg");
    };

    return {
      getImage,
    };
  },
});
</script>

<style scoped>
.card > a {
  text-decoration: none;
  color: inherit;
}

.card {
  transition-property: box-shadow;
  transition-duration: 0.5s;
}

.card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card img.icon {
  display: block;
  width: 40%;
  margin: 20% auto;
}
</style>
