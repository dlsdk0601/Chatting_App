import { emit } from "process";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { user } from "../../atom";
import { socket } from "../../socket";
import { IRoomList } from "../main/Main";

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
    roomname: string | undefined;
    roomList: IRoomList[];
    isIn: boolean;
}

interface IisIn {
    isIn: boolean;
}

const Room = ({ roomname, roomList, isIn }: IRoom) => {
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
        socket.on("new_message", (room: string, obj: ITextList) => {
            addText(obj, room);
        });
    }, []);

    const addText = (obj: ITextList, room: string) => {
        if (roomname !== room) {
            return;
        }
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
        const name = roomname || "";
        addText(obj, name);
        socket.emit("sendText", text, roomname, userData.name);
    };

    return (
        <Container isIn={isIn}>
            <ChattBox>
                {textList.map((item: ITextList, index: number) => {
                    // if (item.sender === "user") {
                    return (
                        <MyText
                            sender={item.sender}
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

const Container = styled.div<IisIn>`
    width: 80vw;
    height: 85vh;
    position: absolute;
    right: 0;
    top: 52%;
    transform: translate(0, -50%);
    border-radius: 35px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.6);
    overflow: hidden;
    border: 1px solid #acacac;
    display: ${props => (props.isIn ? "block" : "none")};

    @media screen and (max-width: 1300px) {
        width: calc(100vw * (950 / 1300));
    }

    @media screen and (max-width: 800px) {
        right: 50%;
        transform: translate(50%, -50%);
        width: 90vw;
    }
`;

const ChattBox = styled.div`
    width: 100%;
    height: 83%;
    margin-top: 3%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        height: 17%;
        border-radius: 10px;
        background: #ccc;
    }

    @media screen and (max-width: 800px) {
        margin-top: 10%;
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
    color: ${props => props.theme.textColor};

    @media screen and (max-width: 800px) {
        width: calc(100vw * (580 / 800));
    }
`;

const Btn = styled.button`
    margin-right: 2.5%;
    width: 10%;
    height: 80%;
    border: none;
    background: none;
    background: #046b99;
    color: white;
    border-radius: 25px;
    cursor: pointer;

    @media screen and (max-width: 1300px) {
        width: calc(100vw * (90 / 1300));
        height: calc(100vw * (30 / 1300));
    }

    @media screen and (max-width: 800px) {
        width: calc(100vw * (90 / 800));
        font-size: 10px;
        height: calc(100vw * (40 / 800));
    }
`;

export default React.memo(Room);
