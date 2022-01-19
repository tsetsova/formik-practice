import { render, screen } from "@testing-library/react";
import PokemonAnswer from "../components/PokemonAnswer";

describe("renders correctly", () => {
  const rules = {
    fire: { red: "vulpix", blue: "mega-charizard-y" },
    metal: { red: "scizor" },
  };

  const response = {
    name: "Mary Sue",
    color: "red",
    element: "fire",
  };

  test("renders the correct pokemon based on the rules", () => {
    render(<PokemonAnswer rules={rules} response={response} />);
    const correctPokemonImage = screen.getByTestId(/vulpix-image/i);
    expect(correctPokemonImage).toBeInTheDocument();
    const correctPokemonName = screen.getByTestId(/vulpix-name/i);
    expect(correctPokemonName).toBeInTheDocument();
    expect(correctPokemonName).toHaveTextContent("Vulpix!");

    const wrongPokemonImage = screen.queryByTestId(/scizor-image/i);
    expect(wrongPokemonImage).toBeNull();
    const wrongPokemonName = screen.queryByTestId(/scizor-name/i);
    expect(wrongPokemonName).toBeNull();
  });

  test("doesn't render any other pokemon", () => {
    render(<PokemonAnswer rules={rules} response={response} />);
    const wrongPokemonImage = screen.queryByTestId(/scizor-image/i);
    expect(wrongPokemonImage).toBeNull();
    const wrongPokemonName = screen.queryByTestId(/scizor-name/i);
    expect(wrongPokemonName).toBeNull();
    const anotherwrongPokemonImage = screen.queryByTestId(
      /mega-charizard-y-image/i
    );
    expect(anotherwrongPokemonImage).toBeNull();
    const anotherWrongPokemonName = screen.queryByTestId(
      /mega-charizard-y-name/i
    );
    expect(anotherWrongPokemonName).toBeNull();
  });
});

describe("formats correctly", () => {
  const rules = {
    fire: { blue: "mega-charizard-y" },
  };

  const response = {
    name: "Mary Sue",
    color: "blue",
    element: "fire",
  };
  test("render's the heading correctly", () => {
    render(<PokemonAnswer rules={rules} response={response} />);
    const heading = screen.queryByTestId(/heading/i);
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Mary Sue, your Pokemon is:");
  });

  test("formats multi word names of pokemons correctly", () => {
    render(<PokemonAnswer rules={rules} response={response} />);
    const pokemon = screen.getByTestId(/mega-charizard-y-name/i);
    expect(pokemon).toBeInTheDocument();
    expect(pokemon).toHaveTextContent("Mega Charizard Y!");
  });
});
