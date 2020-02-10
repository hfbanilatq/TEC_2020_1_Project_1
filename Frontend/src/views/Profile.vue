<template>
  <div class="home">
    <center>
      <h1> Página de inicio </h1>
    </center>
    <b-container>
      perfil
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
