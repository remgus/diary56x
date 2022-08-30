<template>
  <footer
    class="footer w-100"
    id="footer"
    :class="{ 'd-none': route.name === 'home' && store.getters.isStudent }"
  >
    <hr />

    <div class="container mb-3 pb-2 px-4 px-md-0">
      <div class="row">
        <div class="col-6 col-md-auto order-1 order-md-0">
          <div class="d-flex flex-row" id="diaryx-info">
            <img
              src="@/assets/icons/logo.svg"
              width="20"
              class="d-inline-block align-center me-2"
              alt=""
            />
            <div class="fw-bold me-2">дневник56</div>
            <div id="version">v{{ version }}</div>
          </div>

          <div>
            Код by
            <a
              class="fw-bold link-dark text-decoration-none"
              href="https://github.com/AlanTheKnight"
              target="_blank"
              >Maxim Gusev</a
            >
          </div>
        </div>
        <div
          class="col-12 col-md-4 gsans mb-4 mb-md-0 ms-md-5 ps-md-5 order-0 order-md-1"
        >
          <div class="row">
            <div class="col-12">
              <router-link to="/blog" class="link-dark">Блог</router-link>
            </div>
            <div class="col-12">
              <router-link to="/about" class="link-dark"
                >О&nbsp;проекте</router-link
              >
            </div>
            <div class="col-12">
              <router-link to="/about" class="link-dark">Справка</router-link>
            </div>
          </div>
        </div>
        <div
          class="col-6 col-md-auto d-flex align-items-start flex-column ms-md-auto ps-md-5 order-1 order-md-2"
        >
          <div class="gsans">Наши соцсети</div>
          <div class="align-items-center d-flex justify-content-end fs-4">
            <a
              href="https://github.com/AlanTheKnight/diary56x"
              class="link-dark me-3"
              target="_blank"
            >
              <img src="@/assets/icons/social/gh.svg" alt="" />
            </a>
            <a
              href="https://vk.com/diary56x"
              class="link-dark me-3"
              target="_blank"
            >
              <img src="@/assets/icons/social/vk.svg" alt="" />
            </a>
            <a href="https://t.me/atk_diaryx" class="link-dark" target="_blank">
              <img src="@/assets/icons/social/tg.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const version = __APP_VERSION__;
const route = useRoute();
const store = useStore();
</script>

<style scoped>
.footer {
  line-height: 40px;
  position: absolute;
  left: 0;
  bottom: 0;
}

@media (max-width: 768px) {
  .mb-10 {
    margin-bottom: 4.5rem;
  }
}

#version {
  white-space: nowrap;
}

#diaryx-info {
  flex-wrap: wrap;
}
</style>
