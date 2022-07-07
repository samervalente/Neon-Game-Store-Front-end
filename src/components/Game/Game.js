import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export default function Game({gameChoice}){
    const {id} = useParams()
    // useEffect(() => {
    //     async function FetchData(){
    //         await axios.get('https://neon-game-store-back.herokuapp.com/games')
    //     }
    // },[])


    return (
        <p>Olá, eu sou o game {gameChoice.name}</p>
    )
}

