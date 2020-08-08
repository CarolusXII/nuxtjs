<template>
  <v-container fluid grid-list fill-height>
    <v-row justify="center">
      <v-col xs="12" sm="8" md="4" lg="3" xl="3">
        <auth @change-login="login"></auth>
      </v-col>

      <v-snackbar
        :color="notification.success ? 'success' : 'error'"
        bottom
        timeout="3000"
        v-model="notification.model"
      >
        {{ notification.text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            dark
            text
            v-bind="attrs"
            @click="notification.model = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>

</template>

<script>

    import Auth from '../components/auth.vue'
    import {router} from "../router/router";

    export default {
        components: {
            Auth
        },
        data() {
            return {
                notification: {
                    text: '',
                    model: false
                }
            }
        },
        methods: {
            async init() {
                if (this.$store.getters['users/checkAuthUser']) {
                    this.notification.text = 'Вы уже авторизованы';
                    this.notification.success = 'success';
                    this.notification.model = true;
                    this.$router.push({name: 'user_info'});
                }
            },
            login(check_auth) {
                this.notification.success = check_auth.success;
                this.notification.text = check_auth.notification_text;
                this.notification.model = true;
                if (this.notification.success) this.$router.push('user_info');
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
