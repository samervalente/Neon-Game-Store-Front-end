import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Footer from "../shared/Footer";
import "../assets/styles/Home.css";
import NeonButton from "../shared/NeonButton";

export default function Home() {
  const [gamesData, setGamesData] = useState([]);
  const [added, setAdded] = useState(false)
  const navigate = useNavigate();

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

  const games = gamesData.map((game) => {
    return (
      <GameSection key={game._id}>
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
          <button>Adicionar ao carrinho</button>
        </div>
      </GameSection>
    );
  });

  return (
   
      <>
      <Container>
        <Header className="TopBar">
          <img className="Logo" src="https://i.im.ge/2022/07/11/uJykDK.png"></img>   
        </Header>
            <Categories className="Category">
              <li onClick={() => FilterCategory("Todos")}>Todos</li>
              <li onClick={() => FilterCategory("Action")}>Ação</li>
              <li onClick={() => FilterCategory("Adventure")}>Aventura</li>
              <li onClick={() => FilterCategory("FPS")}>FPS</li>
              <li onClick={() => FilterCategory("Suspense")}>Suspense</li>
            </Categories>
              {games}
        </Container>
        <Footer />
      </>
   
  );
}

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.main`
  height: auto;
  display: flex;
  flex-direction:column;
  width: 100vw;
`;

const Categories = styled.ul`
 display: flex;
 justify-content: space-evenly;
 align-items: center;
 height:40px;
 background-color: rgba(61, 61, 61, 0.568);


`

const GameSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;


    .infos{
      width: 100px;
    }

    .price{
      color:yellow;
      margin-top: 10px;
    }

    &:last-child{
      margin-bottom:100px;
    }
`
