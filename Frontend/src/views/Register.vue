<template>
  <div class="bg-light">
    <formRegister ></formRegister>
  </div>
</template>


<script>
import formRegister from '@/components/Auth/Register.vue';

export default {
  name: 'register',
  components: {
    formRegister,
  },
};
</script>
