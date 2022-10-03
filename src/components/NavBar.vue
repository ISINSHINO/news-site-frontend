<template>
    <div>
        <HeaderMain 
            @dialogType="changeDialogType"
        />
        <LoginModal 
            @closeDialog="closeDialog" 
            :dialogType="dialogType" 
            :hasDialogVisibilityChanged="isDialogOpen"
        />
        <RegisterModal 
            @closeDialog="closeDialog" 
            :dialogType="dialogType" 
            :hasDialogVisibilityChanged="isDialogOpen"
        />
    </div>
</template>


<script>
import HeaderMain from '@/components/HeaderMain';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';

export default {
    components: { HeaderMain, RegisterModal, LoginModal},

    data: () => ({
      isDialogOpen: false,
      dialogType: null
    }),

    methods: {
        closeDialog(isDialogOpen) {
            this.isDialogOpen = isDialogOpen
            this.dialogType = null
        },
        openDialog() {
            this.isDialogOpen = true;
        },
        changeDialogType(type) {
            this.dialogType = type
            this.openDialog()
        }
    },
    
    async mounted () { 
        this.$store.dispatch('lookupLocalStorage')
    },
}
</script>

<style scoped>
</style>