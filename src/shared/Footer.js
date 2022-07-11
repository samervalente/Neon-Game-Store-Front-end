import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <ContainerFooter>
       <Link to="/home">
        <div>
        <ion-icon name="game-controller-outline"></ion-icon>
          <p>Jogos</p>
        </div>
      </Link>
      <Link to="/cart">
        <div>
          <ion-icon name="cart-outline"></ion-icon>
          <p>Carrinho</p>
        </div>
      </Link>
      <Link to="/orders">
        <div>
          <ion-icon name="bag-handle-outline"></ion-icon>
          <p>Pedidos</p>
        </div>
      </Link>
      <Link to="/">
        <div>
          <ion-icon name="exit-outline"></ion-icon>
          <p>Sair</p>
        </div>
      </Link>
    </ContainerFooter>
  );
}

const ContainerFooter = styled.div`
  background-color: #212121;
  backdrop-filter: blur(35px);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 12px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: white;
  }

  a {
    text-decoration: none;
  }

  ion-icon{
    margin-bottom: 8px;
    font-size: 25px;
  }
`;
