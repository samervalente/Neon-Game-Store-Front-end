import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../assets/neon-control.webp';
import axios from 'axios';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function signIn() {
        const user = {
            email: email,
            password: password
        }
        console.log(user);
        const promisse = axios.post('localhost:5001', user);
        promisse.then(response => {
            console.log(response);
            navigate('/profile');
        })
            .catch(erro => { alert('bad request') });
    }

    return (
        <Align>
            <div>
                <h1>NEON GAME</h1>
                <h1>STORE</h1>
                <div><img src={Logo} alt="neon-games" /></div>
                <input placeholder=' email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
                <input placeholder=' senha' type='password' value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={signIn}>Entrar</button>
                <Link to='/sign-up'><p>Não tem uma conta? Cadastre-se</p></Link>
            </div>
        </Align>
    )
}
const Align = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    text-align: center;
    font-family: 'Goldman';
    font-style: normal;
    font-weight: 400;
    color: white;
    img{
        width: 303px;
        border-radius: 50%;
    }
    input{
        display: block;
        width: 303px;
        height: 50px;
        border-radius: 5px;
        border: 2px groove #F317FF;
        margin-bottom: 15px;
    }
    button{
        width: 303px;
        height: 50px;
        border-radius: 5px;
        border: none;
        margin-bottom: 15px;
        border: 4px groove #F317FF;
    }
`;