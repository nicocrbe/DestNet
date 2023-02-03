import axios from 'axios'
import React, {useState, useEffect} from 'react'
import "./conversation.css"

const Conversation = ({conversation, currentUser}) => {
  const  [user, setUser] = useState(null)
  
  useEffect(() => {
      const friendId = conversation.members.find((member)=> member !== currentUser.id)
      const getUser = async() => {
          try {
            const response = await axios.get(`http://localhost:3001/users/${friendId}`)
            setUser(response.data)
          } catch (error) {
            console.error(error)
          }
      }
      getUser()
  }, [currentUser,conversation])

  return (
    <div className='conversation'>
      <img className='conversationImg' src="../../../public/logo192.png" alt=""/>
      <span className='conversationName'>{user?.name}</span>
      </div>
  )
}

export default Conversation