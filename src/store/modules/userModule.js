import { ACCESS_TOKEN } from '@/constants'
import { login, register, verifyToken, getLoggedUserData, editUser } from '@/api/api'

export const userModule = {
    state: {
        userID: null,
        username: null,
    },
    mutations: {
        setUserByResponse(state, payload) {
            state.userID = payload['id']
            state.username = payload['username']
        },
        clearUser(state) {
            state.userID = null
            state.username = null
        }
    },
    getters: {
        getUser(state) {
            return {
                username: state.username,
                userID: state.userID,
            }
        },
        isAuth(state) {
            return !!state.userID
        }
    },
    actions: {
        userLogin(context, user) {
            context.commit('setIsLoading', true);

            login(user)
                .then(response => {
                    if (response.data.access) {
                        localStorage.setItem(ACCESS_TOKEN, response.data.access)
                        return getLoggedUserData()
                    }
                })
                .then((response) => context.commit('setUserByResponse', response.data))
                .catch(error => context.commit('setError', error.message))
                .finally(() => context.commit('setIsLoading', false))

            
        },
        userLogout(context) {
            localStorage.removeItem(ACCESS_TOKEN)
            context.commit('clearUser')
        },
        userRegister(context, user) {
            context.commit('setIsLoading', true);

            register(user)
                .catch(error => context.commit('setError', error.message))
                .finally(() => context.commit('setIsLoading', false))
        },
        lookupLocalStorage(context) {
            if (localStorage.getItem(ACCESS_TOKEN)) {
                context.commit('setIsLoading', true);

                verifyToken()
                    .then(() => {
                        return getLoggedUserData()
                    })
                    .then((response) => context.commit('setUserByResponse', response.data))
                    .catch((error) => {
                        if (+error.response.status !== 401) {
                            context.commit('setError', error.message)
                        } else {
                            localStorage.removeItem(ACCESS_TOKEN)
                            context.commit('clearUser')
                        }
                    })
                    .finally(() => context.commit('setIsLoading', false))
            }
        },
        editUserData(context, payload) {
            context.commit('setIsLoading', true);

            editUser(payload)
                .then((response) => {
                    context.commit('setUserByResponse', response.data)
                    context.commit('setVisitedUser', response.data)
                    context.commit('setUserPosts', response.data.posts)
                })
                .catch(error => context.commit('setError', error.message))
                .finally(() => context.commit('setIsLoading', false))
        }
    },
}