<template>
    <div>
        <LoadingSpinner 
            v-if="isLoading" 
        />
        <SnackBar 
            v-else-if="!isLoading && serverError" 
            :errorMessage="serverError"
        />
        <PostsList
            v-else
            :posts="paginatedPosts"
        />
      <PaginationPosts/>
    </div>
</template>

<script>
import PostsList from '@/components/PostsList';
import SnackBar from '@/components/modals/SnackBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import PaginationPosts from "@/components/PaginationPosts";

export default {
    components: {PaginationPosts, PostsList, LoadingSpinner, SnackBar},

    data: () => ({
    }),
    async mounted() {
        await this.$store.dispatch('fetchPosts');
    },
    computed: {
        isLoading() {
            return this.$store.getters.getIsLoading;
        },
        serverError() {
            return this.$store.getters.getError;
        },
        paginatedPosts() {
          return this.$store.getters.getPaginatedPosts;
        },
    },
}
</script>

<style scoped>
</style>