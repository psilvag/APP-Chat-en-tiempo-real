
import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './components/Chat.js';


const socket=io.connect("http://localhost:5000")

function App() {
  const [userName,setUserName]=useState("")
  const [idChatRoom,setIdChatRoom]=useState("")
  const [showChat,setShowChat]=useState(false)

  const joinRoom=()=>{
    if(userName!=="" && idChatRoom!==""){
      //Enviamos al servidor el id de la sala del chat
      console.log("antes de setear",showChat);
      socket.emit('join_chat_room',idChatRoom)
      setShowChat(!showChat)// seteamos "mostrar el chat" a true, solo si se crea la sala
      console.log("despues de setear",showChat);   
    }
  }

  return (
    
    <div className="App">
    {!showChat ? 
    (
      <div> 
      <h2>Welcome Chat </h2>
       <div>
       <input type="text" 
        placeholder='Enter your name...' 
        onChange={e=>setUserName(e.target.value)}
       />
      <input type="text" 
        placeholder='Enter chat room ID' 
        onChange={e=>setIdChatRoom(e.target.value)}/>
      <button onClick={joinRoom}>Join Chat</button>
     </div>
    </div>
    ) 
    :
    (<Chat socket={socket} userName={userName}idChatRoom={idChatRoom}/>)}

    </div>

     
  )
}

export default App;
