import React, {useState, useEffect, useRef} from 'react'
import { userConversations } from '../../api/ChatRequest'
import ChatBox from '../ChatBox/ChatBox'
import Conversation from '../Conversations/Conversation'
import "./Chat.css"
import {io} from "socket.io-client"

const Chat = () => {

    const user = JSON.parse(localStorage.getItem("profile"))
    const userId = user?.result?.sub || user?.result?.id
    const [chats, setChats] = useState([])
    const [currentChat,setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const socket = useRef()
    
    useEffect(() => {
        socket.current = io("http://localhost:8900")
        socket.current.emit("new-user-add", userId)
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users)
            console.log(onlineUsers)
        })
    }, [user])

    useEffect(() => {
        if(sendMessage !== null){
            socket.current.emit("send-message", sendMessage)
        }
    }, [sendMessage])

    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            setReceiveMessage(data)
        })
    },[])

    useEffect(() => {
        const getConversations = async() => {
            try {
                const {data} = await userConversations(userId)
                setChats(data)
                console.log(data)
            } catch (error) {
                console.log(error)               
            }
        }
        getConversations()
    },[user])


    const checkOnlineStatus = (chat)=> {
        const chatMember = chat.members.find((member) => member !== user?.id)
        const online = onlineUsers.find((user)=> user.userId === chatMember)
        return online ? true : false
    }

  return (
    <div className="Chat">
        <div className="Left-side-chat">
            <div className="Chat-container">
                <h2>Chats</h2>
                <div className="Chat-list">{chats?.map((chat) => (
                    <div onClick={() => setCurrentChat(chat)}>
                        <Conversation data={chat} currentUserId={userId} online={checkOnlineStatus(chat)}/>
                    </div>    
                ))}
                </div>
            </div>
        </div>
        <div className="Right-side-chat">
            <div style={{width: "20rem", alignSelf: "flex-end"}}>
                <ChatBox chat={currentChat} currentUser={userId} setSendMessage={setSendMessage} 
                receiveMessage={receiveMessage}/>
            </div>
        </div>
    </div>
  )
}

export default Chat