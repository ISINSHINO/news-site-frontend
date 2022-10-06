import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import("@/pages/MainPage.vue")
    },
    {
        path: '/users/:id',
        component: () => import("@/pages/UserPage.vue")
    },
    {
        path: '/accounts/google/login/callback/',
        component: () => import("@/pages/GoogleHelper.vue")
    }
]

export default new VueRouter({
    mode: "history",
    routes
})