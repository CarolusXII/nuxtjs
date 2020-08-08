<template>
  <v-container fluid grid-list-md style="padding-top: 0px;">
    <v-row>
      <v-app-bar
        dense
        color="#fff"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              fab
              small
              elevation="false"
              color="purple"
              @click="logOut()"
              v-on="on"
            >
              <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
          </template>
          <span>Выйти</span>
        </v-tooltip>
        <v-toolbar-title>Информация о пользователе</v-toolbar-title>
      </v-app-bar>
    </v-row>
    <v-row justify="center">
      <v-col xs="12" sm="8" md="6" lg="5">
        <v-card>
          <v-card-title>
            <v-img
              class="user__img"
              height="60"
              width="60"
              max-width="60"
              :src="$store.state.users.auth_user.img"
            ></v-img>
            <span>{{ $store.state.users.auth_user.first_name }} {{ $store.state.users.auth_user.second_name }}</span>
          </v-card-title>
          <v-card-text>

            <v-row>
              <v-col>Полных лет: {{ $store.state.users.auth_user.age }}</v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        validate({store, state}) {
            return store.getters['users/checkAuthUser'];
        },
        methods: {
            logOut() {
                this.$router.push('/');
                this.$store.dispatch('users/logOut');
            },
        }
    }
</script>

<style>
  .user__img {
    border-radius: 50%;
    margin-right: 16px;
  }
</style>
