import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import PokemonService, { convertNameToId } from "./PokemonService.js";
import _ from "lodash";

const Game = () => {
    const [correctPokemon, setCorrectPokemon] = useState({});
    const [guessedPokemons, setGuessedPokemons] = useState([]);
    const [revealPokemon, setRevealPokemon] = useState(false);
    const [id, setId] = useState("");

    useEffect(() => {
        randomPokemon();
    }, []);

    useEffect(() => {
        comparePokemon();
    }, [guessedPokemons, correctPokemon]);

    const randomPokemon = async () => {
        let pokemonId = Math.floor(Math.random() * 905);
        let pokemon = await PokemonService.getAllPokemonData(pokemonId);
        setCorrectPokemon(pokemon);
    };

    const searchPokemon = async (id) => {
        if (guessedPokemons.length < 6) {
            let pokemon = await PokemonService.getAllPokemonData(id);
            setGuessedPokemons([...guessedPokemons, pokemon]);
        }
    };

    const comparePokemon = () => {
        console.log(correctPokemon);
        if (_.some(guessedPokemons, correctPokemon)) {
            setRevealPokemon(true);
        }
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
                    />
                </label>
            </form>
            <button
                onClick={() => {
                    searchPokemon(id);
                }}
            >
                Submit
            </button>
            <button
                onClick={() => {
                    randomPokemon();
                }}
            >
                Get Random Pokemon
            </button>
            <button
                onClick={() => {
                    setRevealPokemon(true);
                }}
            >
                Reveal Pokemon
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
                        <td>Random Pokemon</td>
                        <td id="test">
                            {revealPokemon ? (
                                correctPokemon.name
                            ) : (
                                <p>Hidden</p>
                            )}
                        </td>
                        <td>
                            {revealPokemon ? (
                                correctPokemon.type1
                            ) : (
                                <p>Hidden</p>
                            )}
                        </td>
                        <td>
                            {revealPokemon ? (
                                correctPokemon.type2
                            ) : (
                                <p>Hidden</p>
                            )}
                        </td>
                        <td>
                            {revealPokemon ? (
                                correctPokemon.generation
                            ) : (
                                <p>Hidden</p>
                            )}
                        </td>
                        <td>
                            {revealPokemon ? (
                                correctPokemon.height + "m"
                            ) : (
                                <p>Hidden</p>
                            )}
                        </td>
                        <td>
                            {revealPokemon ? (
                                correctPokemon.weight + "kg"
                            ) : (
                                <p>Hidden</p>
                            )}
                        </td>
                    </tr>
                    {guessedPokemons.map((item, i) => (
                        <tr key={i}>
                            <td key="Searched">
                                {item !== undefined ? (
                                    "Searched Pokemon #" + (i + 1)
                                ) : (
                                    <p>loading...</p>
                                )}
                            </td>
                            <td key="Name">
                                {item !== undefined ? (
                                    item.name
                                ) : (
                                    <p>loading...</p>
                                )}
                            </td>
                            <td key="Type 1">
                                {item !== undefined ? (
                                    item.type1
                                ) : (
                                    <p>loading...</p>
                                )}
                            </td>
                            <td key="Type 2">
                                {item !== undefined ? (
                                    item.type2
                                ) : (
                                    <p>loading...</p>
                                )}
                            </td>
                            <td key="Generation">
                                {item !== undefined ? (
                                    item.generation
                                ) : (
                                    <p>loading...</p>
                                )}
                            </td>
                            <td key="Height">
                                {item !== undefined ? (
                                    item.height + "m"
                                ) : (
                                    <p>loading...</p>
                                )}
                            </td>
                            <td key="Weight">
                                {item !== undefined ? (
                                    item.weight + "kg"
                                ) : (
                                    <p>loading...</p>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Game;
