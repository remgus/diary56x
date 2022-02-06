<template>
  <footer class="footer w-100" id="footer">
    <div class="container">
      <div class="row text-center">
        <div class="col-md-3 col-4 text-start text-md-center">
          <router-link to="/" class="text-decoration-none">
            Главная
          </router-link>
        </div>
        <div class="col-md-3 col-4">
          <a href="{% url 'timetable' %}" class="text-decoration-none">
            Расписание
          </a>
        </div>
        <div class="col-md-3 col-4 text-end text-md-center">
          <a href="#" class="text-decoration-none">Дневник</a>
        </div>
        <div class="col-md-3 col-4 text-start text-md-center">
          <a href="{% url 'minimum' %}" class="text-decoration-none">Минимум</a>
        </div>
        <div class="col-md-3 col-4">
          <router-link to="/blog" class="text-decoration-none">
            Новости
          </router-link>
        </div>
        <div class="col-md-3 col-4 text-end text-md-center">
          <a href="{% url 'about' %}" class="text-decoration-none">О проекте</a>
        </div>
        <div class="col-md-3 col-6">
          <a
            href="{% url 'news_post_details' url='help' %}"
            class="text-decoration-none"
            >Помощь</a
          >
        </div>
        <div class="col-md-3 col-6">
          <a href="https://school56.org" class="text-decoration-none"
            >Сайт гимназии</a
          >
        </div>
      </div>
    </div>
    <div id="version-info">Версия: {{ version }}</div>
    <div id="authors-info">AlanTheKnight, {{ year }}</div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseFooter",
  setup() {
    const version = process.env.VUE_APP_VERSION as string;
    const year = new Date().getFullYear();
    return { version, year };
  },
});
</script>

<style scoped>
#footer {
  background-color: #24292e;
}

.footer {
  line-height: 40px;
  position: absolute;
  left: 0;
  bottom: 0;
}

footer.footer a:visited {
  color: white;
}

footer.footer a:hover,
footer.footer a:active,
footer.footer a:focus {
  color: white;
}

footer.footer a {
  color: #ffffff9f;
}

#authors-info {
  background-color: #16191bc9;
  height: 40px;
  text-align: center;
  color: rgba(255, 255, 255, 0.582);
}

#version-info {
  background-color: #16191b88;
  height: 40px;
  text-align: center;
  color: rgba(255, 255, 255, 0.582);
}
</style>
