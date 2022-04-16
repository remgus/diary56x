<template>
  <div class="rt-wp container">
    <div id="hero">
      <h1 class="font-heavy display-2" id="slogan">
        Электронный Дневник<br /><span class="parallax"
          >Следующего Поколения</span
        >
      </h1>
      <div class="description text-muted mt-4">
        Прогрессивная, удобная и свободная электронная система для школ
      </div>
      <div>
        <div class="btn btn-primary me-3">О проекте</div>
        <div class="btn btn-outline-primary">Начать</div>
      </div>
    </div>
    <div class="row mx-5 gx-5 gy-4">
      <div class="col-12 col-md-4">
        <div class="text-larger mb-2">Прогрессивность</div>
        <div class="text-muted">
          Использование современных инструментов и библиотек помогло создать
          надежную систему с широким функционалом
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="text-larger mb-2">Удобство</div>
        <div class="text-muted">
          Легкий и понятный интерфейс позволяет использовать дневник и взрослым,
          и детям без особых усилий
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="text-larger mb-2">Свобода</div>
        <div class="text-muted">
          Открытость исходного кода и возможность вносить свой вклад позволяют
          развивать проект в правильном направлении
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

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
}

#hero {
  padding: 96px 32px;
  text-align: center;
}

.description {
  font-size: 1.4rem;
  line-height: 1.5;
  margin-bottom: 40px;
}

.text-larger {
  font-size: 1.3rem;
  font-weight: 700;
}
</style>
