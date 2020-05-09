var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var peers = [];
var peerSPDs = [];

app.listen(8001);

function handler(req, res){
    fs.readFile("index.html",
    function(err,data){
        if(err){
            res.writeHead(500);
            return res.end('index.html not found');
        }

        res.writeHead(200,{'Content-type': 'text/html'});
        res.end(data);
    });
}

io.sockets.on('connection',function(socket){
    console.log("Peer connected");

    if(peers.length == 0){
        socket.emit('client_socket','0');
        peers.push(socket);
    }
    else if(peers.length == 1){
        peers.push(socket);
        socket.emit('client_socket',peerSPDs[0]);
    }

    socket.on('server_socket',function(data){
        if(peers.length<3){
            peerSPDs.push(data);
            socket.broadcast.emit('client_socket', data);
        }
    });

    socket.on('server_socket',function(){
        peers = [];
        peerSPDs = [];
        var sockets = io.sockets.clients();
        for (var i = 0 ; i<sockets.length; i++){
            sockets[i].emit('client_socket','reset');
        }
    });
});