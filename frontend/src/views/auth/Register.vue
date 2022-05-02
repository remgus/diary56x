<template>
  <div class="container rt-wp mt-4">
    <loading :isLoading="loading">
      <div class="row justify-content-sm-center">
        <div class="col col-md-9 col-lg-6">
          <div class="card my-3">
            <div class="card-body" id="auth-form-app">
              <h2 class="card-title text-center">Регистрация</h2>
              <div class="d-flex flex-row align-items-center mb-3">
                <i class="bi bi-exclamation-circle-fill text-danger me-3"></i>
                <div>
                  Пожалуйста, внимательно проверьте предоставленные данные перед
                  завершением регистрации - для их последующего изменения
                  потребуется время
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
                  name="last_name"
                  label="Отчество"
                  v-model="data.last_name.value"
                  :error="data.last_name.errorMessage"
                  :isBound="isBound"
                  :maxlength="100"
                ></form-input>
              </div>
              <div class="mb-3">
                <form-input
                  name="password1"
                  label="Пароль"
                  v-model="data.password1.value"
                  :error="data.password1.errorMessage"
                  :isBound="isBound"
                  :maxlength="100"
                  password
                ></form-input>
              </div>
              <div class="mb-3">
                <form-input
                  name="password2"
                  label="Повторите пароль"
                  v-model="data.password2.value"
                  :error="data.password2.errorMessage"
                  :isBound="isBound"
                  :maxlength="100"
                  password
                ></form-input>
              </div>
              <div class="mb-3">
                <form-select
                  label="Образовательное учреждение"
                  name="school"
                  :options="schools"
                  v-model="data.school.value"
                  placeholder="Выберите образовательное учреждение"
                  :error="data.school.errorMessage"
                  :isBound="isBound"
                />
                <div class="text-muted mt-1" id="school-not-in-list">
                  <router-link to="/"
                    >Что делать, если моего образовательного учреждения нет в
                    списке?</router-link
                  >
                </div>
              </div>

              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-outline-primary"
                  @click.prevent="register"
                >
                  Зарегистрироваться
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </loading>
  </div>
</template>

<script lang="ts">
import { FormBuilder, handleBackendError, validateForm } from "@/utils/forms";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { FormInput, Loading, FormSelect } from "@/components";
import { listSchools } from "@/api/services/schools";
import { SelectOption } from "@/components/forms/FormSelect.vue";
import { CreateStudentData, createStudent } from "@/api/services/auth";
import { useRouter } from "vue-router";
import { AxiosError } from "axios";

export default defineComponent({
  components: {
    FormInput,
    Loading,
    FormSelect,
  },
  setup() {
    const loading = ref(true);
    const schools = ref<SelectOption[]>([]);
    const router = useRouter();

    const data = reactive<FormBuilder>({
      first_name: {
        value: "",
        validators: ["required"],
      },
      surname: {
        value: "",
        validators: ["required"],
      },
      last_name: {
        value: "",
        validators: [],
      },
      email: {
        value: "",
        validators: ["required", "email"],
      },
      password1: {
        value: "",
        validators: ["password1"],
      },
      password2: {
        value: "",
        validators: [],
        checkers: {
          password_match: {
            check: (value: string, state?: FormBuilder) =>
              Boolean(state && value === state.password1.value),
            errorMessage: "Пароли не совпадают",
          },
        },
      },
      school: {
        value: "",
        validators: ["required"],
      },
    });
    const isBound = ref(false);

    onMounted(() => {
      listSchools(true).then((res) => {
        schools.value = res.data.map((school) => {
          return {
            value: String(school.id),
            label: school.name,
          };
        });
        loading.value = false;
      });
    });

    const register = () => {
      console.log(data);

      const verdict = validateForm(data);
      if (!isBound.value) isBound.value = true;
      if (!verdict) return;

      console.log(data);

      const newStudent: CreateStudentData = {
        first_name: data.first_name.value,
        surname: data.surname.value,
        last_name: data.last_name.value,
        email: data.email.value,
        password: data.password1.value,
        school: Number(data.school.value),
      };

      console.log(newStudent);

      createStudent(newStudent)
        .then(() => {
          router.push("/login");
        })
        .catch((e: AxiosError) => {
          handleBackendError(e, {
            "400": {
              email: () => {
                data.email.errorMessage =
                  "Пользователь с таким email уже существует";
              },
            },
          });
        });
    };

    return {
      data,
      isBound,
      loading,
      schools,
      register,
    };
  },
});
</script>

<style scoped>
#school-not-in-list > a {
  text-decoration: none;
  color: var(--bs-text-muted);
}
</style>
