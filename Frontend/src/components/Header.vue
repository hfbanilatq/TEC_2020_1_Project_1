<template>
  <!-- HEADER -->
  <div class="Header">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="dark">

          <b-navbar-toggle target="nav-collapse" right></b-navbar-toggle>
          <b-navbar-brand :to="{ name: 'home' }" exact>
            <i class="fas fa-chess-board"></i>
              Proyecto 1 TET
          </b-navbar-brand>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item :to="{ name: 'home' }">
                <i class="fa fa-home"></i>

                Inicio
              </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
              <b-nav-item :to="{ name: 'sensors' }">
                <i class="fas fa-store"></i>

                Sensores
              </b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item v-if="!isLoggedIn" text="Register" right :to="{ name: 'register'}">
                <i class="fa fa-user-plus"></i>
                Registrarse
              </b-nav-item>
              <b-nav-item text="Login" v-if="!isLoggedIn" right :to="{ name: 'login'}">
                <i class="fa fa-user-o"></i>
                Iniciar Session
              </b-nav-item>
              <b-nav-item text="Perfil" v-if="isLoggedIn" right :to="{ name: 'profile'}">
                <i class="fa fa-user-o"></i>
                Perfil
              </b-nav-item>
              <b-nav-item text="Logout" v-if="isLoggedIn" right :to="{ name: '/'}">
                <i class="fa fa-sign-in-alt"></i>
                Cerrar Session
              </b-nav-item>
            </b-navbar-nav>
            
          </b-collapse>
          
      </b-navbar>
    </header>
  </div>
  <!-- /HEADER -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  props: {
    email: String,
    myAccount: String,
    address: String,
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
};
</script>
