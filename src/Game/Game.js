import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import PokemonService from "./PokemonService.js"

const Game = () => { 
    const[correctPokemon, setCorrectPokemon] = useState({});
    const[guessedPokemons, setGuessedPokemons] = useState([]);
    const[id,setId] = useState("");

    useEffect(() => {
        randomPokemon()
      },[]);


    const randomPokemon = async() => {
        let pokemonId = (Math.floor(Math.random() * 905))
        let pokemon = await PokemonService.getAllPokemonData(pokemonId)
        setCorrectPokemon(pokemon)
        // setCorrectPokemon(oldArray => [...oldArray, pokemon]);
        console.log(correctPokemon)
    }

    const searchPokemon = async(id) => {
        let pokemon = await PokemonService.getAllPokemonData(id)
        setGuessedPokemons(oldArray => [...oldArray, pokemon]);
        console.log(guessedPokemons)
    }

    return (
        <>
        <form>
            <label>Enter your name:
                <input
                type="text" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                />
            </label>
        </form>
        <button onClick={() => {searchPokemon(id)}}>Submit</button>
        <button onClick = {() => {randomPokemon()}}>Get Random Pokemon</button>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type 1</th>
                <th>Type 2</th>
                <th>Generation</th>
                <th>Height</th>
                <th>Weight</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Your Searched Pokemon</td>
                {/* <td>{guessedPokemons[0].name}</td> */}
                {/* <td>{type1}</td>
                <td>{type2}</td>
                <td>{gen}</td>
                <td>{height}</td>
                <td>{weight}</td> */}
            </tr>
            <tr>
                <td>2</td>
                {/* <td>{name2}</td>
                <td>{type21}</td>
                <td>{type22}</td>
                <td>{gen2}</td>
                <td>{height2}</td>
                <td>{weight2}</td> */}
            </tr>
            <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
            </tr>
            </tbody>
        </Table>
        </>
    )
}

export default Game