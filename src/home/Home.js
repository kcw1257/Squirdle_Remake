import "./Home.css";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import PokemonService from "../Game/PokemonService.js"
import Game from "../Game/Game.js"
const axios = require("axios").default;


const Home = () => {
    const[pokemonJSON, setpokemonJSON] = useState({});

    
  
    
  
  
    return (
      <>
        <Game></Game>
      </>
  
      
  
  
  
    );
  
}

export default Home