import axios from 'axios'

import { ACCESS_TOKEN } from '@/constants'

const API = axios.create({
    baseURL: process.env.VUE_APP_API_ROOT_URL,
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
})

export const getPosts = async () => {
    return await API.get('/posts/');
}

export const getUserWithPosts = async (payload) => {
    return await API.get(`/users/${payload}/`)
}

export const login = async (user) => {
    return await API.post('/login/', {
        email: user.email,
        password: user.password,
    })
}

export const getLoggedUserData = async () => {
    return await API.get('/users/me/')
}

export const register = async (user) => {
    return await API.post('/users/', {
        email: user.email,
        username: user.username,
        password: user.password,
    })
}

export const verifyToken = async () => {
    return await API.post('/token/verify/', {
        token: localStorage.getItem(ACCESS_TOKEN)
    })
}

export const addPost = async (post) => {
    return await API.post('/posts/', post)
}

export const editUser = async (payload) => {
    return await API.patch(`/users/${payload.userID}/`, payload.userFormData,)
}

export const sendCode = async (payload) => {
    return await API.post('/google/connect/', {
        "code": payload
    })
}