const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const PORT = 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server)


const router = require("./router");

app.use(cors());
app.use(router);
app.use(express.json());

io.on('connection', (socket) => {
    console.log("New Connection!")

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);

        callback();
    })

    socket.on('disconnect', () => {
        console.log("Lost Connection!")
    })

});

server.listen(PORT, () => console.log(`The Server is running on http://localhost:${PORT}/`));