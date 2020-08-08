<template>
  <v-card>
    <v-container grid-list-md>
      <v-form ref="form" v-model="valid">
        <v-col xs12>Авторизация</v-col>
        <v-col xs="12">
          <v-text-field
            outlined
            label="Логин"
            hide-details
            v-model="user_data.login"
            :rules="[rules.requiredField]"
          ></v-text-field>
        </v-col>
        <v-col xs="12">
          <v-text-field
            outlined
            label="Пароль"
            hide-details
            v-model="user_data.password"
            :rules="[rules.requiredField]"
          ></v-text-field>
        </v-col>
      </v-form>
      <v-col xs="12" class="d-flex row justify-end" style="margin: 0px">
        <v-btn @click="login()">Войти</v-btn>
      </v-col>
    </v-container>
  </v-card>
</template>

<script>

  export default {
      data() {
          return {
              rules: {
                  requiredField: v => !!v || ''
              },
              valid: false,
              user_data: {
                  login: '',
                  password: ''
              }
          }
      },
      methods: {
          async login() {
              if (!this.$refs.form.validate()) return;
              let check_auth = await this.$store.dispatch('users/checkUser', this.user_data);
              this.$emit('change-login', check_auth);
          }
      }
  }
</script>
