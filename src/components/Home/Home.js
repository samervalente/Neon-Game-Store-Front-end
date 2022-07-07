import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import Footer from "./Footer"
import "./Style.css"

export default function Home({setGameChoice}){
    const [games, setGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function FetchData(){
            const {data} = await axios.get("https://neon-game-store-back.herokuapp.com/games")
            setGames(data)
        }
        FetchData()
    }, [])

    function choiceGame(id, game){
        setGameChoice(game)
        navigate(`/game/${id}`)
    }


    const gameComponent = games.map(game => {
        return <div key={game._id} className="gameSection" onClick={() => choiceGame(game._id, game)}>
            <img className="gameImage" src={game.imageURL}/>
            <p className="name">{game.name}</p>
            <p className="price">{game.price.toFixed(2)}</p>
            <div className="addcart">Add to Cart</div>
        </div>
        
    })

    return (
       
        <div className="Container Home">
                <header className="TopBar">    
                       <h1>Logo Em Construção</h1>
                </header>
               <Main>
                    <ul className="Category">
                            <li clicked="true">Popular</li>
                            <li>Ação</li>
                            <li>Aventura</li>
                            <li>FPS</li>
                    </ul>
                    <div className="GamesSection">
                            {gameComponent}
                    </div>
               </Main>
               <Footer />
        </div>
    )
}

const Main = styled.main`
background-color: #151515;
height:auto;


`