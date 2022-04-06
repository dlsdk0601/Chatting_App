import React from "react";
import styled from "styled-components";

//interface
interface IMyTextProp {
    sender: string;
    text: string;
    isUser: boolean;
    scroll: {
        current: null | HTMLDivElement;
    };
    last: boolean;
}

interface IText {
    isUser: boolean;
}

const MyText = ({ text, isUser, sender, scroll, last }: IMyTextProp) => {
    return (
        <>
            {sender === "server" ? (
                <TextBox ref={last ? scroll : null} isUser={isUser}>
                    <WelcomeText>{text}</WelcomeText>
                </TextBox>
            ) : (
                <TextBox ref={last ? scroll : null} isUser={isUser}>
                    {!isUser && <Sender>{sender} : </Sender>}
                    <Text isUser={isUser}>{text}</Text>
                </TextBox>
            )}
        </>
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

    @media screen and (max-width: 800px) {
        height: 20px;
    }
`;

const Text = styled.span<IText>`
    text-align: ${props => (props.isUser ? "right" : "left")};
    background: ${props => (props.isUser ? "#046b99" : "#00CFFF")};
    color: white;
    height: 100%;
    line-height: 2;
    padding: 0 10px;
    border-radius: 5px;
    margin-left: 10px;

    @media screen and (max-width: 800px) {
        font-size: 10px;
        margin-left: 5px;
    }
`;

const WelcomeText = styled.p`
    text-align: center;
    background: #acacac;
    color: ${props => props.theme.textColor};

    @media screen and (max-width: 800px) {
        font-size: 10px;
    }
`;

const Sender = styled.span`
    @media screen and (max-width: 800px) {
        font-size: 10px;
    }
`;

export default React.memo(MyText);
