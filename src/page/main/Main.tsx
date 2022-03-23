import React from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Main = () => {
    const navigate = useNavigate();
    const isInRoom = useMatch("/main/:roomname");

    console.log("isInRoom==");
    console.log(isInRoom);

    return (
        <>
            <Navbar />
            <div></div>
        </>
    );
};

export default Main;
