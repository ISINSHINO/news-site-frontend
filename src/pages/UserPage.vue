<template>
    <div>
        <EditModal 
            @closeDialog="closeDialog" 
            :hasDialogVisibilityChanged="isDialogOpen"
            :dialogType="dialogType"
            :userID="userID" 
        />
        <AddPostModal 
            @closeDialog="closeDialog" 
            :hasDialogVisibilityChanged="isDialogOpen"
            :dialogType="dialogType" 
            :userID="userID"
        />
        <ProfileInfo
            v-if="!isLoading && !serverError"
            :visitedUser="visitedUser"
            :loggedUser="loggedUser"
            @openDialog="openDialog"
            @dialogType="changeDialogType"
        />
        <LoadingSpinner 
            v-if="isLoading" 
        />
        <SnackBar 
            v-else-if="!isLoading && serverError" 
            :errorMessage="serverError"
        />
        <PostsList
            v-else 
            :posts="userPosts"
        />
    </div>
</template>

<script>
import PostsList from '@/components/PostsList';
import SnackBar from '@/components/modals/SnackBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProfileInfo from '@/components/ProfileInfo';
import EditModal from '@/components/modals/EditModal';
import AddPostModal from '@/components/modals/AddPostModal';

export default {
    components: { PostsList, LoadingSpinner, SnackBar, ProfileInfo, EditModal, AddPostModal },

    data: () => ({
        isDialogOpen: false,
        dialogType: null,
        userID: '',
    }),

    async mounted() {
        this.userID = this.$route.params.id
        await this.$store.dispatch('fetchUserWithPosts', this.userID);
    },

    computed: {
        userPosts() {
            return this.$store.getters.getUserPosts;
        },
        isLoading() {
            return this.$store.getters.getIsLoading;
        },
        serverError() {
            return this.$store.getters.getError;
        },
        visitedUser() {
            return this.$store.getters.getVisitedUser;
        },
        loggedUser() {
            return this.$store.getters.getUser
        }
    },

    methods: {
        closeDialog() {
            this.isDialogOpen = false
            this.dialogType = null
        },
        openDialog() {
            this.isDialogOpen = true;
        },
        changeDialogType(type) {
            this.dialogType = type
            this.openDialog()
        }
    }
}
</script>

<style scoped>
</style>