<template>
  <v-container 
    class="profile"
  >
      <v-col>
          <v-row 
            class="profile__avatar"
          >
            <v-avatar
              size="250"
            >
              <v-img
                :src=visitedUser.profile_image 
              />
            </v-avatar>
          </v-row>
        </v-col>
      <v-col 
        class="profile__information"
      >
        <v-row 
          class="information__email"
        >
          <v-text-field
            filled
            rounded
            dense
            class="shrink"
            :value="visitedUser.email"
            disabled
          ></v-text-field>
        </v-row>
        <v-row 
          class="information__username"
        >
          <v-text-field
            filled
            rounded
            dense
            class="shrink"
            :value="visitedUser.username"
            disabled
          ></v-text-field>
        </v-row>
        <v-row 
          v-if="visitedUser.id === loggedUser.userID"
          class="information__buttons"
        >
          <v-btn
            @click="openEditUserModal"
          >
            Edit profile
          </v-btn>
          <v-btn
            @click="openAddPostModal"
          >
            Add new post
          </v-btn>
        </v-row>
      </v-col>
  </v-container>
</template>

<style scoped>
div.profile {
  margin-top: 20px;
}

div.profile__avatar {
  padding-left: 14px;
  justify-content: center;
}

div.profile__information {
  padding-top: 65px;
  margin-bottom: 40px;
  margin-right: 60px;
}

div.information__email, 
div.information__username,
div.information__buttons {
  justify-content: center;
  column-gap: 50px;
}
</style>

<script>
  export default {
      data: () => ({

      }),

      props: {
        visitedUser: {
            type: Object,
            required: true
        },
        loggedUser: {
            type: Object,
            required: true
        }
      },

      methods: {
        openAddPostModal() {
            this.$emit('dialogType', 'addPost')
        },
        openEditUserModal() {
            this.$emit('dialogType', 'editUser')
        },
      },

      
  }
</script>