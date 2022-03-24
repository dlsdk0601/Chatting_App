import React from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../navbar/Navbar";
import Room from "../room/Room";

const Main = () => {
    const navigate = useNavigate();
    const isInRoom = useMatch("/main/:roomname");
    const { roomname } = useParams();

    return (
        <>
            <Navbar />
            {roomname && <Room />}
        </>
    );
};

export default Main;
