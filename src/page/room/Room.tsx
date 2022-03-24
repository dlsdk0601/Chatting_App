import { emit } from "process";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { socket } from "../../socket";

//components
import Navbar from "../navbar/Navbar";
import MyText from "./component/MyText";

//img

//interface
interface ITextList {
    id: number;
    text: string;
    sender: string;
}

interface IText {
    text: string;
}

const Room = () => {
    const [textList, setTextList] = useState<ITextList[]>([]);
    const { register, setValue, handleSubmit } = useForm<IText>();
    useEffect(() => {
        const list = [
            { id: 1, text: "abcdefg", sender: "user" },
            { id: 2, text: "asdf", sender: "stranger" },
            { id: 3, text: "fff", sender: "user" },
            { id: 4, text: "zzzzz", sender: "stranger" },
            { id: 5, text: "zxcvzxcvzxcv", sender: "user" },
            { id: 6, text: "ccscscscs", sender: "stranger" },
        ];
        setTextList([...list]);
        socket.on("roomList", roomList => {
            console.log(roomList);
        });
    }, []);

    console.log("textList===");
    console.log(textList);

    const sendText = ({ text }: IText) => {
        console.log("start");
        console.log(text);
        const newText = {
            id: textList.length === 0 ? "0" : textList.length + 1,
            text,
            sender: "user",
        };
        console.log(newText);

        socket.emit("sendText", newText, (newText: ITextList) => {
            console.log("cb");
            setTextList((prev: ITextList[]) => {
                const newArr = [...prev, newText];

                return newArr;
            });
        });
    };

    return (
        <Container>
            <ChattBox>
                {textList.map((item: ITextList) => {
                    // if (item.sender === "user") {
                    return (
                        <MyText
                            key={item.id}
                            isUser={item.sender === "user"}
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

export default Room;
