// import { Socket, Server } from "socket.io";
// import cors from "cors";
// import express from "express";
// import http from "http";


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

const roomList = (): string[] => {
    const { sockets: { adapter: { sids, rooms } } } = io;
    
    const roomList: string[] = [];
    rooms.forEach((value: any, key: string):void => {
        if(sids.get(key) === undefined){
            roomList.push(key)
        }
    });
    console.log("rooms===");
    console.log(rooms);

    return roomList;
}

io.on("connection", (socket: any):void => {
    console.log("socket success")
    socket["nickname"] = "someone";

    socket.on("enterRoom", (roomName: string, nickname: string, callback: (name: string) => void) => {
        socket["nickname"] = nickname;
        socket.join(roomName);
        callback(nickname);

        socket.emit("roomList", roomList())
    });

    

});

server.listen(8080, () => {
    console.log("start");
});