import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import PokemonService, { convertNameToId } from "./PokemonService.js"

const Game = () => { 
    const[correctPokemon, setCorrectPokemon] = useState({});
    const[guessedPokemons, setGuessedPokemons] = useState([]);
    const[id,setId] = useState("");

    const randomPokemon = async() => {
        let pokemonId = (Math.floor(Math.random() * 905))
        let pokemon = await PokemonService.getAllPokemonData(pokemonId)
        setCorrectPokemon(pokemon)
        let test = JSON.stringify(correctPokemon.pokemonAllData.name)
        console.log(test)
    }

    const searchPokemon = async(id) => {
        let pokemon = await PokemonService.getAllPokemonData(id)
        setGuessedPokemons(oldArray => [...oldArray, pokemon]);
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
                <td>{correctPokemon.pokemonAllData !== undefined ? correctPokemon.pokemonAllData.name : <p>loading...</p>}</td>
                <td>{correctPokemon.pokemonAllData !== undefined ? correctPokemon.pokemonAllData.type1 : <p>loading...</p>}</td>
                <td>{correctPokemon.pokemonAllData !== undefined ? correctPokemon.pokemonAllData.type2 : <p>loading...</p>}</td>
                <td>{correctPokemon.pokemonAllData !== undefined ? correctPokemon.pokemonAllData.generation : <p>loading...</p>}</td>
                <td>{correctPokemon.pokemonAllData !== undefined ? correctPokemon.pokemonAllData.height + "m" : <p>loading...</p>}</td>
                <td>{correctPokemon.pokemonAllData !== undefined ? correctPokemon.pokemonAllData.weight + "kg" : <p>loading...</p>}</td>    
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