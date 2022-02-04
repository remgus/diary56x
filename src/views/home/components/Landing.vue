<template>
  <div class="parallax rt-wp">
    <div class="container" id="parallaxInner">
      <div class="row align-items-center h-100">
        <div class="col-12 text-center text-md-start col-md-6 col-lg-4">
          <h1 class="display-1 font-black">Diary56x</h1>
          <div class="fs-3">
            Электронный дневник, сделанный<br />
            учениками для учеников
          </div>
          <button class="btn btn-outline-light mt-4 btn-lg">Начать</button>
        </div>
        <div class="col-md-6 d-none d-md-flex col-lg-8">
          <img
            src="@/assets/images/circles.png"
            alt=""
            style="width: 100%; height: 100%"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="spacer"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Landing",
});
</script>

<style scoped>
.parallax {
  background-color: #4158d0;
  background-image: linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
  background-attachment: fixed;
  background-size: cover;
  height: 120vh;
  color: white;
}

.spacer {
  aspect-ratio: 10/1;
  transform: translateY(calc((-95vw / 10)));
  background-image: url(~@/assets/images/wave.svg);
  background-repeat: no-repeat;
  background-size: 100%;
  box-sizing: border-box;
}

#parallaxInner {
  height: 100vh;
}
</style>
