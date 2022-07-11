import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Logo from '../assets/images/Logo2.png';
import axios from 'axios';
import UserContext from '../context/UserContext';

export default function Login() {
    const [body, setBody] = useState({
        email:"",
        password:"" 
    })
    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate();

    function signIn() {
        const promisse = axios.post("https://neon-game-store-back.herokuapp.com/login", body);
        promisse.then(response => {
            setUser(response.data)
            navigate('/home');
        })
            .catch(erro => { alert('bad request') });
    }
    console.log(user)

    return (
        <Align>
            <div>
                <div><img src={Logo} alt="neon-games" /></div>
                <input placeholder=' email' type='email' value={body.email} onChange={e => setBody({...body, email:e.target.value})} />
                <input placeholder=' senha' type='password' value={body.password} onChange={e => setBody({...body, password:e.target.value})} />
                <button onClick={signIn}>Entrar</button>
                <Link to='/signup'><p>Não tem uma conta? Cadastre-se</p></Link>
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
    img{
        width: 303px;
        padding: 0 0 40px 0;
    }
    input{
        width: 303px;
        height: 50px;
        margin-bottom: 15px;
        font-family: 'Goldman';
        text-decoration: none;
        display: block;
        padding: 8px;
        border: 4px solid #FF922D;
        border-radius: 0px 8px 0px 8px;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.3) #FF922D;
        box-shadow: inset 0 0 20px #FF922D, 0 0 20px #FF922D;
    }
    button{
        width: 303px;
        height: 50px;
        border-radius: 5px;
        border: none;
        margin-bottom: 15px;
        border: 4px groove #F317FF;
        font-family: 'Goldman';
        text-decoration: none;
        display: block;
        padding: 8px;
        border: 4px solid #FF922D;
        border-radius: 0px 8px 0px 8px;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.3) #FF922D;
        box-shadow: inset 0 0 20px #FF922D, 0 0 20px #FF922D;
    }
    p{
        color: #FF922D;
    }

    a{
        text-decoration: none;
    }
`;