import axios from "axios"

const API = axios.create({baseURL: "http://localhost:3001"})
API.interceptors.request.use((req) => {  //Add headers to request

    const userProfile = JSON.parse(localStorage.getItem("profile"))
    if(userProfile) {
        req.headers.authorization = `Bearer ${userProfile.credential}`
    }
    return req
})

export const fetchPosts = async(page) =>{
    const posts = await API.get(`/posts?page=${page}`)
    return posts.data
}

export const fetchPost = async(id) => {
    const post = await API.get(`/posts/${id}`)
    return post.data
}

export const createPost = async(newPost) => {
    const createdPost = await API.post("/posts",newPost)
    return createdPost.data
}

export const updatePost = async(id,postToUpdate) => {
    const updatedPost = await API.put(`/posts/${id}`, postToUpdate)
    return updatedPost.data
}

export const deletePost = async(id) => {
    const deletedPost = await API.delete(`/posts/${id}`)
    return deletedPost.data
}

export const likePost = async(id) => {
    const likedPost = await API.put(`/posts/${id}/likePost`)
    return likedPost.data
}

export const signIn = async(formData) => {
    const signinUser = await API.post("/users/signin", formData)
    return signinUser.data
}

export const signUp = async(formData) => {
    const signupUser = await API.post("/users/signup", formData)
    return signupUser.data
}

export const fetchPostsBySearch = async(searchQuery) => {
    const result = await API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`)
    return result.data
}

export const comment = async(value,id) => {
    const commentedPost = await API.post(`/posts/${id}/commentPost`, {value})
    return commentedPost.data
}