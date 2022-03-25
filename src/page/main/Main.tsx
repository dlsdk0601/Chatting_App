import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Room from "../room/Room";
import { socket } from "../../socket";

export interface IRoomList {
    id: number;
    name: string;
}

const Main = () => {
    const { roomname } = useParams();
    const [roomList, setRoomList] = useState<IRoomList[]>([]);

    socket.emit("takeList", (room: string[]): void => {
        const arr = [];
        for (let i = 0; i < room.length; i++) {
            const obj = {
                id: i + 1,
                name: room[i],
            };
            arr.push(obj);
        }
        setRoomList([...arr]);
    });

    return (
        <>
            <Navbar roomList={roomList} setRoomList={setRoomList} />
            {roomname && <Room roomname={roomname} />}
        </>
    );
};

export default Main;
