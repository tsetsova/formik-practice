/* eslint-disable testing-library/no-unnecessary-act */

import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
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
    render(
      <PokemonAnswer rules={rules} response={response} onClick={() => {}} />
    );
    const heading = screen.getByTestId(/heading/i);
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Mary Sue, your Pokemon is:");
  });

  test("formats multi word names of pokemons correctly", () => {
    render(
      <PokemonAnswer rules={rules} response={response} onClick={() => {}} />
    );
    const pokemon = screen.getByTestId(/mega-charizard-y-name/i);
    expect(pokemon).toBeInTheDocument();
    expect(pokemon).toHaveTextContent("Mega Charizard Y!");
  });

  test("renders a working retry button", async () => {
    let onClick = jest.fn();
    render(
      <PokemonAnswer rules={rules} response={response} onClick={onClick} />
    );
    const retryButton = screen.getByTestId(/retry/i);
    expect(retryButton).toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByTestId(/retry/i));
    });
    await waitFor(() => expect(onClick).toHaveBeenCalled());
  });
});
