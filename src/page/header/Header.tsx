import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isLight } from "../../atom";

// img
import Moon from "../../img/moon.png";
import Sun from "../../img/sun.png";

interface CircleProps {
    isLight: boolean;
}

const Header = () => {

    const [ lightMode, setLightMode ] = useRecoilState(isLight);
    const themeHandle = () => {
        setLightMode(prev => !prev);
    }
    return (
        <Wrapper>
            <Frame isLight={lightMode} onClick={themeHandle}>
                <Circle isLight={lightMode}>
                    <Image src={lightMode ? Moon : Sun} />
                </Circle>
            </Frame>
        </Wrapper>
    )
};

const Wrapper = styled.header`
    position: fixed;
    right: 5%; 
    top: 20px;
    z-index: 1;
 
    @media screen and (max-width: 1300px){
        
    }

    @media screen and (max-width: 800px){

    }
`;

const Frame = styled.div<CircleProps>`
    position: relative;
    width: 80px;
    height: 40px;
    border: 2px solid ${props => props.theme.textColor};
    border-radius: 20px;

    @media screen and (max-width: 1300px){
        
    }

    @media screen and (max-width: 800px){
        width: calc(100vw*(80/800));
        height: calc(100vw*(40/800));
    }
`;

const Circle = styled.div<CircleProps>`
    position: absolute;
    left: ${props => props.isLight ? `-1px` : `50%`};
    top: -2px;
    width: 40px;
    height: 40px;
    background-color: ${props => props.theme.textColor};
    border-radius: 20px;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1300px){
        
    }

    @media screen and (max-width: 800px){
        width: calc(100vw*(40/800));
        height: calc(100vw*(40/800));
        
    }
`;

const Image = styled.img`
    width: 80%;
    height: 80%;
`

export default Header;