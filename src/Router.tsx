import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./page/main/Main";
import Header from "./page/header/Header";

const Router = () => {

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </>
    )
};

export default Router;