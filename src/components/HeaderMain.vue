<template>
    <v-container>
        <v-toolbar 
          color="#e9eef1" 
          flat
        >
            <v-select
                :items="items"
                v-model="searchField"
                label="Choose field to search"
                class="select-field shrink"
                hide-details="auto"
            ></v-select>
            <v-text-field
                v-model="searchWord"
                color="white"
                class="shrink"
                size="sm"
                hide-details="auto"
                label="Search"
                append-icon="mdi-magnify"
          ></v-text-field>
          <v-icon
              class="clear-button"
              v-if="searchWord || searchField"
              @click="clearSearchParams"
          >
            mdi-close
          </v-icon>
          <v-spacer></v-spacer>
          <v-toolbar-items 
            v-if="isAuth" 
            class="hidden-xs-only"
          >
            <v-btn 
              text
            >
              <router-link
                :to="`/users/${getUser.userID}`"
              >
                {{ getUser.username }}
              </router-link>
            </v-btn>
            <v-btn 
              @click="userLogout" 
              text
            >Logout</v-btn>
          </v-toolbar-items>
          <v-toolbar-items 
            v-else 
            class="hidden-xs-only"
          >
            <v-btn 
              @click="openLoginDialog" 
              text
            >Sign in</v-btn>
            <v-btn 
              @click="openRegDialog" 
              text
            >Sing up</v-btn>
          </v-toolbar-items>
        </v-toolbar>
    </v-container>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500&display=swap');
.container{
    font-family: 'Roboto Slab', sans-serif;
    font-size: 20px;
}
.select-field{
  margin-right: 30px;
}
.clear-button{
  margin-left: 15px;
}
</style>

<script>
import { MAIN_PAGE_ROUTE } from '@/constants'

export default {
    data: () => ({
      items: [
        {text: 'Author',value: 'user'},
        {text: 'Title',value: 'title'},
        {text: 'Content',value: 'content'},
        {text: 'Tags',value: 'tags'}
      ],
    }),

    methods: {
        openLoginDialog() {
            this.$emit('dialogType', 'login')
        },
        openRegDialog() {
            this.$emit('dialogType', 'reg')
        },
        userLogout() {
            this.$store.dispatch('userLogout')
            
            if (this.$router.currentRoute.path !== MAIN_PAGE_ROUTE) {
              this.$router.push(MAIN_PAGE_ROUTE)
            } 
        },
      clearSearchParams() {
          this.searchWord = ''
          this.searchField = undefined
      }
    },
    computed: {
      isAuth() {
        return this.$store.getters.isAuth;
      },
      getUser() {
        return this.$store.getters.getUser;
      },
      searchWord: {
        get() {
          return this.$store.getters.getSearchWord;
        },
        set(value) {
          this.$store.commit('setSearchWord', value.trim())
        }
      },
      searchField: {
        get() {
          return this.$store.getters.getSearchField;
        },
        set(value) {
          this.$store.commit('setSearchField', value)
        }
      }
    }
}
</script>