import { Link } from "react-router-dom";
import styled from "styled-components";
import logosuccess from "../assets/images/logosuccess.png";

export default function Success() {
  return (
    <Container>
      <img src={logosuccess} alt="logso" />
      <h3>
        Parabéns!<br></br> O seu pedido foi aceito!
      </h3>
      <Link to="/home">
        <span> {">>"} Continuar comprando </span>
      </Link>
      <Link to="/orders" className="viewOrders">
        <span> {">>"} Ver meus pedidos </span>
      </Link>
    </Container>
  );
}

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  justify-content: center;

  h3 {
    color: #ffffff;
    text-align: center;
    font-family: "Goldman", cursive;
    font-size: 25px;
  }

  img {
    width: 450px;
  }

  span {
    font-family: "Goldman", cursive;
    color: #ffab2d;
    font-size: 18px;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    margin: 50px 0 10px 0;

    &:hover {
      text-decoration: underline;
      text-decoration-color: #ffab2d;
    }
  }

  .viewOrders {
    margin: 5px 0 10px 0;
  }
`;
