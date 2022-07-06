import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import styled from 'styled-components';

export default function App() {
    return (
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/sign" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </Container>
    )
}
const Container = styled.main`
    width: 100vw;
    height: 100vh;
`;