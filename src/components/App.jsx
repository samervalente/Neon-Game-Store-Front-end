import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from 'react'
import styled from 'styled-components';
import Login from './Login';
import SignUp from './SignUp';
import Home from "./Home/Home";
import Game from "./Game/Game"
import Success from "./Success";


export default function App() {
    const [gameChoice, setGameChoice] = useState({})

    return (
        <Container>
       
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/home"   element={<Home setGameChoice={setGameChoice}/>}/> 
                    <Route path="/game/:id"  element={<Game gameChoice={gameChoice} />} />  
                               
                    {/*              
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} /> */}
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