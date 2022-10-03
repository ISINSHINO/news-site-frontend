export const errorModule = {
    state: {
        error: null
    },
    mutations: {
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    getters: {
        getError(state) {
            return state.error
        },
    },
    actions: {
        resetState(context) {
            context.commit("clearError")
        }
    },
} 