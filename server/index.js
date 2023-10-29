
  /**
   * Configuramos el servidor http con express
   */ 
 const express= require('express')
 const app=express()
 const server= require('http').Server(app)
 const io=require('socket.io')(server)
 const PORT=3077
 const path=require('path')
 
 /**
  * Configuracion del directorio estatico para archivos estaticos, en este ejemplo index.html
  */
 app.use(express.static(path.join(__dirname, 'client')));

 /**
  * Evento que se ejecuta cuando se conecta un nuevo usuario al socket
  */
 io.on('connection',(socket)=>{
    const address=socket.handshake.headers['x-forwarded-for']||socket.handshake.address
    console.log(`Usuario con IP:${address} se conecto`);
    
 })

 
 app.get('/server',(req,res)=>{
    res.status(200).send('SERVER: OK')
 })
 
 app.listen(PORT,()=>{
    console.log(`Server es running at port: ${PORT}`);
 })
 
