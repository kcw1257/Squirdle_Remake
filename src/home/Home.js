import "./Home.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to Squirdle 0.9!</h1>
            <div className="homeText">
                <p>
                    This is a recreation of Squirdle built using React by Kai
                    Wong! <br />
                    To play, a random hidden pokemon will be generated. <br />
                    Once you have guessed a pokemon, its types, generation,
                    height and weight will be compared to the hidden pokemon.{" "}
                    <br />
                    These comparisons will give you hints towards finding the
                    hidden pokemon.
                    <br /> You only have 6 guesses to find the pokemon, or else
                    you lose. <br />
                    Good Luck!
                </p>
            </div>
        </div>
    );
};

export default Home;
