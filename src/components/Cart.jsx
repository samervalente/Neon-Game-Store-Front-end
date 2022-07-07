import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
// import UserContext from "../context/UserContext";
import axios from "axios";
import styled from "styled-components";
import { IoCartOutline, IoCloseCircleSharp } from "react-icons/io5";

export default function Cart() {
  const navigate = useNavigate();
  // const { user } = useContext(UserContext);
  // const { name, token } = user;
  const [productsCart, setProductsCart] = useState([]);

  useEffect(() => {
    async function GetProductsCart() {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };

      try {
        const { data } = await axios.get(
          "https://neon-game-store-back.herokuapp.com/cart"
          // config
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
            <Link to={`game/${_id}`}>
              <img src={imageURL} alt="product" />
            </Link>
            <span> {name} </span>

            <span>${price} </span>
            <i onClick={() => Delete(_id)}>
              <IoCloseCircleSharp />
            </i>
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
            <span>{total}</span>
          </Total>
          <button onClick={() => SubmitCheckout(total)}>Continuar</button>
        </>
      );
    }
  }

  async function Delete(_id) {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    const body = {
      _id,
    };
    let confirmAlert = window.confirm(
      "Você tem certeza que quer remover esse produto do carrinho?"
    );

    if (!confirmAlert) {
      return;
    }

    // try {
    //   const {data} = await axios.delete(
    //     "https://neon-game-store-back.herokuapp.com/cart",
    //     body,
    //     config
    //   );

    //   setProductsCart(data);
    // } catch (error) {
    //   const message = error.response.statusText;
    //   alert(message);
    // }
  }

  async function SubmitCheckout(total) {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    console.log(total);
    // const body = {
    //   total: parseFloat(total)
    // };

    // try {
    //   await axios.post("https://neon-game-store-back.herokuapp.com/checkout", body, config);
    // navigate("/checkout");
    // } catch (error) {
    //   const message = error.response.statusText;
    //   alert(message);
    // }
  }

  return (
    <>
      <Header>
        <span>Meu carrinho</span>
        <i>
          <IoCartOutline />
        </i>
      </Header>
      <Container productsCart={productsCart}>
        {RenderProducts()}
        {RenderTotal()}
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
  justify-content: ${(props) =>
    props.productsCart.length === 0 ? "center" : "flex-start"};
  margin-top: 50px;
  padding: 15px;
  overflow-y: scroll;

  p {
    font-family: "Inria Sans", sans-serif;
    color: #d8d4d4;
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
  position: fixed;
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

  span {
    font-family: "Inria Sans", sans-serif;
    font-size: 16px;
    margin-bottom: 70px;
    margin-right: 5px;
    /* margin-left: 55px; */
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

const Total = styled.div`
  color: #dfff1e;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

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
