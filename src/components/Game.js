import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Game(){
    const [game, setGame] = useState({})
    const {id} = useParams()
    useEffect(() => {
        async function FetchData(){
            const {data} = await axios.get(`https://neon-game-store-back.herokuapp.com/games/${id}`)
            setGame(data)
        }
        FetchData()
    },[])


    return (
        <p>Olá, eu sou o game {game.name}</p>
    )
}


