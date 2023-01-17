import axios from "axios"

const url = "http://localhost:3001/posts"

export const fetchPosts = async() =>{
    const posts = await axios.get(url)
    return posts.data
}

export const createPost = async(newPost) => {
    const createdPost = await axios.post(url,newPost)
    return createdPost.data
}

export const updatePost = async(id,postToUpdate) => {
    const updatedPost = await axios.patch(`${url}/${id}`, postToUpdate)
    return updatedPost.data
}