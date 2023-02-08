import axios from "axios";

const API = axios.create({baseURL: "http://localhost:3001"})

export const userConversations = (id) => {
    API.get(`/conversations/${id}`)
}

export const getUser = (userId) => {
    API.get(`/users/${userId}`)
}

export const getMessages = (conversationId) => {
    API.get(`/messages/${conversationId}`)
}

export const addMessage = (message) => {
    API.post("/messages", message)
}