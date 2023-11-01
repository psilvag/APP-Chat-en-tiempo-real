
  /**
   * Configuramos el servidor http con express
   */ 
 const express= require('express')
 const app=express()
 const server= require('http').createServer(app)
 const {Server}=require('socket.io')
 const io=new Server(server)

 const PORT=3077
 const path=require('path')
 
 /**
  * Evento que se ejecuta cuando se conecta un nuevo usuario al socket
  */
 io.on('connection',(socket)=>{
   console.log('Nuevo usuario conectado');
 })
 app.use(express.static('client'))
  /**
  * le enviamos index.html para renderizarlo
  */
 app.get('/',(req,res)=>{
    res.sendFile(`${path.resolve('client','index.html')}`)
 })
 
 app.listen(PORT,()=>{
    console.log(`Server es running at port: ${PORT}`);
 })
 
