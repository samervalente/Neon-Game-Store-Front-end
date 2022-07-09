import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import styled from "styled-components";
import { IoBagHandleOutline } from "react-icons/io5";
import Collapsible from "react-collapsible";
import { TailSpin } from "react-loader-spinner";
import Footer from "../shared/Footer.js";

export default function Checkout() {
  const { user } = useContext(UserContext);
  const { name, token } = user;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function GetOrders() {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          "https://neon-game-store-back.herokuapp.com/orders"
        );

        setOrders(response.data);
      } catch (error) {
        const message = error.response.statusText;
        alert(message);
      }
    }
    GetOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <Loading>
        <TailSpin
          color="#ffab2d"
          text-align="center"
          ariaLabel="loading-indicator"
        />
      </Loading>
    );
  }

  function RenderOrders() {
    console.log(orders);
    return orders.map((order, index) => {
      const { payment, date, orderNumber, total } = order;

      return (
        <Collapsible trigger={`Pedido #${orderNumber} - ${date}`} open="true">
          {renderProducts(order)}
          <Total>
            <span>Forma de pagamento</span>
            <span>{payment}</span>
          </Total>
          <Total>
            <span>Total</span>
            <span>${total}</span>
          </Total>
        </Collapsible>
      );
    });
  }

  function renderProducts(order) {
    return order.products.map((product, index) => {
      const { _id, imageURL, price, name } = product;
      return (
        <>
          <Product key={index}>
            <Info>
              <Link to={`game/${_id}`}>
                <img src={imageURL} alt="product" />
              </Link>
              <span> {name} </span>
            </Info>
            <Info>
              <span>${price} </span>
            </Info>
          </Product>
        </>
      );
    });
  }

  return (
    <>
      <Header>
        <span>Meus pedidos</span>
        <i>
          <IoBagHandleOutline />
        </i>
      </Header>
      <Container>
        <Products>{RenderOrders()}</Products>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.main`
  width: 100vw;
  min-height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  justify-content: "flex-start";
  margin-top: 50px;
  margin-bottom: 110px;
  padding: 15px;
  overflow-y: hidden;

  .Collapsible {
    width: 100%;
    font-family: "Goldman", cursive;
    font-size: 18px;
    margin-bottom: 30px;
    background-color: #212121;
    border-radius: 10px;
    color: #d8d4d4;
    border: 0.1rem solid #fff;
    border-radius: 0.1rem;
    padding: 0.4em;
    box-shadow: 0 0 0.1rem #fff, 0 0 0.1rem #fff, 0 0 1rem #ffab2d,
      0 0 0.4rem #ffab2d, 0 0 0.4rem #ffab2d, inset 0 0 0.8rem #ffab2d;
  }

  .Collapsible__contentInner {
    padding: 5px;
  }
`;

const Header = styled.div`
  background-color: #151515;
  color: #ffab2d;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  position: fixed;
  top: 0;
  left: 0;

  span {
    font-family: "Goldman", cursive;
    font-size: 20px;
  }

  i {
    font-size: 27px;
  }
`;

const Products = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Product = styled.div`
  color: #ffab2d;
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-family: "Inria Sans", sans-serif;
    font-size: 16px;
    margin-bottom: 70px;
    color: #ffffff;
  }

  span:nth-child(3) {
    font-weight: 700;
    color: #ffffff;
  }

  img {
    width: 130px;
    height: 160px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Total = styled.div`
  color: #ffab2d;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: #d8d4d4;
    font-weight: 700;
    font-family: "Inria Sans", sans-serif;
    font-size: 16px;
    margin-bottom: 5px;
  }

  span:nth-child(2) {
    color: #ffab2d;
  }
`;
