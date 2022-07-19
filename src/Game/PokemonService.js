const axios = require("axios").default;

const getAllPokemonData = async (pokemonId) => {
    let pokemonData = await getPokemonData(pokemonId);
    let pokemonGeneration = await getPokemonGeneration(pokemonId);
    let pokemonAllData = { ...pokemonData, ...pokemonGeneration };
    return pokemonAllData;
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
    let pokemonJSON = {
        generation: response.data.generation.name,
    };
    return pokemonJSON;
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
module.exports = { getAllPokemonData: getAllPokemonData };
