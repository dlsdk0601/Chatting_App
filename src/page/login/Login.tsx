import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled, { ThemeConsumer } from "styled-components";
import { user } from "../../atom";

interface IForm{
    name: string;
    age: string;
    gender: string;
    email: string;
}

const Login = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<IForm>();

    const [ userData, setUserData ] = useRecoilState(user);
    
    const formHandle = ({name, age, gender, email}:IForm) => {
        
        const userInfo = { name, age, gender, email, isLogged: true };
        localStorage.setItem("userData", JSON.stringify(userInfo));
        setUserData(prev => userInfo);
        
        navigate("/main");
    }

    useEffect( () => {

        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        if(userData.isLogged){
            navigate("/main");
        }

    }, [])

    return (
        <Wrapper>
            <LeftSction>
                <TextBox>
                    <LeftTitle>Welcome to Chatting App</LeftTitle>
                    <Text>{`채팅에 참여하기 위해서는`} <br />{`간략한 정보를 입력해 주셔야해요:)`}</Text>
                    <Text>입력란을 채워주세요!</Text>
                </TextBox>
            </LeftSction>
            <RightSection>
                <Form onSubmit={handleSubmit(formHandle)}>
                    <RightTitle>Sign</RightTitle>
                    <Label>name*</Label>
                    <Input {...register("name", { required: "이름을 적어주세요"})} placeholder="Write your Name" type="text" />
                    <Error>{errors?.name?.message}</Error>
                    <Label>age*</Label>
                    <Input {...register("age", { required: "나이를 적어주세요"})} placeholder="Write your Age" type="number" />
                    <Error>{errors?.age?.message}</Error>
                    <Label>gender*</Label>
                    <Input {...register("gender", { required: "성병을 적어주세요"})} placeholder="Write your Gender(m or w)" type="text" />
                    <Error>{errors?.gender?.message}</Error>
                    <Label>email*</Label>
                    <Input {...register("email", { required: "이메일을 적어주세요"})} placeholder="Write your Email" type="email" />
                    <Error>{errors?.email?.message}</Error>
                    <ButtonBox>
                        <Button>{`Submit:)`}</Button>
                    </ButtonBox>
                </Form>
            </RightSection>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    width: 70%;
    max-width: 950px;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${props => `1px solid ${props.theme.textColor}`};

    /* 테블릿 */
    @media screen and (max-width: 1300px) {
        top: 40%;
    }
    /* 모바일 */
    @media screen and (max-width: 800px) {
        display: block;
        position: static;
        transform: translate(0, 10vh);
        border: none;
        /* border-radius: 0; */
        overflow: none;
        width: 100%;
        height: auto;
    }
`;

const LeftSction = styled.div`
    background-color: #17536e;
    width: 50%;
    height: 100%;
    position: relative;

    /* 테블릿 */
    @media screen and (max-width: 1300px) {
        
    }
    /* 모바일 */
    @media screen and (max-width: 800px) {
        width: 100%;
        height: 25vh;
    }
`

const TextBox = styled.div`
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 90%;
    
    @media screen and (max-width: 800px){
        top: 45%;
    }
`

const LeftTitle = styled.h1`
    font-size: 32px;
    text-align: center;
    color: white;
    margin-bottom: 100px;
    position: relative;
    &::after{
        position: absolute;
        content: "";
        width: 150px;
        height: 3px;
        background-color: white;
        left: 4%;
        top: 150%;
    }

    @media screen and (max-width: 1300px){
        font-size: calc(100vw*(32/1300));
        &::after{
            width: calc(100vw*(130/1300));;
        }
    }
    @media screen and (max-width: 800px){
        margin-bottom: 30px;
        font-size: calc(100vw*(32/800));
        &::after{
            /* width: calc(100vw*(130/800)); */
            display: none
        }
    }
`;

const Text = styled.p`
    text-align: center;
    line-height: 1.5;
    color: white;

    @media screen and (max-width: 1300px){
        line-height: 2;
    }
    @media screen and (max-width: 800px){
        font-size: calc(100vw*(18/800));
    }
`
const RightSection = styled.div`
    width: 50%;
    height: 100%;  
    position: relative;

    @media screen and (max-width: 800px){
        width: 100%;
        height: 70vh;  
    }
`;

const Form = styled.form`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    @media screen and (max-width: 1300px){
        
    }
`;

const RightTitle = styled.h1`
    text-align: center;
    width: 100%;
    font-size: 32px;
    margin-bottom: 30px;
    font-weight: 600;
    position: relative;
    &::after{
        position: absolute;
        content: "";
        width: 45px;
        height: 5px;
        background-color: #17536e;
        left: 50%;
        top: 140%;
        transform: translate(-50%, 0);
    }

    @media screen and (max-width: 1300px){
        font-size: calc(100vw*(32/1300));
    }
    @media screen and (max-width: 800px){
        font-size: calc(100vw*(18/1300));
    }
`;

const Label = styled.label`
    width: 20%;
    text-align: center;
`

const Input = styled.input`
    width: 75%;
    background: none;
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid ${props => props.theme.textColor};

    @media screen and (max-width: 1300px){
        
    }
    @media screen and (max-width: 800px){
        font-size: calc(100vw*(18/1300));
    }
`;

const ButtonBox = styled.div`
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 800px){
        margin-top: calc(100vw*(20/800));
    }
`

const Button = styled.button`
    background: none;
    border: none;
    width: 100px;
    height: 50px;
    border: 1px solid ${props => props.theme.textColor};
    border-radius: 10px;
    background-color: #17536e;
    color: white;
    cursor: pointer;

    @media screen and (max-width: 1300px){
        width: calc(100vw*(100/1300));
        height: calc(100vw*(50/1300));
        border-radius: calc(100vw*(10/1300));
    }
    @media screen and (max-width: 800px){
        width: calc(100vw*(150/800));
        height: calc(100vw*(80/800));
        border-radius: calc(100vw*(10/800));
    }
`;

const Error = styled.p`
    width: 100%;
    height: 12px;
    padding-left: 5%;
    font-size: 12px;
    color: #FF6161;
    
    @media screen and (max-width: 1300px){
        height: calc(100vw*(12/1300));
        font-size: calc(100vw*(12/1300));
    }
    @media screen and (max-width: 800px){
        height: calc(100vw*(12/800));
        font-size: calc(100vw*(12/800));
    }
`

export default Login;

