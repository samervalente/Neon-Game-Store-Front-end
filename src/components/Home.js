import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Footer from "../shared/Footer";
import "../assets/styles/Home.css";
import NeonButton from "../shared/NeonButton";
import UserContext from "../context/UserContext";

export default function Home() {
  const [gamesData, setGamesData] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    async function FetchData() {
      const { data } = await axios.get(
        "https://neon-game-store-back.herokuapp.com/games"
      );
      setGamesData(data);
    }
    FetchData();
  }, []);

  function choiceGame(id) {
    navigate(`/game/${id}`);
  }


  async function FilterCategory(category){
      const {data} = await axios.get(`https://neon-game-store-back.herokuapp.com/games?category=${category}`)
      setGamesData(data)
  }
  
  let games;
  if(gamesData.length !== 0 ){
    games = gamesData.map((game, index) => {
      return (
        <GameSection key={index}>
          <div>
            <img  onClick={() => choiceGame(game._id)}  className="gameImage" src={game.imageURL} alt="imgGame" />
          </div>
          <div className="infos">
            <p className="name">{game.name}</p>
            <p className="price">R$ {game.price.toFixed(2).replace(".",",")}</p>
          </div>
          <div className="actions">
            <Link to="/checkout">
              <NeonButton content="Comprar agora"/>
            </Link> 
          </div>
        </GameSection>
      );
    });
  }
   

  return (
    <>
      <Container>
        <Header className="TopBar">
          <img
            className="Logo"
            src="https://i.im.ge/2022/07/11/uJykDK.png"
            alt="logo"
          ></img>
          <p>Olá, {user.name}</p>
        </Header>
            <Categories className="Category">
              <li onClick={() => FilterCategory("Todos")}>Todos</li>
              <li onClick={() => FilterCategory("Action")}>Ação</li>
              <li onClick={() => FilterCategory("Adventure")}>Aventura</li>
              <li onClick={() => FilterCategory("FPS")}>FPS</li>
              <li onClick={() => FilterCategory("Suspense")}>Suspense</li>
            </Categories>
              {gamesData.length === 0 ? "Carregando..." : games}
        </Container>
        <Footer />
      </>
   
  );
}

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
  background-color: #151515;

  img {
    width: 80%;
    
  }

  p {
    font-family: "Goldman";
    font-size: 18px;
  }
`;

const Container = styled.main`
  height: auto;
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const Categories = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 40px;
  background-color: rgba(61, 61, 61, 0.568);
`;

const GameSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;

  img{
    cursor: pointer;
  }

  .infos {
    width: 100px;
  }

  .price {
    color: yellow;
    margin-top: 10px;
  }

  &:last-child {
    margin-bottom: 100px;
  }

  .removeCart {
    background: linear-gradient(
      180deg,
      rgba(255, 16, 16, 1) 0%,
      rgba(138, 0, 0, 1) 100%
    );
    color: white;
  }

  .buttonBuyNow {
    background-color: #11ffee00;
    border: none;
    color: #ffffff;
  }
`;
