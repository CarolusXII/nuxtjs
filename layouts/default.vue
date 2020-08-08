<template>
  <v-app>
    <nuxt></nuxt>
  </v-app>
</template>

<script>

  export default {
      async created() {
          await this.$store.dispatch('users/checkAuthUserInLS');
          console.log(this.$store.state.users.auth_user);
      }
  }

</script>
