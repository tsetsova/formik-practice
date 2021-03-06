import React, { useEffect, useState } from "react";
import { capitalizeFirstCharacter } from "../utilities/helpers";

function determinePokemon(rules, element, color) {
  try {
    return rules[element][color];
  } catch (error) {}
  return null;
}

function formatPokemonName(name) {
  if (name !== "") {
    let words = name.split("-");

    return words.map((word) => capitalizeFirstCharacter(word)).join(" ");
  }
}

function PokemonAnswer({ response, rules, onClick }) {
  let [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    setPokemon(determinePokemon(rules, response.element, response.color));
  }, [rules, response.element, response.color]);

  return (
    <div className="container">
      <p
        data-testid="heading"
        className="text-center text-xl"
      >{`${capitalizeFirstCharacter(response?.name)}, your Pokemon is:`}</p>

      {pokemon !== null && (
        <>
          <h1 className="text-4xl text-center" data-testid={`${pokemon}-name`}>{formatPokemonName(pokemon)}!</h1>

          <img
            src={require(`./../pokemon/${pokemon}.png`)}
            alt={pokemon}
            className="justify-center"
            data-testid={`${pokemon}-image`}
          />
                      <div className="flex items-center mx-auto">
              <button
                onClick={onClick}
                className="btn-primary"
                data-testid="retry"
              >
                Retry?
              </button>
            </div>
        </>
      )}
    </div>
  );
}

export default PokemonAnswer;
