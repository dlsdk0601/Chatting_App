import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLight, user } from "../../atom";
import { socket } from "../../socket";

//img
import Person from "../../img/person.png";
import RoomName from "./component/RoomName";
import { useNavigate } from "react-router-dom";

interface IRoomName {
    roomName: string;
}

interface IisLight {
    isLight: boolean;
    isNav: boolean;
}

interface IisNav {
    isNav: boolean;
}

interface IRoomList {
    id: number;
    name: string;
}

const Navbar = () => {
    const navigate = useNavigate();
    const userData = useRecoilValue(user);
    const light = useRecoilValue(isLight);
    const [isNav, setIsNav] = useState<boolean>(false);
    const [roomList, setRoomList] = useState<IRoomList[]>([]);

    const { register, setValue, handleSubmit } = useForm<IRoomName>();

    const createRoom = ({ roomName }: IRoomName) => {
        socket.emit(
            "enterRoom",
            roomName,
            userData.name,
            (nickname: string) => {
                setRoomList((prev: IRoomList[]) => {
                    const obj = {
                        id: prev.length === 0 ? 1 : prev.length + 1,
                        name: roomName,
                    };
                    const arr: IRoomList[] = [...prev, obj];
                    return arr;
                });
                setValue("roomName", "");
                navigate(`/main/${roomName}`);
            }
        );
    };

    const deleteItem = (name: string) => {
        setRoomList((prev: IRoomList[]) => {
            const arr: IRoomList[] = [...prev];
            const newArr = arr.filter(item => item.name !== name);

            return newArr;
        });
    };

    useEffect(() => {
        socket.on("roomList", rooms => {
            // 서버에서 roomList라는 함수를 실행시켜서 전달하니까 return값을 받음.
        });
    }, [roomList]);

    return (
        <>
            <BurgerBox onClick={() => setIsNav(prev => !prev)}>
                <Burger isNav={isNav} isLight={light}></Burger>
                <Burger isNav={isNav} isLight={light}></Burger>
                <Burger isNav={isNav} isLight={light}></Burger>
            </BurgerBox>
            <Nav isNav={isNav}>
                <Profile>
                    <Photo src={Person} alt="person" />
                </Profile>
                <Name>{userData.name}</Name>
                <Email>{userData.email}</Email>
                <Form onSubmit={handleSubmit(createRoom)}>
                    <Title>채팅방 이름을 입력해주세요.</Title>
                    <Input
                        {...register("roomName", {
                            required: "There is no Name",
                        })}
                        placeholder="Write a Room Name"
                    />
                    <Button>Create</Button>
                </Form>
                <RoomBox>
                    {roomList.length > 0 ? (
                        roomList.map(item => (
                            <RoomName
                                key={item.id}
                                deleteItem={deleteItem}
                                name={item.name}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </RoomBox>
            </Nav>
        </>
    );
};

const Nav = styled.nav<IisNav>`
    position: fixed;
    width: 20%;
    height: 100vh;
    /* background-color: #17536e; */
    background-color: #046b99;
    border-radius: 0 40px 40px 0;
    align-items: center;
    transition: 0.5s;

    @media screen and (max-width: 1300px) {
        width: calc(100vw * (350 / 1300));
    }

    @media screen and (max-width: 800px) {
        position: absolute;
        left: ${props => (props.isNav ? "0" : "-100%")};
        width: calc(100vw * (350 / 800));
    }
`;

const Profile = styled.div`
    width: 100%;
    height: 100px;
    overflow: hidden;
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1300px) {
        height: calc(100vw * (100 / 1300));
        margin-top: calc(100vw * (150 / 1300));
    }

    @media screen and (max-width: 800px) {
        height: calc(100vw * (100 / 800));
        margin-top: calc(100vh * (100 / 800));
    }
`;

const Photo = styled.img`
    width: 80px;
    height: 80px;

    @media screen and (max-width: 1300px) {
        width: calc(100vw * (100 / 1300));
        height: calc(100vw * (100 / 1300));
    }

    @media screen and (max-width: 800px) {
        width: calc(100vw * (60 / 800));
        height: calc(100vw * (60 / 800));
    }
`;

const Name = styled.p`
    text-align: center;
    color: white;
    margin: 10px 0;

    @media screen and (max-width: 1300px) {
        font-size: calc(100vw * (24 / 1300));
        margin: calc(100vh * (10px / 1300)) 0;
    }

    @media screen and (max-width: 800px) {
        font-size: calc(100vw * (24 / 800));
        margin: calc(100vh * (10 / 800)) 0;
    }
`;

const Email = styled.p`
    text-align: center;
    color: white;
    margin-bottom: 10px;

    @media screen and (max-width: 1300px) {
        font-size: calc(100vw * (24 / 1300));
        margin-bottom: calc(100vh * (10 / 1300));
    }

    @media screen and (max-width: 800px) {
        font-size: calc(100vw * (24 / 800));
        margin-bottom: calc(100vh * (10 / 800));
    }
`;

const Title = styled.p`
    color: white;
    margin: 10px 0;

    @media screen and (max-width: 1300px) {
        font-size: calc(100vw * (20 / 1300));
    }

    @media screen and (max-width: 800px) {
        font-size: calc(100vw * (20 / 800));
    }
`;

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;

    @media screen and (max-width: 1300px) {
        margin-top: calc(100vh * (50 / 1300));
    }

    @media screen and (max-width: 800px) {
        margin-top: calc(100vh * (50 / 800));
    }
`;

const Input = styled.input`
    background: none;
    border: none;
    border-bottom: 1px solid #dddddd;
    margin-top: 10px;
    color: white;

    @media screen and (max-width: 1300px) {
        margin-top: calc(100vh * (10 / 1300));
    }

    @media screen and (max-width: 800px) {
        margin-top: calc(100vh * (10 / 800));
        width: calc(100vh * (150 / 800));
    }
`;

const Button = styled.button`
    background: none;
    border: none;
    border: 1px solid #dddddd;
    color: white;
    width: 80px;
    height: 30px;
    border-radius: 10px;
    margin-top: 15px;

    @media screen and (max-width: 1300px) {
        width: calc(100vw * (100 / 1300));
        height: calc(100vh * (40 / 1300));
        font-size: calc(100vw * (20 / 1300));
        line-height: calc(100vh * (35 / 1300));
    }

    @media screen and (max-width: 800px) {
        width: calc(100vw * (100 / 800));
        height: calc(100vh * (30 / 800));
        font-size: calc(100vw * (20 / 800));
        line-height: calc(100vh * (25 / 800));
    }
`;

const RoomBox = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    @media screen and (max-width: 1300px) {
        margin-top: calc(100vw * (30 / 1300));
    }

    @media screen and (max-width: 800px) {
        margin-top: calc(100vw * (30 / 800));
    }
`;
const BurgerBox = styled.div`
    width: 30px;
    height: 20px;
    position: fixed;
    z-index: 2;
    left: 6%;
    top: 3%;
    display: none;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;

    @media screen and (max-width: 800px) {
        display: flex;
    }
`;

const Burger = styled.span<IisLight>`
    display: inline-block;
    width: 30px;
    height: 3px;
    background-color: ${props =>
        props.isNav ? props.theme.bgColor : props.theme.textColor};
    transition: 0.3s;

    &:nth-of-type(2) {
        width: ${props => (props.isNav ? "30px" : "10px")};
    }
`;

export default Navbar;
