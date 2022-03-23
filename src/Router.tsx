import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./page/header/Header";
import Login from "./page/login/Login";
import Main from "./page/main/Main";

const Router = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/main" element={<Main />} />
                <Route path="/main/:roomname" element={<Main />} />
            </Routes>
        </>
    );
};

export default Router;
