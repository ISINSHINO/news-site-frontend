<template>
  <v-card 
    data-app
  >
      <v-dialog
          v-model="isDialogOpen" 
          v-if="dialogType === 'login'"
          max-width="600px"
          persistent
      >
      <v-card>
        <v-form
            lazy-validation
            data-netlify="true"
            netlify-honeypot="bot-field"
            method="POST"
            ref="loginForm"
        >
          <v-card-title>
            <span 
              class="text-h5"
            >Login</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col 
                  cols="12"
                >
                  <v-text-field
                      label="Email*"
                      v-model="email"
                      required
                      :rules="emailRules"
                  ></v-text-field>
                </v-col>
                <v-col 
                  cols="12"
                >
                  <v-text-field
                    label="Password*"
                    v-model="password"
                    type="password"
                    required
                    :rules="passwordRules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="hideDialog"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="tryLogin"
            >
              Continue
            </v-btn>
            <a :href="googleURL">
              google
            </a>
          </v-card-actions>
        </v-form>
    </v-card>
      </v-dialog>
  </v-card>
</template>

<script>
import { MAIN_PAGE_ROUTE } from '@/constants';

export default {
  data: () => ({
      isDialogOpen: false,
      email: '',
      password: '',
      emailRules: [
        value => !!value || 'E-mail is required',
      ],
      passwordRules: [
        value => !!value || 'Password is required',
      ],
  }),
  props: {
      hasDialogVisibilityChanged: {
        type: Boolean,
        default: false
      },
      dialogType: {
        type: String,
      }
  },
  computed: {
    googleURL() {
      const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
      const scope = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ].join(' ');
      const params = {
        response_type: 'code',
        client_id: "371672465150-jkp80f2cuolsejvbt1g0h2721cen0eps.apps.googleusercontent.com",
        redirect_uri: "http://localhost:8080/accounts/google/login/callback/",
        prompt: 'select_account',
        access_type: 'offline',
        scope
      };
      const urlParams = new URLSearchParams(params).toString();

      return `${googleAuthUrl}?${urlParams}`
    }
  },
  methods: {
      hideDialog() {
        this.$emit('closeDialog', false);
        this.email = '';
        this.password = '';
      },
      async userLogin() {
        const user = {
          email: this.email,
          password: this.password
        }
        await this.$store.dispatch('userLogin', user)
        this.hideDialog()

        if (this.$router.currentRoute.path !== MAIN_PAGE_ROUTE) {
          this.$router.push(MAIN_PAGE_ROUTE)
        }
      },
      tryLogin () {
        if (this.$refs.loginForm.validate()) {
          this.userLogin()
        }
      },
  },
  watch: {
    hasDialogVisibilityChanged(newValue) {
        this.isDialogOpen = newValue
      }
  }
}
</script>