import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Footer from "../shared/Footer"

export default function Game() {
  const [game, setGame] = useState({});
  const { id } = useParams();
  useEffect(() => {
      axios.get(`https://neon-game-store-back.herokuapp.com/game/${id}`)
      .then((response) => {
        setGame(response.data);
      })
  }, [id]);
  console.log(game)
    return (
        <Container>
            <p>Olá, eu sou o game {game.name}</p>
            <button>Comprar</button>
            <button className="addcart">Adicionar ao carrinho</button>
            <Footer />
        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;

`