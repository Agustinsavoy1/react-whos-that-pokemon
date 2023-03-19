import React, { useState, useEffect } from "react";
import "./Form.css";
import background from "../Assets/background.png";
const Form = () => {
  const [pokemon, setPokemon] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const id = Math.floor(Math.random() * 150) + 1;

  useEffect(() => {
    // fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setPokemon(data);
    //   });

    get();
  }, []);

  async function get() {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPokemon(data);
        setIsActive(true);
      });
  }

  const volverAAdivinar = () => {
    get();
  };

  const adivinarPokemon = (e) => {
    e.preventDefault();
    //setRespuesta(e.target.adivinar.value)
    const inputName = e.target.adivinar.value;
    console.log(inputName);
    if (inputName === pokemon.name) {
      setIsActive(false);
      alert("correcto");
      setScore(score + 1);
      setInputValue("");
      setTimeout(() => {
        volverAAdivinar();
      }, 3000);

      return;
    }
    alert("Incorrecto! Intenta de nuevo");
  };

  const onChangeHanlder = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      {pokemon && (
        <div className="pokemon-container">
          <div className="pokemon-card">
            <img
              src={pokemon?.sprites?.front_default}
              className={isActive ? "filter pokemon-img" : "pokemon-img"}
              alt={pokemon.name}
            />
          </div>
          {
            <form onSubmit={adivinarPokemon}>
              <input
                type="text"
                name="adivinar"
                autoComplete="off"
                value={inputValue}
                onChange={onChangeHanlder}
              />
              <button type="submit">adivinar</button>
            </form>
          }

          <p>Your score:{score}</p>
        </div>
      )}
    </>
  );
};

export default Form;
