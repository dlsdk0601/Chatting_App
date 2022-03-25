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
        methods: ["GET", "POST"],
    },
});

const roomList = (): string[] => {
    const {
        sockets: {
            adapter: { sids, rooms },
        },
    } = io;

    const roomList: string[] = [];
    rooms.forEach((value: any, key: string): void => {
        if (sids.get(key) === undefined) {
            roomList.push(key);
        }
    });

    return roomList;
};

io.on("connection", (socket: any): void => {
    console.log("socket success");
    socket["nickname"] = "someone";

    socket.emit("roomList", roomList());
    socket.on("takeList", (callback: (room: string[]) => void) => {
        const arr = [...roomList()];
        callback(arr);
    });
    socket.on("enterRoom", (roomName: string, nickname: string) => {
        socket["nickname"] = nickname;
        socket.join(roomName);
        socket.emit("roomList", roomList());
    });

    socket.on(
        "sendText",
        (text: string, roomname: string, userName: string, callback: any) => {
            const obj = {
                text,
                sender: userName,
            };
            socket.to(roomname).emit("new_message", obj);
            // socket.emit("new_message", obj);
        }
    );

    socket.on("changeRoom", (name: string): any => {
        socket.join(name);
        console.log("change");
    });
});

server.listen(8080, () => {
    console.log("start");
});
