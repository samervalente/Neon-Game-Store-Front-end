import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Footer from "../shared/Footer"

export default function Game() {
  const [game, setGame] = useState({});
  const { id } = useParams();


  useEffect(() => {
    async function FetchData(){
      const {data} = await  axios.get(`https://neon-game-store-back.herokuapp.com/game/${id}`)
      setGame(data)
    }  
    
    FetchData()
  }, []);

  
    return (
        <Container>
            <div className="section">
              <img className="imagesolo" src={game.soloURL}/>
            </div>
            <div className="infos">
                  <h2 className="gamename">{game.name}</h2>
            
                  <div className="tec-infos"></div>
                  <h3>Sobre o jogo</h3>
              <p className="description">{game.description}</p>
            </div>
            <div className="actions">
            <button>Compre Agora</button>
                <p className="price">R$ {game.price},00</p>
            </div>
            
            <Footer />
        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;

align-items: center;
padding:20px;
height: 100vh;

background: linear-gradient(180deg, rgba(199,8,1,1) 0%, rgba(0,0,0,1) 40%);

.imagesolo{
    width: 250px;
  }

  .infos{
    .gamename{
      font-size: 50px;
      font-family: 'Goldman';
    }
    .description{
      text-align: justify;
      font-family: 'Inria Sans';
      font-size:16px;
     line-height: 22px;
  }
}

   h3{
    font-size:20px;
    margin:10px 0px;
  }

  .actions{
   display: flex;
   justify-content: center;
   align-items: center;
   margin-top:40px;
   width: 70%;

   .price{
    color:#DFFF1E;
    margin-left:10px;
    font-size:20px;
   }
  }

  button{
    background: linear-gradient(180deg, rgba(255,16,16,1) 0%, rgba(138,0,0,1) 100%);
    color:white;
    font-family: 'Goldman';
    border-radius: 5px;
    text-align: none;
    border: none;
    height: 40px;
    font-size:20px;
   
  }


  


`