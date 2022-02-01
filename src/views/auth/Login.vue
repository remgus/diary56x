<template>
  <div class="container mt-4 rt-wp">
    <div class="row justify-content-sm-center">
      <div class="col col-md-9 col-lg-6">
        <div class="card card-body card-shadow login my-3">
          <h2 class="card-title text-center">Вход</h2>

          <form @submit.prevent="processLogin">
            <div class="mb-3">
              <form-input
                type="text"
                name="email"
                label="Почта"
                v-model="credentials.email.value"
                :error="credentials.email.errorMessage"
                :isBound="credentials.email.isBound"
              />
            </div>
            <div class="mb-3">
              <form-input
                :type="passwordType"
                name="password"
                label="Пароль"
                v-model="credentials.password.value"
                password
                :error="credentials.password.errorMessage"
                :isBound="credentials.password.isBound"
              />
            </div>

            <div>
              <button type="submit" class="btn btn-outline-primary w-100">
                Войти
              </button>
            </div>

            <div class="text-center mt-3">
              <div>
                Ещё не зарегистрировались?
                <a href="{% url 'register' %}"> Создайте аккаунт</a>
              </div>
              <div class="mt-2">
                <a href="{% url 'reset_password' %}">Забыли пароль?</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { FormBuilder, validateForm, Validator } from "@/utils/forms";
import { defineComponent, ref } from "@vue/runtime-core";
import { AxiosError } from "axios";
import router from "@/router";
import store from "@/store";
import { FormInput } from "@/components";

interface Credentials {
  email: string;
  password: string;
}

export default defineComponent({
  components: {
    FormInput,
  },
  setup() {
    const authError = ref<AxiosError | null>(null);

    const authChecker: Validator = {
      check: () => {
        console.log(authError.value);
        return authError.value === null;
      },
      errorMessage: "Неверный логин или пароль",
    };

    const credentials = ref<FormBuilder>({
      email: {
        value: "",
        validators: ["required", "email"],
        checkers: {
          authChecker,
        },
        isBound: false,
      },
      password: {
        value: "",
        validators: ["required"],
      },
    });

    const passwordType = ref<"password" | "text">("password");

    const showHidePassword = (): void => {
      passwordType.value =
        passwordType.value === "password" ? "text" : "password";
    };

    const processLogin = (): void => {
      authError.value = null;
      const verdict = validateForm(credentials.value);

      if (!verdict) {
        return;
      }

      const data: Credentials = {
        email: credentials.value.email.value,
        password: credentials.value.password.value,
      };

      store
        .dispatch("login", data)
        .then(() => {
          store.dispatch("me").then(() => {
            store.dispatch("fetchNotifications");
            router.push("/");
          });
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 401) {
            authError.value = error;
            validateForm(credentials.value);
            if (
              authError.value !== null &&
              !credentials.value.password.errorMessage
            ) {
              credentials.value.password.isBound = false;
            }
          }
        });
    };

    return {
      credentials,
      passwordType,
      showHidePassword,
      processLogin,
    };
  },
});
</script>

<style></style>
