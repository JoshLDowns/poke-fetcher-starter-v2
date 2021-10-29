import { useState, useEffect } from "react";

const PokeDisplay = ({ url, handleModalClose, upperCase }) => {
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setPokemon({
      name: data.name,
      types: data.types,
      sprite: data.sprites.front_default,
      height: data.height,
      weight: data.weight,
    });
  };

  const determineHeight = (height) => {
    return `${Math.round(Math.floor((height * 3.937) / 12))}' ${(
      (height * 3.937) %
      12
    ).toFixed(1)}"`;
  };

  useEffect(() => {
    if (!pokemon) {
      fetchPokemon(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="poke-display">
      {pokemon ? (
        <div className="inner-poke-display">
          <button
            className="close-button"
            onClick={() => {
              setPokemon(null);
              handleModalClose();
            }}
          >
            X
          </button>
          <h2>{upperCase(pokemon.name)}</h2>
          <div className="sprite-wrapper">
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="poke-sprite"
            />
          </div>
          <p>
            {pokemon.types
              .map(
                (obj) => upperCase(obj.type.name)
              )
              .join(" | ")}
          </p>
          <p>{`Height: ${determineHeight(pokemon.height)}`}</p>
          <p>{`Weight: ${Math.round(pokemon.weight / 4.536)}`}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokeDisplay;
