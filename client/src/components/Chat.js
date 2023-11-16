import React, { useEffect, useState } from 'react'
import '../styles/chat.styles.css'


const chat = ({socket, userName,idChatRoom }) => {
// eslint-disable-next-line react-hooks/rules-of-hooks
let [currentMessage, setCurrentMessage]=useState("")
// eslint-disable-next-line react-hooks/rules-of-hooks
const [messageList,setMessageList]=useState([])

 const sendMessage= async ()=>{
    if(currentMessage){
        currentMessage=currentMessage.trim()
        const message={
            idChatRoom,
            userName,
            currentMessage,
            time: new Date(Date.now()).getHours() +":"+new Date(Date.now()).getMinutes()
            
        }
        await socket.emit('message',message)
        setMessageList(list=>[...list,message])
        setCurrentMessage("")
    }
 }

 // eslint-disable-next-line react-hooks/rules-of-hooks
 useEffect(()=>{ // Recibimos el mensaje del servidor
    socket.on('message_server',(data)=>{
        setMessageList(list=>[...list,data])
    })
 },[socket]) // use Effect se ejecuta cada vez que se reciba un mensaje, el socket cambia


  return (
    <div>
        <div className='chat-header'>
          <p>Live Chat</p>
        </div>
        <div className='chat-body'>
            {messageList.map(message=>{
              return( 
              <div>
                {message.currentMessage}
              </div>)
            })}
        </div>
        <div className='chat-footer'>
            <input type="text"
            value={currentMessage} 
            placeholder='Your message'
            onChange={e=>setCurrentMessage(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&& sendMessage()}/>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default chat