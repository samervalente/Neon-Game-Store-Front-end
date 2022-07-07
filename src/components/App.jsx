import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";
import SignUp from "./SignUp";
import Success from "./Success";
import Cart from "./Cart";

export default function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/profile" element={<SignUp />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/game/id" element={<Game />} /> */}
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} /> */}
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}
const Container = styled.main`
  width: 100vw;
  height: 100vh;

  * {
    box-sizing: border-box;
  }
`;
