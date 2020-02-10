<template>
  <b-container id="register">
    <h1 class="text-center">Registarse</h1>
    <p>
      <b-link :to="{ name: 'login'}">
        <center>¿Ya tienes una cuenta?</center>
      </b-link>
    </p>
    <b-container class="bg-light rounded">
      <b-form @submit="onSubmit" @reset="onCancel">
        <b-row>
          <b-col md="6">
            <b-form-group id="nameForm" label="Nombre:" label-for="nombreInput" text="white">
              <b-form-input
                id="nombreInput"
                v-model="registerForm.nombre"
                required
                placeholder="Nombre"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="lastNameForm" label="Apellido:" label-for="apellidoInput">
              <b-form-input
                id="apellidoInput"
                v-model="registerForm.apellido"
                type="text"
                required
                placeholder="Apellido"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="sexForm" label="Sexo:" label-for="sexSelect">
              <b-form-select id="sexSelect" v-model="registerForm.sexo" :options="sex" required></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="emailForm" label="Correo:" label-for="emailInput">
              <b-form-input
                id="emailInput"
                v-model="registerForm.email"
                type="email"
                required
                placeholder="Correo@mail.com"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="passForm" label="Contraseña:" label-for="passInput">
              <b-form-input
                id="passInput"
                v-model="registerForm.passWord"
                type="password"
                required
                placeholder="Contraseña"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="passForm2" label="Repetir Contraseña:" label-for="passInput2">
              <b-form-input
                id="passInput2"
                v-model="registerForm.confirm_assWord"
                type="password"
                required
                placeholder="Reingrese la Contraseña"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="addressForm" label="Dirección:" label-for="addressInput" text="white">
              <b-form-input
                id="addressInput"
                v-model="registerForm.direccion"
                type="text"
                required
                placeholder="CLL 123 #123 A - 123 IN 123 "
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group id="cityForm" label="Ciudad:" label-for="cityInput">
              <b-form-input
                id="cityInput"
                v-model="registerForm.ciudad"
                type="text"
                required
                placeholder="Ciudad "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="departmentForm" label="Departamento:" label-for="departmentInput">
              <b-form-select
                id="departmentInput"
                v-model="registerForm.departamento"
                :options="departments"
                required
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group id="zipForm" label="Codigo Postal:" label-for="zipInput">
              <b-form-input
                id="zipInput"
                v-model="registerForm.zip"
                type="number"
                required
                placeholder="1234"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <br />
        <center>
          <b-button type="reset" variant="danger" class="m-2">Cancelar</b-button>

          <b-button type="submit" variant="primary" class="m-2">Aceptar</b-button>
          <br />
          <br />
          <b-container>
          <b-alert
            v-model="showDismissibleAlert"
            variant="danger"
            dismissible
          >No se pudo crear el usuario, por favor revise los datos</b-alert>
        </b-container>
          <br />
        </center>
      </b-form>
    </b-container>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import router from "@/router/index";

export default {
  name: "formRegister",
  computed: {
    ...mapState(["sex", "departments"])
  },
  data() {
    return {
      errors: {},
      registerForm: {
        nombre: "",
        apellido: "",
        email: "",
        passWord: "",
        confirm_passWord: "",
        sexo: null,
        direccion: "",
        ciudad: "",
        departamento: null,
        zip: null
      },
      usuarios: [],
      
      showDismissibleAlert: false
    };
  },
  methods: {
    ...mapMutations(["register"]),
    onSubmit(evt) {
      evt.preventDefault();
      this.register(this.registerForm).then(res => {
          if (res.status === 201) {
            if (res.data.Success) {
            this.$router.push("/login");
          }
          } else {
            this.showDismissibleAlert = true;
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    onCancel(evt) {
      evt.preventDefault();
      router.back();
    }
  }
};
</script>
