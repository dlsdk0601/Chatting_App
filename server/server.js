import { Socket, Server } from "socket.io";
import cors from "cors";

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("socket success")
    socket["nickname"] = "someone";

    socket.on("enterRoom", (roomName, nickname, callback) => {
        socket["nickname"] = nickname;
        socket.join(roomName);
        callback(nickname);
    });

});

server.listen(8080, () => {
    console.log("start");
});