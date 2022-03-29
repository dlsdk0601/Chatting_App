import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Room from "../room/Room";
import { socket } from "../../socket";
import styled from "styled-components";

export interface IRoomList {
    id: number;
    name: string;
    onOut: boolean;
}

interface IisShow {
    isShow: boolean;
}

const Main = () => {
    const { roomname } = useParams();
    const [roomList, setRoomList] = useState<IRoomList[]>([]);
    const [alert, setAlert] = useState("");
    const [isShow, setIsShow] = useState(false);
    socket.emit("takeList", (room: string[]): void => {
        const arr = [];
        for (let i = 0; i < room.length; i++) {
            const obj = {
                id: i + 1,
                name: room[i],
                onOut: false,
            };
            arr.push(obj);
        }
        setRoomList([...arr]);
    });

    const welcomeMsg = (msg: string) => {
        setIsShow(true);
        setAlert(msg);
        setTimeout(() => {
            setIsShow(false);
        }, 3000);
    };

    useEffect(() => {
        socket.on("welcome", (roomName: string, userName: string): void => {
            const msg = `${userName}님이 ${roomName}방에 입장하셨습니다.`;
            welcomeMsg(msg);
        });
        socket.on("onout", (room: string) => {
            setRoomList((prev: IRoomList[]): IRoomList[] => {
                const newArr = [];
                for (let i = 0; i < prev.length; i++) {
                    if (prev[i].name === room) {
                        const obj = { ...prev[i], onOut: true };
                        newArr.push(obj);
                        continue;
                    }
                    newArr.push(prev[i]);
                }
                console.log("newArr===");
                console.log(newArr);
                return newArr;
            });
        });
    }, []);

    return (
        <>
            <AlertBox isShow={isShow}>{alert}</AlertBox>
            <Navbar
                welcomeMsg={welcomeMsg}
                roomList={roomList}
                setRoomList={setRoomList}
            />
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
        </>
    );
};

const AlertBox = styled.span<IisShow>`
    position: absolute;
    z-index: 10;
    left: 50%;
    top: ${props => (props.isShow ? "2.5%" : "-100%")};
    transform: translate(-50%, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    background: #acacac;
    color: white;
    padding: 0 5px;
    border-radius: 10px;
    transition: 2s;
`;

export default Main;
