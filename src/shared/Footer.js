import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <ContainerFooter>
       <Link to="/home">
        <div>
        <ion-icon name="game-controller-outline"></ion-icon>
          <p>Games</p>
        </div>
      </Link>
      <Link to="/profile">
        <div>
          <ion-icon name="person-outline"></ion-icon>
          <p>Profile</p>
        </div>
      </Link>
      <Link to="/cart">
        <div>
          <ion-icon name="cart-outline"></ion-icon>
          <p>Cart</p>
        </div>
      </Link>
      <Link to="/orders">
        <div>
          <ion-icon name="bag-handle-outline"></ion-icon>
          <p>Orders</p>
        </div>
      </Link>
      <Link to="/">
        <div>
          <ion-icon name="exit-outline"></ion-icon>
          <p>Exit</p>
        </div>
      </Link>
    </ContainerFooter>
  );
}

const ContainerFooter = styled.div`
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(35px);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 16px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
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
