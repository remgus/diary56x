<template>
  <div class="container my-5">
    <div class="row justify-content-sm-center">
      <div class="col col-md-9 col-lg-6">
        <div class="card card-body card-shadow login my-3">
          <h2 class="card-title text-center">Вход</h2>

          <form @submit.prevent="processLogin">
            <div class="form-group mb-3">
              <label for="login" class="form-label">Почта</label>
              <input
                type="text"
                class="form-control"
                id="login"
                v-model="credentials.email"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Пароль</label>
              <div class="input-group" id="show_hide_password">
                <input
                  :type="passwordType"
                  class="form-control"
                  id="password"
                  v-model="credentials.password"
                />
                <span class="input-group-text">
                  <span
                    id="show-hide-btn"
                    class="text-primary"
                    href="#"
                    @click="showHidePassword"
                  >
                    <i
                      :class="{
                        'bi-eye': passwordType === 'text',
                        'bi-eye-slash': passwordType === 'password',
                      }"
                    ></i>
                  </span>
                </span>
              </div>
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
import { AxiosError } from "axios";
import { Options, Vue } from "vue-class-component";

interface Credentials {
  email: string;
  password: string;
}

@Options({})
export default class Login extends Vue {
  credentials: Credentials = {
    email: "",
    password: "",
  };
  passwordType: "password" | "text" = "password";

  showHidePassword(): void {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
  }

  processLogin(): void {
    this.$store
      .dispatch("login", this.credentials)
      .then(() => {
        this.$store.dispatch("me").then(() => {
          this.$router.push("/");
        });
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
      });
  }
}
</script>

<style></style>
