<template>
  <div class="rt-wp container px-4 px-md-0">
    <div id="hero">
      <h1 class="display-2" id="slogan">
        Электронный Дневник<br /><span class="parallax"
          >Следующего Поколения</span
        >
      </h1>
      <div class="description text-muted mt-4">
        Наш сервис сделает вашу школьную жизнь лучше
      </div>
      <div>
        <div class="btn btn-primary me-3">О проекте</div>
        <router-link class="btn btn-outline-primary" to="/register"
          >Начать</router-link
        >
      </div>
    </div>
    <div class="mx-md-5 gx-0 gx-md-5">
      <div class="d-none d-md-flex row align-items-center">
        <div
          v-for="header in headings"
          class="col-12 col-md-4 text-larger mb-2"
        >
          {{ header }}
        </div>
      </div>
      <div class="d-none d-md-flex row">
        <div v-for="desc in descriptions" class="col-12 col-md-4">
          <div class="text-muted" v-html="desc"></div>
        </div>
      </div>
      <div class="d-flex d-md-none row">
        <div v-for="(header, index) in headings">
          <div class="col-12 col-md-4 text-larger mb-2">
            {{ header }}
          </div>
          <div class="col-12 col-md-4 mb-5">
            <div class="text-muted" v-html="descriptions[index]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const headings = [
  "Современность и Безопасность",
  "Доступность и Удобство",
  "Открытость и Свобода",
];

const descriptions = [
  "При разработке мы используем актуальные и надежные технологии - не беспокойтесь о том, что родители или одноклассники увидят ваши оценки без спроса",
  "Легкий, понятный и адаптивный интерфейс делает сервис доступным и взрослым, и детям на любых устройствах",
  'Вы можете внести свой вклад в развитие проекта - предложить в соцсетях свою идею новой фичи или помочь с разработкой - <a class="link-secondary" href="https://github.com/AlanTheKnight/diary56x">исходный код</a> сервиса доступен на GitHub',
];
</script>

<style scoped>
.parallax {
  background: linear-gradient(43deg, #4158d0 0%, #d45fcd 46%, #ffbd43 100%);
  height: 120vh;
  color: white;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  -o-background-clip: text;
  -o-text-fill-color: transparent;
  background-size: 300%;
  animation: animated_text 10s ease-in-out infinite;
  -moz-animation: animated_text 10s ease-in-out infinite;
}

@keyframes animated_text {
  0% {
    background-position: 0px 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0px 50%;
  }
}

#hero {
  padding: 96px 32px;
  text-align: center;
}

.description {
  font-size: 1.4rem;
  line-height: 1.5;
  margin-bottom: 40px;
  font-weight: 400;
  font-family: "Google Sans";
}

.text-larger {
  font-size: 1.3rem;
  font-weight: 700;
}

#slogan {
  font-family: "Google Sans", sans-serif;
  font-weight: 900;
}
</style>
