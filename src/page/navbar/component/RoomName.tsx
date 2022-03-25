import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//img
import Ex from "../../../img/ex.png";
import { socket } from "../../../socket";

interface IRoomName {
    name: string;
    deleteItem: (name: string) => void;
}

const RoomName = ({ name, deleteItem }: IRoomName) => {
    const navigate = useNavigate();
    const enterRoom = () => {
        navigate(`/main/${name}`);
        socket.emit("changeRoom", name);
    };

    return (
        <NameBox>
            <Name onClick={enterRoom}>{name}</Name>
            <Img onClick={() => deleteItem(name)} src={Ex} alt="ex" />
        </NameBox>
    );
};

const NameBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    margin-top: 10px;
`;

const Name = styled.p`
    text-align: center;
    color: white;
    line-height: 30px;
    width: 50%;
    cursor: pointer;
`;
const Img = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
`;

export default RoomName;
