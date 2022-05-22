import React, { useState, useEffect } from "react";
import './Form.css'

const Form = () => {
  const [pokemon, setPokemon] = useState([]);
  //const [respuesta, setRespuesta] = useState("");
  const [isActive, setIsActive] = useState(true);

  const id = Math.floor(Math.random() * 150) + 1;

  useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPokemon(data)
        });
  }, []);

  async function get(){
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPokemon(data)
        setIsActive(true);
      });
  }

  const adivinarPokemon = (e) => {
    e.preventDefault()
    //setRespuesta(e.target.adivinar.value)
    const inputName = e.target.adivinar.value
    console.log(inputName)
    if(inputName === pokemon.name) {
      setIsActive(false);
      alert("correcto")
      return
    }
    alert("Incorrecto! Intenta de nuevo")
  }
  
  const volverAAdivinar =() => {
    get()
  }
  

  return (
    <div
      className="container-fluid pokemon-container"
      style={{ height: "100vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", margin: "0px" }}
    >
      <div className="card pokemon-card" style={{ width: "18rem" }}>
        <img
          src={pokemon?.sprites?.front_default}
          className={isActive ? 'filter card-img-top' : 'card-img-top'} 
          alt={pokemon.name}
        />
      </div>
      <form
        onSubmit={adivinarPokemon}
      >
        <input type="text" name="adivinar" autoComplete="off" />
        <button type="submit">adivinar</button>
      </form>
    </div>
  );
};

export default Form;
