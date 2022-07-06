import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useState } from "react";

export default function SignUp(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    return(
        <Align>
            <div>
                <div><img src="" alt="neon-games" /></div>
                <input placeholder=' nome' type='text'  value={name}/>
                <input placeholder=' email' type='email'  value={email}/>
                <input placeholder=' senha' type='password' value={password}/>
                <button>Entrar</button>
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
    background-color: #aeff17;
    text-align: center;
    img{
        margin-bottom: 25px;
    }
    input{
        display: block;
        width: 303px;
        height: 50px;
        border-radius: 5px;
        border: none;
        margin-bottom: 15px;
    }
    button{
        width: 303px;
        height: 50px;
        border-radius: 5px;
        border: none;
        margin-bottom: 15px;
    }
`;