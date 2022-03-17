import React from "react";
import styled from "styled-components";

//img
import Ex from "../../../img/ex.png";

interface IRoomName{
    name: string;
}

const RoomName = ({ name }: IRoomName) => {

    return (
        <NameBox>
            <Name>{name}</Name>
            <Img src={Ex} alt="ex" />
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
`

export default RoomName;