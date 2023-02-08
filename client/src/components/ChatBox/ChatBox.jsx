import React, {useState,useEffect,useRef} from 'react'
import { getUser } from '../../api/ChatRequest'
import logo from "../../../public/logo192.png"
import { getMessages, addMessage } from '../../api/ChatRequest'
import "./ChatBox.css";
import {format} from "timeago.js"
import InputEmoji from "react-input-emoji"

const ChatBox = ({chat,currentUser,setSendMessage, receiveMessage}) => {

  const [userData, setUserData] = useState(null)
  const [messages,setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const scroll = useRef()
  
  useEffect(() => {
    const userId = chat?.members?.find((id) => id!==currentUser)
    const getUserData = async() => {
      try {
        const {data} = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    if(chat!==null){
      getUserData()
    }

  },[chat,currentUser])

  useEffect(() => {
    if(receiveMessage !== null && receiveMessage?.conversationId === chat?.id){
      setMessages([...messages,receiveMessage])
    }
  }, [receiveMessage])

  useEffect(() => {
    const fetchMessages = async() => {
      try {
        const {data} = await getMessages(chat?.id)
        setMessages(data)
      } catch (error) {
        console.log(error)
      }
    }
    if(chat !== null){
      fetchMessages()
    }
  }, [chat])

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  const handleSend = async(e) => {
    e.preventDefault()
    const message = {
      sender: currentUser,
      text: newMessage,
      conversationId: chat.id
    }

    try {
      const {data} = await addMessage(message)
      setMessages([...messages, data])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }

    const receiverId = chat.members.find((id) => id !== currentUser)
    setSendMessage({...message, receiverId})
  }

  useEffect(()=> {
    scroll.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  return (
    <>
    <div className="ChatBox-container">
      {chat ? (<>
        <div className="chat-header">
          <div className="follower">
            <div>
                <img src={logo} alt="" className='followerImage' style={{width:"50px", height:"50px"}}/>
                <div className="name" style={{fontSize:"0.8rem"}}>
                  <span>{userData?.name}</span>
                </div>
            </div>
          </div>
          <hr style={{width:"85%", border: "0.1px solid #ececec"}}/>
        </div>
        <div className="chat-body">
            {messages.map((message) => (
              <>
                <div ref={scroll} className={message?.sender === currentUser
                   ? "message own" 
                   : "message"}>
                  <span>{message.text}</span>
                  <span>{format(message.createdAt)}</span>
                </div>
              </>
            ))}
        </div>
        <div className="chat-sender">
          <div>+</div>
          <InputEmoji 
            value={newMessage}
            onChange={handleChange}
          />
          <div className="send-button button" onClick={handleSend}>Send</div>
        </div>
      </>) : (
        <span className="chatbox-empty-message">Tap on a chat to start conversation...</span>
      )}
    </div>
    </>
  )
}

export default ChatBox