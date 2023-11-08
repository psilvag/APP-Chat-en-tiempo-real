# Guia para ejecutar el proyecto 
## Chat tiempo real  Socket.io

## Stack utilizado
### Frontend
 * React
 * socket.io-client
### Backend
 * Node
 * Express
 * socket.io
 * cors
 
# Ejecutar en desarrollo 
Clonar el repositorio
```
git clone <directorio>
```
## Backend

1. Instalar dependencias en carpeta server  
```
npm install 
```
2. Archivo .gitignore
- Si en la carpeta no existe el archivo  .gitignore, crearlo a nivel root, y agregar /node_modules

3. Levantar el servidor
```
npm run start
```
4. El servidor se levanta en 
http://localhost:5000/

## Frontend

1. Instalar dependencias en carpeta client
```
npm install
```
2. Correr frontend
```
npm start
```
3. El frontend se levanta en 
http://localhost:3000/

Nota: 
* En el servidor se configura cors para habilitar EL PUERTO de la solicitud del cliente 
* En el Frontend se configura el host para establecer la conexion al servidor 





