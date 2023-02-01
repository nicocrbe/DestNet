import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "./chatOnline.css"

const ChatOnline = ({onlineUsers,currentId,setCurrentChat}) => {

  const [friends,setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  
  useEffect(()=> {
    const getFriends = async() => {
      const res = await axios.get("/users")
      setFriends(res.data)
    }
    getFriends()
  },[currentId])

  useEffect(() => {
    setOnlineFriends(friends.filter((f)=> onlineUsers.includes(f.id)))
  }, [friends,onlineUsers])

  const handleClick = async(user) => {
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${user?.id}`)
      setCurrentChat(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='chatOnline'>
        {onlineFriends.map((f) => (
          <div className="chatOnlineFriend" onClick={handleClick(f)}>
            <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg" src="../../../public/logo192.png" alt=""/>
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{f?.name}</span>
        </div>
        ))}
    </div>
  )
}

export default ChatOnline