var app = require('http').createServer(handler);
var fs = require('fs');
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

const { exec } = require("child_process");

exec("py scripts/test_py.py < input.txt",{timeout: 3000}, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(stdout);
    if (stdout=='5') {
        console.log("Тест пройден");
    } else{
        console.log("Тест не пройден");
    }
});