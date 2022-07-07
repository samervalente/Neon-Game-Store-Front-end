import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
// import UserContext from "../context/UserContext";
import axios from "axios";
import styled from "styled-components";
import { IoCartOutline, IoCloseCircleSharp } from "react-icons/io5";
import test from "../assets/images/u3PxFF.png";

export default function Cart() {
  const navigate = useNavigate();
  // const { user } = useContext(UserContext);
  // const { name, token } = user;
  // const [productsCart, setProductsCart] = useState([]);
  const productsCart = [1];
  // useEffect(() => {
  //   async function GetProductsCart() {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     try {
  //       const { data } = await axios.get(
  //         "https://barbara-mywallet.herokuapp.com/transactions",
  //         config
  //       );

  //       setProductsCart(data);
  //     } catch (error) {
  //       const message = error.response.statusText;
  //       alert(message);
  //     }
  //   }
  //   GetProductsCart();
  // }, []);

  function RenderProducts() {
    if (productsCart.length === 0) {
      return (
        <div>
          <p>Não há registros de entrada ou saída</p>
        </div>
      );
    }

    return (
      <>
        <Product>
          <img src={test} alt="product" />
          <span> Spider-Man</span>
          <span>$30.0 </span>
          <i>
            <IoCloseCircleSharp />
          </i>
        </Product>
      </>
    );
  }

  function CalculateTotal() {
    const initialValue = 0;

    return productsCart.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.value;
    }, initialValue);
  }

  function RenderTotal() {
    if (productsCart.length > 0) {
      const total = CalculateTotal().toFixed(2);
      return (
        <Total total={total}>
          <span>SALDO</span>
          <span>{total}</span>
        </Total>
      );
    }
  }

  return (
    <>
      <Header>
        <span>Meu carrinho</span>
        <i>
          <IoCartOutline />
        </i>
      </Header>
      <Container>
        {RenderProducts()}
        {RenderTotal()}
        <button>Continuar</button>
      </Container>
    </>
  );
}

const Container = styled.main`
  width: 100vw;
  height: 100%;
  background-color: #000000;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  justify-content: flex-start;
  margin-top: 50px;
  padding: 15px;

  p {
    font-family: "Goldman", cursive;
    color: #ffffff;
    font-size: 18px;
    text-align: center;
  }

  button {
    background: linear-gradient(233.29deg, #ff1010 -27.18%, #8a0000 173.14%);
    border-radius: 0px 13.8848px;
    border: none;
    width: 230px;
    height: 50px;
    color: #ffffff;
    font-family: "Goldman", cursive;
    font-size: 18px;
    margin-top: 40px;
    cursor: pointer;
  }
`;

const Header = styled.div`
  background-color: #000000;
  color: #dfff1e;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  position: absolute;
  top: 0;
  left: 0;

  span {
    font-family: "Goldman", cursive;
    font-size: 16px;
  }

  i {
    font-size: 22px;
  }
`;

const Product = styled.div`
  color: #dfff1e;
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;

  span {
    font-family: "Inria Sans", sans-serif;
    font-size: 16px;
    margin-bottom: 70px;
    margin-right: 10px;
    margin-left: 10px;
    color: #ffffff;
  }

  span:nth-child(3) {
    font-weight: 700;
    color: #ffffff;
  }

  i {
    font-size: 22px;
    margin-bottom: 65px;
    color: #ffffff;
    margin-left: 30px;
  }

  img {
    width: 130px;
    height: 160px;
  }
`;

const Total = styled.div`
  color: #dfff1e;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;

  span {
    color: #ffffff;
    font-weight: 700;
    font-family: "Inria Sans", sans-serif;
    font-size: 18px;
    margin-left: 20px;
  }

  span:nth-child(2) {
    color: #dfff1e;
  }
`;
