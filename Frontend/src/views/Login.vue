<template>
  <b-container id="register" class= "bg-light">
    <h1 class="text-center">Iniciar Sesion</h1>
      <p>
        <b-link :to="{ name: 'register'}">
          <center>¿No tienes una cuenta?</center>
        </b-link>
      </p>

  <FormLogin />
  </b-container>
</template>
<script>
import FormLogin from '../components/Auth/Login';
export default {
  name: 'formRegister',
  components: {
    FormLogin
  }
};
</script>
