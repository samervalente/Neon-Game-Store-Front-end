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
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

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

  function addToCart(id) {
    const adds = gamesData.map((game) => {
      if (id === game._id) {
        const body = {
          name: game.name,
          description: game.description,
          price: game.price,
          imageURL: game.imageURL,
        };
        axios
          .post("https://neon-game-store-back.herokuapp.com/cart", body, config)
          .then(() => {
            console.log("Tudo ok");
          })
          .catch((error) => {
            console.log(error);
          });
        return { ...game, inCart: true };
      } else {
        return { ...game };
      }
    });
    setGamesData(adds);
  }

  function buyNow(id) {
    gamesData.map((game) => {
      if (id === game._id) {
        const body = {
          products: [
            {
              name: game.name,
              description: game.description,
              price: game.price,
              imageURL: game.imageURL,
            },
          ],
          total: game.price,
        };
        console.log(body);
        axios
          .post(
            "https://neon-game-store-back.herokuapp.com/checkout",
            body,
            config
          )
          .then(() => {
            console.log("Tudo ok");
            navigate("/checkout");
          })
          .catch((error) => {
            console.log(error);
          });
        return { gamesData };
      }
    });
  }

  function removeFromCart(id) {
    const removes = gamesData.map((game) => {
      if (id === game._id) {
        axios
          .delete(
            `https://neon-game-store-back.herokuapp.com/cart/${id}`,
            config
          )
          .then(() => {
            console.log("Removido com sucesso");
          })
          .catch(() => {
            console.log("Deu ruim");
          });
        return { ...game, inCart: false };
      } else {
        return { ...game };
      }
    });

    setGamesData(removes);
  }

  async function FilterCategory(category) {
    const { data } = await axios.get(
      `https://neon-game-store-back.herokuapp.com/games?category=${category}`
    );
    setGamesData(data);
  }

  const games = gamesData.map((game, index) => {
    return (
      <GameSection key={index}>
        <div>
          <img
            onClick={() => choiceGame(game._id)}
            className="gameImage"
            src={game.imageURL}
            alt="imgGame"
          />
        </div>
        <div className="infos">
          <p className="name">{game.name}</p>
          <p className="price">R$ {game.price.toFixed(2).replace(".", ",")}</p>
        </div>
        <div className="actions">
          <button onClick={() => buyNow(game._id)}>
            <NeonButton content="Comprar agora" />
          </button>
          {game.inCart ? (
            <button
              onClick={() => removeFromCart(game._id)}
              className="removeCart"
            >
              Remover do Carrinho
            </button>
          ) : (
            <button onClick={() => addToCart(game._id)}>
              Adicionar ao carrinho
            </button>
          )}
        </div>
      </GameSection>
    );
  });

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
`;
