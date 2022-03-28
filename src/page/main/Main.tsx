import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Room from "../room/Room";
import { socket } from "../../socket";
import { useRecoilValue } from "recoil";
import { user } from "../../atom";
import styled, { keyframes } from "styled-components";

export interface IRoomList {
    id: number;
    name: string;
}

const Main = () => {
    const { roomname } = useParams();
    const [roomList, setRoomList] = useState<IRoomList[]>([]);
    const [alert, setAlert] = useState("");
    const userData = useRecoilValue(user);
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

    const alertHandle = (msg: string) => {
        return <AlertBox>{msg}</AlertBox>;
    };

    useEffect(() => {
        socket.on("welcome", (roomName: string, userName: string): void => {
            const msg = `${userName}님이 ${roomName}방에 입장하셨습니다.`;
            console.log(msg);
            setAlert(msg);
        });
    }, []);

    return (
        <>
            {alert !== "" && alertHandle(alert)}
            <Navbar roomList={roomList} setRoomList={setRoomList} />
            {roomList.map(item => {
                return (
                    <Room
                        key={item.id}
                        roomList={roomList}
                        roomname={item.name}
                        isIn={roomname === item.name}
                    />
                );
            })}
            {/* {roomname && <Room roomList={roomList} roomname={roomname} />} */}
        </>
    );
};

const keyFrame = keyframes`
    0%{
        top: -100%;
        opacity: 0; 
    }
    100%{
        top: 5%; 
        opacity: 1;
    }
`;

const AlertBox = styled.span`
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 5%;
    transform: translate(-50%, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    background: #acacac;
    color: white;
    padding: 0 5px;
    border-radius: 10px;
    opacity: 0;
    animation: ${keyFrame} 2s 1s;
`;

export default Main;
