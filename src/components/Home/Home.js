
import Footer from "./Footer"
import {useState, useEffect} from "react"
import styled from "styled-components"
import axios from "axios"

import "./Style.css"

export default function Home(){
    const [games, setGames] = useState([])

    useEffect(() => {
        async function FetchData(){
            const {data} = await axios.get("http://localhost:5000/games")
            setGames(data)
        }
        FetchData()
    }, [])


    const gameComponent = games.map(game => {
        return <div className="gameSection">
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