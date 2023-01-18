import * as api from "../api"

export const getPosts = () => async(dispatch) => {

    try{
        const data = await api.fetchPosts()
        dispatch({
            type: "FETCH_ALL",
            payload: data
        })
    }catch(error){
        console.error(error)
    }
}

export const createPost = (newPost) => async(dispatch) => {

    try{
        const data = await api.createPost(newPost)
        dispatch({
            type: "CREATE",
            payload: data
        })
    }catch(error){
        console.error(error)
    }
}

export const updatePost = (id,postToUpdate) => async(dispatch) => {
    try {
        const data = await api.updatePost(id,postToUpdate)
        dispatch({
            type: "UPDATE",
            payload: data
        })
    } catch (error) {
        console.error(error)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({
            type: "DELETE",
            payload: id
        })
    } catch (error) {
        console.error(error)      
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const data = await api.likePost(id)
        dispatch({
            type: "LIKE",
            payload: data
        })
    } catch (error) {
        console.error(error)
    }
}