<template>
  <div class="container rt-wp mt-4">
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Главная</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Панель администратора
        </li>
      </ol>
    </nav>

    <div class="text-center mb-4">
      <h1 class="heading">Панель администратора</h1>
    </div>
    <div>
      <div class="card card-body mb-3">
        <div
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <img
            src="@/assets/icons/school.svg"
            alt=""
            height="70"
            class="mb-2"
          />
          <!-- <div class="fw-bold">{{ school.name }}</div> -->
        </div>
      </div>

      <div class="row">
        <card icon="person" title="Пользователи" link="/"></card>
        <card icon="people" title="Классы" link="/"></card>
        <card icon="calendar-week" title="Расписание" link="/admin/timetable" />
        <!-- <card icon="newspaper" title="Новости" link="/" /> -->
        <card icon="pie-chart" title="Успеваемость" link="/" />
        <card icon="file-earmark-text" title="Минимумы" link="/" />
      </div>

      <div class="d-flex flex-row mb-3 align-items-center">
        <div class="w-100">
          <hr />
        </div>
        <div class="text-nowrap me-3 ms-1">
          <i class="bi bi-gear mx-2"></i>Расширенные настройки
        </div>
        <div class="w-100">
          <hr />
        </div>
      </div>

      <div class="row">
        <card icon="box" title="Плагины" link="/admin/plugins" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Card from "./Card.vue";
</script>

<style></style>
