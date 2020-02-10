<template>
  <div class="home">
    <center>
      <h1> Página de inicio </h1>
    </center>
    <b-container>
      Para ver los datos de sus dispositivos registrados por favor inicie sesión,
      Si no tienes una cuenta puedes 
      <router-link :to="{ name: 'register' }">
          Crear un cuenta.
        </router-link>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
};
</script>
