import React, { useEffect, useState } from 'react'



const chat = ({socket, userName,idChatRoom }) => {
// eslint-disable-next-line react-hooks/rules-of-hooks
let [currentMessage, setCurrentMessage]=useState("")
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
    }
 }

 // eslint-disable-next-line react-hooks/rules-of-hooks
 useEffect(()=>{ // Recibimos el mensaje del servidor
    socket.on('message_server',(data)=>{
        console.log(data);
    })
 },[socket]) // use Effect se ejecuta cada vez que se reciba un mensaje, el socket cambia


  return (
    <div>
        <div className='chat-header'>
          <p>Live Chat</p>
        </div>
        <div className='chat-body'>
            
        </div>
        <div className='chat-footer'>
            <input type="text" 
            placeholder='Your message'
            onChange={e=>setCurrentMessage(e.target.value)}/>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default chat