
let express = require('express');
let application = express();
let server = require('http').Server(application);
let GameService = require('./node_src/UNO/UNOGameService.js');
let GameServiceRepository = require('./node_src/GameServiceRepository.js');
let UnitTest = require('./node_src/UnitTest.js');

//Perform unit tests on some required logic
let unitTest = new UnitTest();

application.get('/', function(request, response){
    response.sendFile(__dirname + '/client/index.html');
});
application.use('/client', express.static(__dirname + '/client'));

//server.listen(3000);
server.listen(80);

console.log('============= Server started ===============');

let io = require('socket.io')(server, {});
let gameServiceRepository = new GameServiceRepository();
io.sockets.on('connection', function(socket) {
    console.log('Socket connection');
    socket.on('create', function(room) {

        console.log('Join room: ' + room + ' socketId: ' + socket.id);
        socket.join(room);

        let gameService = gameServiceRepository.findById(room);

        if(!gameService){
            //Create new room
            gameService = gameServiceRepository.insert(new GameService(room));
        }
        socket.use(function(packet){
            gameService.handleAction(socket, packet[0], packet[1]);             
            Object.keys(io.sockets.sockets).forEach(function(id) {
                let data = gameService.getClientResponseData(id);
                if(data){
                    io.to(id).emit('state', data);
                }
            });
        });
    });
});



