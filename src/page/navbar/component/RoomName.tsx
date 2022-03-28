import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { user } from "../../../atom";

//img
import Ex from "../../../img/ex.png";
import { socket } from "../../../socket";

interface IRoomName {
    name: string;
    deleteItem: (name: string) => void;
}

const RoomName = ({ name, deleteItem }: IRoomName) => {
    const navigate = useNavigate();
    const userData = useRecoilValue(user);

    const enterRoom = () => {
        socket.emit("enterRoom", name, userData.name);
        navigate(`/main/${name}`);
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

    @media screen and (max-width: 800px) {
        font-size: 12px;
    }
`;
const Img = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;

    @media screen and (max-width: 800px) {
        width: 15px;
        height: 15px;
    }
`;

export default RoomName;
