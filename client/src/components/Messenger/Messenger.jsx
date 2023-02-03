import React, {useState, useEffect, useRef} from 'react'
import axios from "axios"
import ChatOnline from '../ChatOnline/ChatOnline'
import Conversation from '../Conversations/Conversation'
import Message from '../Message/Message'
import "./messenger.css"
import {io} from "socket.io-client"

const Messenger = () => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("profile"))?.result)
  const userId = currentUser?.sub || currentUser?.id
  const [conversations,setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages,setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  const socket = io("http://localhost:8900")
  const scrollRef = useRef()
  let onlineUsers = []

  useEffect(() => {
    socket.emit("addUser", userId)
    socket.on("getUsers", users=> {
      users.map(user => {
        onlineUsers.push(user)
      }
      )
    })
    console.log(onlineUsers)
  },[currentUser])

  useEffect(() => {
    socket.on("getMessage", data=> {
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

  

  useEffect(()=> {
    const getConversations = async() => {
      try{
        const res = await axios.get(`http://localhost:3001/conversations/${userId}`)
        setConversations(res.data)
      }catch(error){
        console.error(error)
      }
    }
    getConversations()
  }, [])

  useEffect(() => {
    const getMessages = async() => {
      try {
        const response = await axios.get(`http://localhost:3001/messages/${currentChat?.id}`)
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
      sender: userId,
      text: newMessage,
      conversationId: currentChat?.id
    }
    
    const receiverId = currentChat.members.find(member => member !== userId)

    socket.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage
    })

    try {
      const response = await axios.post("http://localhost:3001/messages", message)
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
      <div className='messenger'>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input placeholder='Search for friends'  className='chatMenuInput'/>
              {conversations?.map((c) => (
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
                      <Message message={m} own={m.senderId === userId}/>
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
                currentId={userId}
                setCurrentChat={setCurrentChat}
                />
            </div>
        </div>
      </div>
    </>
    
  )
}

export default Messenger