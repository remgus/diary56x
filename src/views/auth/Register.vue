<template>
  <div class="container rt-wp mt-4">
    <div class="row justify-content-sm-center">
      <div class="col col-md-9 col-lg-6">
        <div class="card my-3">
          <div class="card-body" id="auth-form-app">
            <h2 class="card-title text-center">Регистрация</h2>
            <div class="d-flex flex-row align-items-center mb-3">
              <i class="bi bi-exclamation-circle-fill text-danger me-3"></i>
              <div>
                Регистрируйтесь внимательно, так как для изменения указанных
                данных потребуется время. Настоятельно рекомендуется указывать
                полное ФИО.
              </div>
            </div>
            <div class="mb-3">
              <form-input
                name="email"
                label="Почта"
                v-model="data.email.value"
                :error="data.email.errorMessage"
                :isBound="isBound"
                :maxlength="100"
              ></form-input>
            </div>
            <div class="mb-3">
              <form-input
                name="first_name"
                label="Имя"
                v-model="data.first_name.value"
                :error="data.first_name.errorMessage"
                :isBound="isBound"
                :maxlength="100"
              ></form-input>
            </div>
            <div class="mb-3">
              <form-input
                name="surname"
                label="Фамилия"
                v-model="data.surname.value"
                :error="data.surname.errorMessage"
                :isBound="isBound"
                :maxlength="100"
              ></form-input>
            </div>
            <div class="mb-3">
              <form-input
                name="second_name"
                label="Отчество"
                v-model="data.second_name.value"
                :error="data.second_name.errorMessage"
                :isBound="isBound"
                :maxlength="100"
              ></form-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { FormBuilder } from "@/utils/forms";
import { defineComponent, reactive, ref } from "vue";
import { FormInput } from "@/components";

export default defineComponent({
  components: {
    FormInput,
  },
  setup() {
    const data = reactive<FormBuilder>({
      first_name: {
        value: "",
        validators: ["required"],
      },
      surname: {
        value: "",
        validators: ["required"],
      },
      second_name: {
        value: "",
        validators: [],
      },
      email: {
        value: "",
        validators: ["required", "email"],
      },
    });

    const isBound = ref(false);

    return {
      data,
      isBound,
    };
  },
});
</script>

<style></style>
