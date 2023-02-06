import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import PokemonService from "./PokemonService.js";
import _ from "lodash";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./Game.scss";
import Select from "react-select";

const Game = () => {
    const [correctPokemon, setCorrectPokemon] = useState({});
    const [guessedPokemons, setGuessedPokemons] = useState([]);
    const [revealPokemon, setRevealPokemon] = useState(false);
    const [id, setId] = useState("");
    const [pokemonList, setPokemonList] = useState([
        { value: "Pokemon Name", label: "Pokemon Name" },
    ]);

    useEffect(() => {
        randomPokemon();
        updatePokemonList();
    }, []);

    useEffect(() => {
        if (!_.isEmpty(guessedPokemons)) {
            comparePokemon();
        }
    }, [guessedPokemons.length]);

    const updatePokemonList = async () => {
        setPokemonList(await PokemonService.getAllPokemonNames());
    };

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
        if (_.some(guessedPokemons, correctPokemon)) {
            setRevealPokemon(true);
        }
        let comparison = PokemonService.comparePokemonFields(
            guessedPokemons[guessedPokemons.length - 1],
            correctPokemon
        );
        let latestGuessedPokemon = guessedPokemons[guessedPokemons.length - 1];
        latestGuessedPokemon.comparison = comparison;
        setGuessedPokemons([
            ...guessedPokemons.slice(0, guessedPokemons.length - 1),
            latestGuessedPokemon,
        ]);
    };

    return (
        <>
            <Container className="gameBox">
                <div className="flexbox">
                    <label>Enter your pokemon:</label>
                    <div className="flexbox2">
                        <div style={{ width: "100vw" }}>
                            <Select
                                options={pokemonList}
                                onChange={(e) => setId(e.value)}
                            />
                        </div>
                        <Button
                            variant="outline-primary"
                            onClick={() => {
                                searchPokemon(id);
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
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
                            <td>Pokemon to be found:</td>
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
                                    {item.comparison !== undefined ? (
                                        item.type1 +
                                        " (" +
                                        item.comparison.type1 +
                                        ")"
                                    ) : (
                                        <p>loading...</p>
                                    )}
                                </td>
                                <td key="Type 2">
                                    {item.comparison !== undefined ? (
                                        item.type2 +
                                        " (" +
                                        item.comparison.type2 +
                                        ")"
                                    ) : (
                                        <p>loading...</p>
                                    )}
                                </td>
                                <td key="Generation">
                                    {item.comparison !== undefined ? (
                                        item.generation +
                                        " (" +
                                        item.comparison.generation +
                                        ")"
                                    ) : (
                                        <p>loading...</p>
                                    )}
                                </td>
                                <td key="Height">
                                    {item.comparison !== undefined ? (
                                        item.height +
                                        "m" +
                                        " (" +
                                        item.comparison.height +
                                        ")"
                                    ) : (
                                        <p>loading...</p>
                                    )}
                                </td>
                                <td key="Weight">
                                    {item.comparison !== undefined ? (
                                        item.weight +
                                        "kg" +
                                        " (" +
                                        item.comparison.weight +
                                        ")"
                                    ) : (
                                        <p>loading...</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button
                    variant="outline-primary"
                    onClick={() => {
                        setCorrectPokemon({});
                        setGuessedPokemons([]);
                        setRevealPokemon(false);
                        randomPokemon();
                    }}
                >
                    Reset Game
                </Button>
                <Button
                    variant="outline-primary"
                    onClick={() => {
                        setRevealPokemon(true);
                    }}
                >
                    Reveal Pokemon
                </Button>
                <Button
                    variant="outline-primary"
                    onClick={() => {
                        test();
                    }}
                >
                    Test
                </Button>
            </Container>
        </>
    );
};

export default Game;
