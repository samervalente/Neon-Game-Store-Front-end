import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useState } from "react";
import Logo from '../assets/neon-control.webp';
import axios from "axios";

export default function SignUp(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword , setConfirm] = useState('');
    const navigate = useNavigate();

    function register(){
        const newUser = {
            email: email,
            name: name,
            password: password
        }
        if(password !== confirmPassword){
            alert("CONFIRME SUA SENHA CORRETAMENTE");
            return
        }
        const promisse = axios.post('localhost:5001/sign-up', newUser);
        promisse.then(response =>{
            console.log(response);
            navigate('/');
        })
        .catch( error =>{
            console.log(error);
            alert('TRY AGAIN');
        });
    }

    return(
        <Align>
            <div>
                <h1>Faça parte da nossa comunidade</h1>
                <div><img src={Logo} alt="neon-games" /></div>
                <input placeholder=' nome' type='text' value={name} onChange={e => setName(e.target.value)}/>
                <input placeholder=' email' type='email' value={email} onChange={e => setEmail(e.target.value)}/>
                <input placeholder=' senha' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                <input placeholder=' confirme sua senha' type='password' value={confirmPassword} onChange={e => setConfirm(e.target.value)}/>
                <button onClick={register}>Entrar</button>
                <Link to='/'><p>Ja tem uma conta? Faça o login aqui</p></Link>
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