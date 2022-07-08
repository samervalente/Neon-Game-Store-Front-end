
import styled from "styled-components"

export default function Profile(){

    return (
        <>
            <p>Eu sou o Checkout</p>
            <Confirm>Confirmar Compra</Confirm>
        </> 
    )
}

const Confirm = styled.div`
    font-family: 'Goldman';
    text-decoration: none;
    display: inline-block;
    padding: 10px;
    border: 4px solid #FFAB2D;
    border-radius: 0px 8px 0px 8px;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3) #FFAB2D;
    box-shadow: inset 0 0 20px #FFAB2D, 0 0 20px #FFAB2D;
    position: relative;


    &:before{
    pointer-events: none;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #FFAB2D;
    left: 0;
    top: 120%;

    transform: perspective(64px) rotateX(40deg) scale(1, 0.35);
    filter: blur(64px);
    opacity: 0.7;
    }

    &:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #FFAB2D;
  box-shadow: 0 0 128px 32px #FFAB2D;
  z-index: -1;
  opacity: 0;
  transition: opacity 100ms linear;
}
    &:hover::after, &:focus::after{
        opacity: 1;
    }

    &:hover, &:focus{
        color: #202631;
        text-shadow: none;
    }

    cursor: pointer;

`



