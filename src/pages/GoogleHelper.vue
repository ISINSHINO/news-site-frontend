<template>
  <v-container>
    <LoadingSpinner/>
  </v-container>
</template>

<script>
import {MAIN_PAGE_ROUTE} from "@/constants";
import LoadingSpinner from "@/components/LoadingSpinner";

export default {
  components: {LoadingSpinner},
  mounted() {
    this.$store.dispatch('proceedGoogleAuth', this.$route.query.code)
    this.$router.push(MAIN_PAGE_ROUTE)
  },
}
</script>

<style scoped>

</style>