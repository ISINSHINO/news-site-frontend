import { getPosts, getUserWithPosts, addPost } from '@/api/api'

export const postsModule = {
    state: {
        namespaced: true,
        posts: [],
        userPosts: [],
        isLoading: false,
        visitedUser: {},
        searchWord: '',
        searchField: '',
        page: 1,
        postsPerPage: 4,
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = payload
        },
        setUserPosts(state, payload) {
            state.userPosts = payload
        },
        setIsLoading(state, payload) {
            state.isLoading = payload;
        },
        setVisitedUser(state, payload) {
            state.visitedUser['username'] = payload.username
            state.visitedUser['email'] = payload.email
            state.visitedUser['id'] = payload.id
            state.visitedUser['profile_image'] = payload.profile_image 
        },
        addUserPost(state, payload) {
            state.userPosts.push(payload)
        },
        setSearchWord(state, payload) {
            state.searchWord = payload
        },
        setSearchField(state, payload) {
            state.searchField = payload
        },
        setPage(state, payload) {
            state.page = payload
        },
    },
    getters: {
        getUserPosts(state) {
            return state.userPosts
        },
        getIsLoading(state) {
            return state.isLoading
        },
        getVisitedUser(state) {
            return state.visitedUser
        },
        getFilteredPosts(state) {
            const fieldToSearch = state.searchField
            let filteredPosts = state.posts

            switch (fieldToSearch) {
                case "user":
                    filteredPosts = state.posts
                        .filter(post =>
                            post.user.username.toLowerCase().includes(state.searchWord.toLowerCase()))
                    break;
                case "title":
                    filteredPosts = state.posts
                        .filter(post =>
                            post.title.toLowerCase().includes(state.searchWord.toLowerCase()))
                    break;
                case "content":
                    filteredPosts = state.posts
                        .filter(post =>
                            post.content.toLowerCase().includes(state.searchWord.toLowerCase()))
                    break;
                case "tags":
                    filteredPosts = state.posts
                        .filter(post =>
                            post.tags
                                .some(tag =>
                                    tag.title.toLowerCase().includes(state.searchWord.toLowerCase())
                                ))
                    break;
                default:
                    filteredPosts = state.posts
                    break;
            }
            return filteredPosts
        },
        getPaginatedPosts(state, getters) {
            return getters.getFilteredPosts.slice(((state.page * state.postsPerPage) - state.postsPerPage), (state.page * state.postsPerPage))
        },
        getSearchWord(state) {
            return state.searchWord;
        },
        getSearchField(state) {
            return state.searchField
        },
        getPage(state) {
            return state.page
        },
        getPostsPerPage(state) {
            return state.postsPerPage
        }
    },
    actions: {
        fetchPosts(context) {
            context.commit('setIsLoading', true);

            getPosts()
                .then((response) => context.commit('setPosts', response.data))
                .catch((error) => context.commit('setError', error.message))
                .finally(() => context.commit('setIsLoading', false))
        },
        fetchUserWithPosts(context, payload) {
            context.commit('setIsLoading', true);
            
            getUserWithPosts(payload)
                .then((response) => {
                    context.commit('setUserPosts', response.data.posts)
                    context.commit('setVisitedUser', response.data)
                })
                .catch((error) => context.commit('setError', error.message))
                .finally(() => context.commit('setIsLoading', false))
        },
        addNewPost(context, payload) {
            context.commit('setIsLoading', true);

            addPost(payload)
                .then((response) => context.commit('addUserPost', response.data))
                .catch((error) => context.commit('setError', error.message))
                .finally(() => context.commit('setIsLoading', false))
        }
    },
}   