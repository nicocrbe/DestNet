import axios from "axios"

const API = axios.create({baseURL: "http://localhost:3001"})
API.interceptors.request.use((req) => {  //Add headers to request

    const userProfile = JSON.parse(localStorage.getItem("profile"))
    if(userProfile) {
        req.headers.authorization = `Bearer ${userProfile.credential}`
    }
    return req
})

export const fetchPosts = async() =>{
    const posts = await API.get("/posts")
    return posts.data
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