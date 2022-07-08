import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Footer from "../shared/Footer";
import "../assets/styles/Home.css";

export default function Home() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function FetchData() {
      const { data } = await axios.get(
        "https://neon-game-store-back.herokuapp.com/games"
      );
      setGames(data);
    }
    FetchData();
  }, []);

  function choiceGame(id) {
    navigate(`/game/${id}`);
  }

  async function FilterCategory(category){
    console.log(category)
      const {data} = await axios.get(`https://neon-game-store-back.herokuapp.com/games?category=${category}`)
      setGames(data)
  }

  const gameComponent = games.map((game) => {
    return (
      <div
        key={game._id}
        className="gameSection"
      >
        <img  onClick={() => choiceGame(game._id)}  className="gameImage" src={game.imageURL} alt="imgGame" />
        <p className="name">{game.name}</p>
        <p className="price">{game.price.toFixed(2)}</p>
        <div onClick={() => console.log(game._id)} className="addcart">Adicionar ao carrino</div>
      </div>
    );
  });

  return (
    <div className="Container Home">
      <header className="TopBar">
        <h1>Logo Em Construção</h1>
      </header>
      <Main>
        <ul className="Category">
          <li onClick={() => FilterCategory("Todos")}>Todos</li>
          <li onClick={() => FilterCategory("Action")}>Ação</li>
          <li onClick={() => FilterCategory("Adventure")}>Aventura</li>
          <li onClick={() => FilterCategory("FPS")}>FPS</li>
          <li onClick={() => FilterCategory("Suspense")}>Suspense</li>
        </ul>
        <div className="GamesSection">{gameComponent}</div>
      </Main>
      <Footer />
    </div>
  );
}

const Main = styled.main`
  background-color: #151515;
  height: auto;
`;
