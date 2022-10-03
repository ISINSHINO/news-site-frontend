<template>
  <div 
    data-app 
    class="text-center ma-2"
  >
    <v-snackbar
      centered
      tile
      v-model="isSnackbarVisible"
    >
      {{ errorMessage }}

      <template 
        v-slot:action="{ attrs }"
      >
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="closeSnack"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { MAIN_PAGE_ROUTE, SNACKBAR_LIFETIME } from '@/constants';

export default{
  data: () => ({
      isSnackbarVisible: false,
      
  }),
  snackTimeoutID: null,
  props: {
      errorMessage: {
          type: String,
          required: true
      }
  },
  methods: {
      snackAppear() {
          this.isSnackbarVisible = true;
          this.$options.snackTimeoutID = setTimeout(() => {
              this.closeSnack();
          }, SNACKBAR_LIFETIME)
      },
      async closeSnack() {
          this.isSnackbarVisible = false
          await this.$store.dispatch('resetState')
          if (this.$router.currentRoute.path !== MAIN_PAGE_ROUTE) {
            this.$router.push(MAIN_PAGE_ROUTE);
          }
      }
  },
  mounted() {
      this.snackAppear()
  },
  beforeDestroy() {
      clearTimeout(this.$options.snackTimeoutID);
  }
}    
</script>