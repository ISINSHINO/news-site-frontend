<template>
  <div class="text-center">
    <v-pagination
        v-if="numberPages"
        color="rgb(233, 238, 241)"
        v-model="page"
        :length="numberPages"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  computed: {
    page: {
      get() {
        return this.$store.getters.getPage;
      },
      set(value) {
        this.$store.commit('setPage', value)
      }
    },
    numberPages() {
      const amountPosts = this.$store.getters.getFilteredPosts.length
      const postsPerPage = this.$store.getters.getPostsPerPage

      return Math.ceil(amountPosts / postsPerPage)
    }
  }
}
</script>

<style scoped>

</style>