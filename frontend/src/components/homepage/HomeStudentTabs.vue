<template>
  <div class="d-flex flex-row flex-md-column justify-content-center justify-content-md-start">
    <button
      class="nav-link active text-start"
      data-bs-toggle="pill"
      data-bs-target="#timetable-pane"
    >
      <i class="bi-clock me-0 me-md-3"></i><span class="d-none d-md-inline">Расписание</span>
    </button>

    <button class="nav-link text-start" data-bs-toggle="pill" data-bs-target="#homework-pane">
      <i class="bi-book me-0 me-md-3"></i><span class="d-none d-md-inline">Домашнее задание</span>
    </button>

    <!-- <router-link to="/" class="nav-link disabled">
      <i class="bi-journals me-0 me-md-3"></i
      ><span class="d-none d-md-inline">Конспекты</span></router-link
    > -->

    <!-- <router-link to="/" class="nav-link">
      <i class="bi-table me-0 me-md-3"></i>
      <span class="d-none d-md-inline">Оценки</span></router-link
    > -->

    <!-- <a href="#" class="nav-link disabled">
      <i class="bi-people me-0 me-md-3"></i
      ><span class="d-none d-md-inline">Класс</span>
    </a> -->

    <!-- <a href="#" class="nav-link">
      <i class="bi-bar-chart me-0 me-md-3"></i
      ><span class="d-none d-md-inline">Успеваемость</span>
    </a> -->

    <button class="nav-link text-start" data-bs-toggle="pill" data-bs-target="#other-pane">
      <i class="bi-three-dots me-0 me-md-3"></i><span class="d-none d-md-inline">Прочее</span>
    </button>
  </div>
</template>
