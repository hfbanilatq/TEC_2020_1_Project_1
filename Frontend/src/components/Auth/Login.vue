<template>
  <b-container id="LoginForm" class="bg-light">
    <b-container class="bg-light rounded">
      <b-container >
        <b-form @submit="onSubmit">
          <b-row>
            <b-col xs cols='12'>
              <b-form-group id="emailForm" label="Correo:" label-for="emailInput">
                <b-form-input
                  id="emailInput"
                  v-model="email"
                  type="email"
                  required
                  placeholder="Correo@mail.com"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group id="passForm" label="Contraseña:" label-for="passInput">
                <b-form-input
                  id="passInput"
                  v-model="password"
                  type="password"
                  required
                  placeholder="Contraseña"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <center>
            <b-button type="submit" variant="primary" class="m-2">Ingresar</b-button>
          </center>
        </b-form>
        <b-container>
          <b-alert
            v-model="showDismissibleAlert"
            variant="danger"
            dismissible
          >Usuario o contraseña incorrectos</b-alert>
        </b-container>
      </b-container>
    </b-container>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FormLogin",
  data() {
    return {
      email: "",
      password: "",
      showDismissibleAlert: false
    };
  },
  methods: {
    ...mapActions(["login"]),
    onSubmit(evt) {
      evt.preventDefault();
      const user = {
        email: this.email,
        password: this.password
      };
      this.login(user)
        .then(res => {
          if (res.data.Success) {
            this.$router.push("/profile");
          }
        })
        .catch(() => {
          this.showDismissibleAlert = true;
        });
    }
  }
};
</script>
