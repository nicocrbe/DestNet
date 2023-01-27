import axios from 'axios'
import React, {useState, useEffect} from 'react'
import "./conversation.css"

const Conversation = ({conversation, currentUser}) => {
  const  [user, setUser] = useState(null)
  
  useEffect(() => {
      const friendId = conversation.members.find((member)=> member !== currentUser.id)
      const getUser = async() => {
          
      }
  }, [])

  return (
    <div className='conversation'>
      <img className='conversationImg' src="" alt=""/>
      <span className='conversationName'>John</span>
      </div>
  )
}

export default Conversation