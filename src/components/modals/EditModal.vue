<template>
    <v-card 
      data-app
    >
        <v-dialog
            v-if="dialogType === 'editUser'"
            v-model="isDialogOpen" 
            max-width="600px"
            persistent
        >
          <v-card>
            <v-form
                lazy-validation
                data-netlify="true"
                netlify-honeypot="bot-field"
                method="PATCH"
                ref="editUserForm"
            >
              <v-card-title>
                <span 
                  class="text-h5"
                >Edit user</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col 
                      cols="12"
                    >
                      <v-text-field
                          label="Username"
                          v-model="username"
                          :rules="usernameRules"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col 
                      cols="12"
                    >
                      <v-file-input
                        label="Profile image"
                        required
                        prepend-icon="mdi-camera"
                        accept="image/png, image/jpeg, image/bmp"
                        :rules="profileImageRules"
                        v-model="profile_image"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
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
                  @click="tryEditUser"
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
export default {
  data: () => ({
    isDialogOpen: false,
    username: '',
    profile_image: null,
    usernameRules: [
        value => !!value || 'Name is required',
        value => value.length <= 20 || 'Name must be less than 20 characters',
        value => value.length >= 2 || 'Name must be more than 2 characters'
    ],
    profileImageRules: [
        value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
    ],
  }),
  props: {
    hasDialogVisibilityChanged: {
        type: Boolean,
        default: false
    },
    dialogType: {
        type: String,
    },
    userID: {
        type: String,
    }
  },
  methods: {
      hideDialog() {
        this.$emit('closeDialog', false);
        this.username = '';
        this.profile_image = null;
      },

      async changeUserData() {

        let userFormData = new FormData()
        userFormData.append('username', this.username)
        
        if (this.profile_image) {
          userFormData.append('profile_image', this.profile_image)
        }

        await this.$store.dispatch('editUserData', {
          userFormData: userFormData,
          userID: this.userID
        });

        this.hideDialog();
    },

    tryEditUser() {
        if (this.$refs.editUserForm.validate()) {
          this.changeUserData()
        }
    }
  },
  watch: {
    hasDialogVisibilityChanged(newValue) {
        this.isDialogOpen = newValue
      }
  }
}
</script>