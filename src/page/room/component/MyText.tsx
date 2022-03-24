import React from "react";
import styled from "styled-components";

//interface
interface IMyTextProp {
    text: string;
    isUser: boolean;
}

interface IText {
    isUser: boolean;
}

const MyText = ({ text, isUser }: IMyTextProp) => {
    return (
        <TextBox isUser={isUser}>
            <Text isUser={isUser}>{text}</Text>
        </TextBox>
    );
};

const TextBox = styled.div<IText>`
    width: 100%;
    height: 30px;
    margin: 10px 0;
    display: flex;
    justify-content: ${props => (props.isUser ? "flex-end" : "flex-start")};
    align-items: center;
    padding: 0 10px;
`;

const Text = styled.span<IText>`
    text-align: ${props => (props.isUser ? "right" : "left")};
    background: ${props => (props.isUser ? "#046b99" : "#00CFFF")};
    color: white;
    height: 100%;
    line-height: 2;
    padding: 0 10px;
    border-radius: 5px;
`;

export default MyText;
