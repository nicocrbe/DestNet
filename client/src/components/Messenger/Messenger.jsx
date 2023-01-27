import React, {useState, useEffect} from 'react'
import axios from "axios"
import ChatOnline from '../ChatOnline/ChatOnline'
import Conversation from '../Conversations/Conversation'
import Message from '../Message/Message'
import NavBar from '../NavBar/NavBar'
import "./messenger.css"

const Messenger = () => {

  const user = JSON.parse(localStorage.getItem("profile")?.result)
  const [conversations,setConversations] = useState([])

  const getConversations = async() => {
    try{
      const res = axios.get(`/conversations/${user?.id}`)
      console.log(res)
    }catch(error){
      console.error(error)
    }
  }

  useEffect(()=> {
    const res = getConversations()
    setConversations(res.data)
  }, [user])

  return (
    <>
      <NavBar />
      <div className='messenger'>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input placeholder='Search for friends'  className='chatMenuInput'/>
              {conversations.map((c) => (
                <Conversation conversation={c} currentUser={user}/>
              ))}
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBotWrapper">
              <div className="chatBoxTop">
                <Message />
                <Message />
                <Message />
              </div>
              <div className="chatBoxBottom">
                  <textarea className='chatMessageInput' placeholder='Write something'></textarea>
                  <button className='chatSubmitButton'>Send</button>
              </div>
            </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
              <ChatOnline />
            </div>
        </div>
      </div>
    </>
    
  )
}

export default Messenger