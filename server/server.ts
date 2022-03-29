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
        const room = Array.from(socket.rooms);
        const isThere = room.some(item => item === roomName);

        if (!isThere) {
            socket["nickname"] = nickname;
            socket.join(roomName);
            socket.emit("onout", roomName);
            socket.to(roomName).emit("welcome", roomName, nickname);
            // socket.emit("roomList", roomList());
        }
    });

    socket.on(
        "sendText",
        (text: string, roomname: string, userName: string) => {
            const obj = {
                text,
                sender: userName,
            };
            socket.to(roomname).emit("new_message", roomname, obj);
        }
    );

    socket.on(
        "leaveRoom",
        (
            roomName: string,
            userName: string,
            callBack: (name: string) => void
        ) => {
            const msg = `${userName}님이 ${roomName}을 나갔습니다.`;
            socket.leave(roomName);
            callBack(roomName);
            socket.to(roomName).emit("goodBye", msg, roomName);
        }
    );
});

server.listen(8080, () => {
    console.log("start");
});
