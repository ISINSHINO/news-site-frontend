<template>
    <v-card 
      data-app
    >
        <v-dialog
            v-if="dialogType === 'reg'"
            v-model="isDialogOpen" 
            max-width="600px"
            persistent
        >
            <v-card>
              <v-form
                  lazy-validation
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  method="POST"
                  ref="registerForm"
              >
                <v-card-title>
                  <span 
                    class="text-h5"
                  >User Profile</span>
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
                          label="Username*"
                          v-model="username"
                          required
                          :rules="usernameRules"
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
                      @click="tryRegister"
                  >
                    Continue
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import { EMAIL_REGEXP, MAIN_PAGE_ROUTE } from '@/constants';

export default {
    data: () => ({
      isDialogOpen: false,
      username: '',
      email: '',
      password: '',
      usernameRules: [
        value => !!value || 'Name is required',
        value => value.length <= 20 || 'Name must be less than 20 characters',
        value => value.length >= 2 || 'Name must be more than 2 characters'
      ],
      emailRules: [
        value => !!value || 'E-mail is required',
        value => EMAIL_REGEXP.test(value) || 'E-mail must be valid',
      ],
      passwordRules: [
        value => !!value || 'Password is required',
        value => value.length >= 6 || 'Password must be more than 6 characters'
      ]
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
    methods: {
        hideDialog() {
          this.$emit('closeDialog', false);
          this.email = '';
          this.username = '';
          this.password = '';
        },
        async userRegister() {
            const user = {
              email: this.email,
              username: this.username,
              password: this.password
            }
            await this.$store.dispatch('userRegister', user)
            this.hideDialog()
            
            if (this.$router.currentRoute.path !== MAIN_PAGE_ROUTE) {
              this.$router.push(MAIN_PAGE_ROUTE)
            }
        },
        tryRegister () {
          if (this.$refs.registerForm.validate()) {
            this.userRegister()
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