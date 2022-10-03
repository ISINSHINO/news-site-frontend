<template>
    <v-card 
      data-app
    >
        <v-dialog
            v-if="dialogType === 'addPost'"
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
                ref="addPostForm"
            >
              <v-card-title>
                <span 
                  class="text-h5"
                >Add new post</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col 
                      cols="12"
                    >
                      <v-text-field
                          label="Title"
                          required
                          v-model="title"
                          :rules="titleRules"
                          max-length="30"
                      ></v-text-field>
                    </v-col>
                    <v-col 
                      cols="12"
                    >
                      <v-textarea
                        class="content-textarea"
                        clearable
                        label="Content"
                        required
                        auto-grow
                        v-model="content"
                        :rules="contentRules"
                      ></v-textarea>
                    </v-col>
                    <v-col 
                      cols="12"
                    >
                      <v-text-field
                          label="Tags"
                          required
                          v-model="tags"
                          :rules="tagsRules"
                          hint="Divide you tags by coma: tag1, tag2, tagN..."
                      ></v-text-field>
                    </v-col>
                    <v-col 
                      cols="12"
                    >
                      <v-file-input
                        label="Post picture"
                        required
                        prepend-icon="mdi-camera"
                        accept="image/png, image/jpeg, image/bmp"
                        :rules="pictureRules"
                        v-model="picture"
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
                  @click="tryCreatePost"
                >
                  Continue
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
    </v-card>
  </template>

<style scoped>
</style>

<script>
export default {
  data: () => ({
    isDialogOpen: false,
    title: '',
    content: '',
    tags: '',
    picture: null,
    titleRules: [
        value => !!value || 'Title is required',
        value => value.length <= 30 || 'Max 30 characters'
    ],
    contentRules: [
        value => !!value || 'Content is required',
        value => value.length <= 300 || 'Max 300 characters'
    ],
    tagsRules: [
        value => !!value || 'Tags are required',
    ],
    pictureRules: [
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
        this.title = '';
        this.content = '';
        this.tags = '';
    },
    async createPost() {
        const newPost = {
            user: this.userID,
            title: this.title,
            content: this.content,
            tags: this.tags.trim().split(','),
        }

        if (this.picture) {
          newPost.picture = this.picture
        }

        let postFormData = new FormData()

        for (const key in newPost) {
          postFormData.append(key, newPost[key])
        }
        
        await this.$store.dispatch('addNewPost', postFormData);
        this.hideDialog();
    },
    tryCreatePost() {
        if (this.$refs.addPostForm.validate()) {
          this.createPost()
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