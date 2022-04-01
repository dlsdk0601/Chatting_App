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

const {
    sockets: {
        adapter: { sids, rooms },
    },
} = io;

const roomList = (): string[] => {
    const roomList: string[] = [];
    rooms.forEach((value: any, key: string): void => {
        if (sids.get(key) === undefined) {
            roomList.push(key);
        }
    });

    return roomList;
};

const RoomObj = {};

io.on("connection", (socket: any): void => {
    console.log("socket success");
    socket["nickname"] = "someone";

    socket.on("takeList", (callback: (room: any) => void) => {
        const roomArr = Array.from(sids.get(socket.id)).filter(
            item => item !== socket.id
        ); //유저가 들어간 룸 리스트
        const allRoomList: string[] = [...roomList()]; //allRoomList
        //UI에 참여한 방 참여하지 않은 방 표시를 위해
        //두 배열의 차집합을 구한다.

        const enteredRoom = allRoomList.map((room: string, index: number) => {
            return {
                id: index,
                name: room,
                onOut: roomArr.includes(room),
            };
        });
        callback(enteredRoom);
    });
    socket.on("enterRoom", (roomName: string, nickname: string) => {
        const room = Array.from(socket.rooms);
        const isThere = room.some(item => item === roomName);

        if (!isThere) {
            socket["nickname"] = nickname;
            socket.join(roomName);
            socket.emit("onout", roomName);
            socket.to(roomName).emit("welcome", roomName, nickname);
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
