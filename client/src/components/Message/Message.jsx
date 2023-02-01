import React from 'react'
import "./message.css"
import {format} from "timeago.js"

const Message = ({message,own}) => {
  
    return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg" src="" alt=""/>
        </div>
        <p className='messageText'>
            {message.text}
        </p>
        <div className="messageBottom">
            {format(message.createdAt)}
        </div>
    </div>
  )
}


export default Message