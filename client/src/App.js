
import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './components/Chat.js';
import {v4 as uuid} from 'uuid'

const socket=io.connect("http://localhost:5000")

function App() {
  const [userName,setUserName]=useState("")
  const [idChatRoom,setIdChatRoom]=useState('')
  const [showChat,setShowChat]=useState(false)
  const [showCreate,setShowCreate]=useState(false)
  const [showInputId,setShowInputId]=useState(false)
  const [idUUID,setUUID]=useState('')
  

  const joinRoom=()=>{
    setShowInputId(true)
    setShowCreate(false)
    if(userName!=="" && idChatRoom!==""){
      //Enviamos al servidor el id de la sala del chat
      socket.emit('join_chat_room',idChatRoom)
      setShowChat(!showChat) // seteamos "mostrar el chat" true, solo si se crea la sala
    }
    
  }
  const generateId=()=>{
    setUUID(uuid())
   }

  const createChat=()=>{
    setShowCreate(true)
    setShowInputId(false)
    if(userName!=="" && idUUID!==""){
      setIdChatRoom(idUUID)
      socket.emit('join_chat_room',idUUID)
      setShowChat(!showChat)
   
    }else{
      setIdChatRoom('')
    }
 
  }
  
  return (
<div className="home">
  {
  !showChat ? 
  (
  <div className='home-init'> 
    <h2>Welcome Chat Online</h2>

    <div className='home-name-input'>

      <div className='home-input-name'>
        <p>Enter your name</p>
        <input type="text" 
        placeholder="Enter your name..."
        onChange={e=>setUserName(e.target.value)}
        />
      </div>
      {showCreate?(
        <div className='home-generated'>
        <button onClick={generateId}>Generate ID</button>
        <label htmlFor="">{idUUID}</label>
      </div>
      ):(showInputId?( <div className='home-input-id'>
      <input type="text" 
      placeholder='Enter chat room ID' 
      onChange={e=>setIdChatRoom(e.target.value)}
      />
    </div>):'')}
      <div className='home-buttons'>
      <button onClick={joinRoom}>{showInputId?'Join':'Join Chat'}</button>
      <button  onClick={createChat}>{showCreate?'Create':'Create new Chat'}</button>
      </div>
     
     </div>
    </div>
    ) 
    :
    (
    <Chat socket={socket} userName={userName} idChatRoom={idChatRoom}/>
    )
  }

</div>

     
  )
}

export default App;
