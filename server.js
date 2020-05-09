var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var peers = [];
var peerSPDs = [];
var port = process.env.PORT || 3000;

app.listen(port);

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

io.on('connection',function(socket){
    console.log("Peer connected");

    socket.on("stream", function(stream){
        console.log("steamDataGet");
        console.log(stream);
        socket.broadcast.emit("stream", stream);
    })

   

});