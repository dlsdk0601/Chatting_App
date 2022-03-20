import React from "react";
import styled from "styled-components";

//img
import Ex from "../../../img/ex.png";

interface IRoomName{
    name: string;
    deleteItem: (name: string) => void;
}

const RoomName = ({ name, deleteItem }: IRoomName) => {

    return (
        <NameBox>
            <Name>{name}</Name>
            <Img onClick={ () => deleteItem(name)} src={Ex} alt="ex" />
        </NameBox>
    )
}


const NameBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    margin-top: 10px;
`

const Name = styled.p`
    text-align: center;
    color: white;
    line-height: 30px;
`
const Img = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
`

export default RoomName;