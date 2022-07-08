import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import styled from "styled-components";
import { IoCloseCircleSharp, IoBagCheckOutline } from "react-icons/io5";
import Collapsible from 'react-collapsible';
import Footer from "../shared/Footer.js";

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { name, token } = user;
  const [productsCart, setProductsCart] = useState([]);

  useEffect(() => {
    async function GetProductsCart() {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get(
          "https://neon-game-store-back.herokuapp.com/cart"
        );

        setProductsCart(data);
      } catch (error) {
        const message = error.response.statusText;
        alert(message);
      }
    }
    GetProductsCart();
  }, []);

  function RenderProducts() {
    if (productsCart.length === 0) {
      return (
        <div>
          <p>
            Não há produtos <br></br> em seu carrinho
          </p>
        </div>
      );
    }

    return productsCart.map((product, index) => {
      const { name, price, imageURL, _id } = product;

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
              <i onClick={() => Delete(_id)}>
                <IoCloseCircleSharp />
              </i>
            </Info>
          </Product>
        </>
      );
    });
  }

  function CalculateTotal() {
    const initialValue = 0;

    return productsCart.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.price;
    }, initialValue);
  }

  function RenderTotal() {
    if (productsCart.length > 0) {
      const total = CalculateTotal().toFixed(2);
      return (
        <>
          <Total total={total}>
            <span>SALDO</span>
            <span>${total}</span>
          </Total>
          <button onClick={() => SubmitCheckout(total)}>Finalizar compra</button>
        </>
      );
    }
  }

  async function Delete(_id) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let confirmAlert = window.confirm(
      "Você tem certeza que quer remover esse produto do carrinho?"
    );

    if (!confirmAlert) {
      return;
    }

    try {
      const { data } = await axios.delete(
        `https://neon-game-store-back.herokuapp.com/cart/${_id}`,
        // body,
        config
      );
      console.log(data);
      setProductsCart(data);
    } catch (error) {
      const message = error.response.statusText;
      alert(message);
    }
  }

  async function SubmitCheckout(total) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(total);
    const body = {
      total: parseFloat(total),
    };

    try {
      await axios.post(
        "https://neon-game-store-back.herokuapp.com/checkout",
        body,
        config
      );
      navigate("/checkout");
    } catch (error) {
      const message = error.response.statusText;
      alert(message);
    }
  }

  return (
    <>
      <Header>
        <span>Finalizar compra</span>
        <i>
          <IoBagCheckOutline />
        </i>
      </Header>
      <Container>
        <Collapsible trigger=">> Resumo do pedido">
          <Products>{RenderProducts()}</Products>
        </Collapsible>
        <Collapsible trigger=">> Dados do comprador">
          <Products>{RenderCustomerData()}</Products>
        </Collapsible>
        <Collapsible trigger=">> Condições de pagamento">
          <Products>{RenderPayment()}</Products>
        </Collapsible>
        {RenderTotal()}
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
  margin-bottom:110px;
  padding: 15px;
  overflow-y: hidden;

  .Collapsible{
     width:100%;
     font-family: "Goldman", cursive;
     font-size:20px;
     margin-bottom: 30px;;
     background-color: #212121;
     border-radius: 10px;
    color:#FFFFFF;
    /* padding-right:5px; */
    border: 0.2rem solid #fff;
    border-radius: 1rem;
    padding: 0.4em;
    box-shadow: 0 0 .2rem #fff,
                0 0 .2rem #fff,
                0 0 1.5rem #dfff1e,
                0 0 0.8rem #dfff1e,
                0 0 0.8rem #dfff1e,
                inset 0 0 1.0rem #dfff1e; 
    }

  .Collapsible__contentInner{
    height: calc((100vh - 380px));
  }

  p {
    font-family: "Inria Sans", sans-serif;
    color: #d8d4d4;
    font-size: 24px;
    text-align: center;
    margin-bottom: 130px;
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
    cursor: pointer;
  }
`;

const Header = styled.div`
  background-color: #151515;
  color: #dfff1e;
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
  height: calc((100vh - 380px));
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Product = styled.div`
  color: #dfff1e;
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

  i {
    font-size: 22px;
    margin-bottom: 65px;
    color: #ffffff;
    margin-left: 30px;
    cursor: pointer;
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

const Total = styled.div`
  color: #dfff1e;
  background-color: #151515;
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
  }

  span:nth-child(2) {
    color: #dfff1e;
  }
`;
