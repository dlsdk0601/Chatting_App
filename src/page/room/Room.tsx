import { emit } from "process";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { user } from "../../atom";
import { socket } from "../../socket";

//components
import Navbar from "../navbar/Navbar";
import MyText from "./component/MyText";

//img

//interface
interface ITextList {
    text: string;
    sender: string;
}

interface IText {
    text: string;
}

interface IRoom {
    roomname: string;
}

const Room = ({ roomname }: IRoom) => {
    const userData = useRecoilValue(user);
    const navigate = useNavigate();
    const [textList, setTextList] = useState<ITextList[]>([]);
    const { register, setValue, handleSubmit } = useForm<IText>();
    useEffect(() => {
        socket.emit("roomList", (roomList: string[]) => {
            if (roomList.length === 0) {
                navigate("/");
            }
        });
    }, []);

    const addText = (obj: ITextList) => {
        setTextList((prev: ITextList[]) => {
            const newArr = [...prev, obj];
            return newArr;
        });
        setValue("text", "");
    };

    const sendText = ({ text }: IText) => {
        const obj = {
            text,
            sender: userData.name,
        };
        addText(obj);
        socket.emit("sendText", text, roomname, userData.name);
    };

    useEffect(() => {
        socket.on("new_message", (obj: ITextList) => addText(obj));
    }, []);

    return (
        <Container>
            <ChattBox>
                {textList.map((item: ITextList, index: number) => {
                    // if (item.sender === "user") {
                    return (
                        <MyText
                            key={index}
                            isUser={item.sender === userData.name}
                            text={item.text}
                        ></MyText>
                    );
                    // }
                })}
            </ChattBox>
            <TextBox>
                <Form onSubmit={handleSubmit(sendText)}>
                    <Text
                        {...register("text", { required: "please write Text" })}
                    />
                    <Btn>SEND</Btn>
                </Form>
            </TextBox>
        </Container>
    );
};

const Container = styled.div`
    width: 50vw;
    height: 80vh;
    /* background: grey; */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.6);
    overflow: hidden;
    border: 1px solid #acacac;
`;

const ChattBox = styled.div`
    width: 100%;
    height: 83%;
    margin-top: 5%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        height: 17%;
        border-radius: 10px;
        background: #ccc;
    }
`;

const TextBox = styled.div`
    width: 100%;
    height: 5%;
    border-top: 1px solid #acacac;
    border-bottom: 1px solid #acacac;
`;

const Form = styled.form`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Text = styled.input`
    width: 85%;
    height: 100%;
    border: none;
    background: none;
    padding-left: 10px;
`;

const Btn = styled.button`
    margin-right: 2.5%;
    width: 10%;
    height: 55%;
    border: none;
    background: none;
    background: #046b99;
    color: white;
    border-radius: 25px;
`;

export default React.memo(Room);
