import MapperUtils from "../utils/MapperUtils";
const axios = require("axios").default;

const getAllPokemonData = async (pokemonId) => {
    let pokemonData = await getPokemonData(pokemonId);
    pokemonData.generation = await getPokemonGeneration(pokemonId);
    return pokemonData;
};

const getPokemonData = async (pokemonId) => {
    const response = await axios(
        "https://pokeapi.co/api/v2/pokemon/" + pokemonId
    );
    let type2 = "None";
    if (response.data.types[1] !== undefined) {
        type2 = response.data.types[1].type.name;
    }
    let pokemonJSON = {
        // object that we want to update
        name: response.data.name, // update the value of specific key
        type1: response.data.types[0].type.name,
        type2: type2,
        height: response.data.height / 10,
        weight: response.data.weight / 10,
    };
    return pokemonJSON;
};

const getPokemonGeneration = async (pokemonId) => {
    const response = await axios(
        "https://pokeapi.co/api/v2/pokemon-species/" + pokemonId
    );
    return MapperUtils.mapGenerationToNumber(response.data.generation.name);
};

const comparePokemonFields = (guessedPokemon, correctPokemon) => {
    let comparisons = {
        type1: "x",
        type2: "x",
        generation: "=",
        height: "=",
        weight: "=",
    };
    if (guessedPokemon.type1 === correctPokemon.type1) {
        comparisons.type1 = "✓";
    }
    if (guessedPokemon.type2 === correctPokemon.type2) {
        comparisons.type2 = "✓";
    }
    if (guessedPokemon.generation > correctPokemon.generation) {
        comparisons.generation = "↑";
    } else if (guessedPokemon.generation < correctPokemon.generation) {
        comparisons.generation = "↓";
    }
    if (guessedPokemon.height > correctPokemon.height) {
        comparisons.height = "↑";
    } else if (guessedPokemon.height < correctPokemon.height) {
        comparisons.height = "↓";
    }
    if (guessedPokemon.weight > correctPokemon.weight) {
        comparisons.weight = "↑";
    } else if (guessedPokemon.weight < correctPokemon.weight) {
        comparisons.weight = "↓";
    }
    return comparisons;
};

const getAllPokemonNames = async () => {
    const response = await axios(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=9999"
    );
    const pokemonNames = response.data.results.map((pokemon) => {
        const pokemonName = { value: pokemon.name, label: pokemon.name };
        return pokemonName;
    });
    return pokemonNames;
};

// const searchPokemon = () => {
//     axios
//       .get("https://pokeapi.co/api/v2/pokemon/" + label)
//       .then(response => {
//         // handle success
//         console.log(JSON.stringify(response.data, null, 2))
//         setName2(JSON.stringify(response.data.name, null, 2))
//         setType21(JSON.stringify(response.data.types[0].type.name, null, 2))
//         setHeight2(JSON.stringify(response.data.height, null, 2))
//         setWeight2(JSON.stringify(response.data.weight, null, 2))
//         try {
//           setType22(JSON.stringify(response.data.types[1].type.name, null, 2))
//         }
//         catch(err) {
//           setType22("None")
//         }
//         generation(label,2)
//       })
//       .catch((error) => {
//         // handle error
//         console.log(error);
//         setName2("Pokemon doesn't exist!")
//       })
//       .then(() => {
//         //
//       });
//   }

// export default getAllPokemonData
export default { getAllPokemonData, comparePokemonFields, getAllPokemonNames };
