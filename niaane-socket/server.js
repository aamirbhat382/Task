const express = require('express');
const app = express();
const path = require('path');
const Emitter = require('events')
const port = 3380;




// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)






//   Data  
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Server 
const server = app.listen(3380, () => {
    console.log(`Server Started at Port ${port}`)
})


// Socket
const io = require('socket.io')(server, {
    cors: {
      origin: "*"}
    })
io.on('connection', (socket) => {
    // Join
    socket.on('join', (busId) => {
        socket.join(busId)
        console.log('user joined ', busId);
    })

})
io.on('sendData', function (data) {
    io.to(data.id).emit('message', data);
});
// eventEmitter.on('orderUpdated', (data) => {
//     io.to(`order_${data.id}`).emit('orderUpdated', data)
// })
// eventEmitter.on('orderPlaced', (data) => {
//     io.to('adminRoom').emit('orderPlaced', data)
// })