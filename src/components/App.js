import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import { useState } from "react";
import styled from "styled-components";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Cart from "./Cart";
import Home from "./Home";
import Game from "./Game";
import Checkout from "./Checkout";
import Success from "./Success";
import Orders from "./Orders";

export default function App() {
  //   const [gameChoice, setGameChoice] = useState({});
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/game/:id" element={<Game />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </UserContext.Provider>
  );
}
const Container = styled.main`
  width: 100vw;
  height: 100vh;
`;
