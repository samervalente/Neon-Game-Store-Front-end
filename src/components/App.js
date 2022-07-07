import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from 'react'
import styled from 'styled-components';
import Login from './Login';
import SignUp from './SignUp';
import Profile from "./Profile"
import Cart from "./Cart"
import Home from "./Home";
import Game from "./Game"
import Checkout from "./Checkout"
import Success from "./Success";
import Orders from "./Orders"


export default function App() {
    const [gameChoice, setGameChoice] = useState({})

    return (
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/home"   element={<Home />}/> 
                    <Route path="/game/:id"  element={<Game />} />                      
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} /> 
                    <Route path="/success" element={<Success />} />
                </Routes>
            </BrowserRouter>
        </Container>
    )
}
const Container = styled.main`
    width: 100vw;
    height: 100vh;
`;