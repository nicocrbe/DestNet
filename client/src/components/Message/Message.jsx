import React from 'react'
import "./message.css"

const Message = ({own}) => {
  
    return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg" src="" alt=""/>
        </div>
        <p className='messageText'>This is a message</p>
        <div className="messageBottom">
            1 hour ago
        </div>
    </div>
  )
}


export default Message