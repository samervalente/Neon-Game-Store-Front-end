import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/logo3.png";

export default function Success() {
  return (
    <Container>
      <img src={logo} alt="logo" />
      <h3>
        Parabéns!<br></br> O seu pedido foi aceito!
      </h3>
      <Link to="/home">
        <button>Continuar comprando </button>
      </Link>
      <Link to="/orders">
        <button className="ViewOrders">Ver meus pedidos </button>
      </Link>
    </Container>
  );
}

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #151515;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  justify-content: center;

  h3 {
    color: #ffffff;
    text-align: center;
    font-family: "Inria Sans", sans-serif;
    font-size: 20px;
  }

  img {
    width: 200px;
  }

  button {
    width: 247px;
    height: 52px;
    background: linear-gradient(233deg, #ff1010 -27%, #8a0000 173%);
    border-radius: 0px 14px;
    border: none;
    font-family: "Goldman", cursive;
    color: #ffffff;
    font-size: 16px;
    margin: 50px 0 10px 0;
    cursor: pointer;
  }

  .ViewOrders {
    margin: 10px 0 10px 0;
    background: linear-gradient(233deg, #f8dada -27%, #d87e7e 173%);
    color: #ff1010;
  }
`;
