import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import PokemonService from "./PokemonService.js";

const Game = () => {
    const [correctPokemon, setCorrectPokemon] = useState({});
    const [guessedPokemons, setGuessedPokemons] = useState([]);
    const [id, setId] = useState("");

    const handleRandomPokemonButton = async () => {
        let pokemonId = Math.floor(Math.random() * 905);
        let pokemon = await PokemonService.getAllPokemonData(pokemonId);
        setCorrectPokemon(pokemon);
    };

    const handleSearchButton = async (id) => {
        let pokemon = await PokemonService.getAllPokemonData(id);
        setGuessedPokemons((oldArray) => [...oldArray, pokemon]);
    };

    return (
        <>
            <form>
                <label>
                    Guess a Pokemon:
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="Pikachu"
                    />
                </label>
                <button type="button" onClick={handleSearchButton(id)}>
                    Submit
                </button>
            </form>
            <button onClick={handleRandomPokemonButton}>
                Get Random Pokemon
            </button>
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
                        <td>
                            {correctPokemon !== undefined ? (
                                correctPokemon.name
                            ) : (
                                <p>loading...</p>
                            )}
                        </td>
                        <td>
                            {correctPokemon !== undefined ? (
                                correctPokemon.type1
                            ) : (
                                <p>loading...</p>
                            )}
                        </td>
                        <td>
                            {correctPokemon !== undefined ? (
                                correctPokemon.type2
                            ) : (
                                <p>loading...</p>
                            )}
                        </td>
                        <td>
                            {correctPokemon !== undefined ? (
                                correctPokemon.generation
                            ) : (
                                <p>loading...</p>
                            )}
                        </td>
                        <td>
                            {correctPokemon !== undefined ? (
                                correctPokemon.height + "m"
                            ) : (
                                <p>loading...</p>
                            )}
                        </td>
                        <td>
                            {correctPokemon !== undefined ? (
                                correctPokemon.weight + "kg"
                            ) : (
                                <p>loading...</p>
                            )}
                        </td>
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
    );
};

export default Game;
