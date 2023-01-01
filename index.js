let express = require('express');
let socket = require('socket.io')
let app = express();

let server = app.listen(4000,()=>{
    console.log('Your application is running on localhost:4000');
})

app.get('/',(res,req)=>{
    req.sendFile(__dirname+'/public/index.html')
})

let io = socket(server);

io.on('connection',(socket)=>{
    // console.log("Connection socket connected"+' '+socket.id);
    socket.on('typing',(name)=>{
        socket.broadcast.emit('typing',name);
    });
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    });
});
