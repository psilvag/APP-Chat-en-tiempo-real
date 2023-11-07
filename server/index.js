
const express=require('express')
const app=express()
const http=require('http')
const server=http.createServer(app)
const {Server}= require('socket.io')
const  io= new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:["GET","POST"]

    }
})
const cors=require('cors')


const PORT=5000
io.on('connection',(socket)=>{
    console.log(`New user connected id:${socket.id}`);
    
    //El socket recibe el id de la sala del chat desde el front
    socket.on('join_chat_room',(idRoom)=>{
        socket.join(idRoom)
        console.log(`User whit id ${socket.id} join at chatroomID: ${idRoom}`);

    })
    
    // Recibimos el mensaje del front
    socket.on('message',(data)=>{
         // Reenviamos el mensaje a todos los usuarios conectados en la sala
         socket.to(data.idChatRoom).emit('message_server',data)
    })
   
    
    
    
    
    
    // Evento de desconexion 
    socket.on('disconnect',()=>{
        console.log(`User disconnected, id:',${socket.id}`);
    })

})


app.use(cors())
// Con server.listen funciona pero con app.listen no
server.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})