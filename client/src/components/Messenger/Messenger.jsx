import React, {useState, useEffect, useRef} from 'react'
import axios from "axios"
import ChatOnline from '../ChatOnline/ChatOnline'
import Conversation from '../Conversations/Conversation'
import Message from '../Message/Message'
import NavBar from '../NavBar/NavBar'
import "./messenger.css"
import {io} from "socket.io-client"

const Messenger = () => {

  const currentUser = JSON.parse(localStorage.getItem("profile")?.result)
  const [conversations,setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages,setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const socket = useRef()
  const scrollRef = useRef()

  const getConversations = async() => {
    try{
      const res = await axios.get(`/conversations/${currentUser?.id}`)
      console.log(res)
    }catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    socket.current = io("ws://localhost/8900")
    socket.current.on("getMessage", data=> {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  },[])

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages(prev=> [...prev,arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    socket.current.emit("addUser", currentUser?.id)
    socket.current.on("getUsers", users=> {
      setOnlineUsers(users)
    })
  },[currentUser])

  useEffect(()=> {
    const res = getConversations()
    setConversations(res.data)
  }, [currentUser])

  useEffect(() => {
    const getMessages = async() => {
      try {
        const response = await axios.get(`/messages/${currentChat?.id}`)
        setMessages(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMessages()    
  }, [currentChat])


  const handleSubmit = async(e)=> {
    e.preventDefault()
    const message = {
      sender: currentUser?.id,
      text: newMessage,
      conversationId: currentChat?.id
    }
    
    const receiverId = currentChat.members.find(member => member !== currentUser?.id)

    socket.current.emit("sendMessage", {
      senderId: currentUser?.id,
      receiverId,
      text: newMessage
    })

    try {
      const response = await axios.post("/messages", message)
      setMessages([...messages, response.data])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

  return (
    <>
      <NavBar />
      <div className='messenger'>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input placeholder='Search for friends'  className='chatMenuInput'/>
              {conversations.map((c) => (
                <div onClick={()=> setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={currentUser}/>
                </div> 
              ))}
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBotWrapper">
              
              {
                currentChat ?  
              <>
              <div className="chatBoxTop">
                {messages.map(m => (
                  <div ref={scrollRef}>
                      <Message message={m} own={m.senderId === currentUser?.id}/>
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                  <textarea 
                    className='chatMessageInput' 
                    placeholder='Write something'
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}></textarea>
                  <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
              </div> 
              </>
              : <span className='noConversationText'>Open a conversation to start a chat</span>}
            </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
              <ChatOnline 
                onlineUsers={onlineUsers} 
                currentId={currentUser?.id}
                setCurrentChat={setCurrentChat}
                />
            </div>
        </div>
      </div>
    </>
    
  )
}

export default Messenger