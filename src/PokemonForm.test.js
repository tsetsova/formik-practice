/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import PokemonForm from "./PokemonForm";

describe("submits correctly", () => {
  test("submits form correctly", async () => {
    const onSubmit = jest.fn();
    const formikBag = expect.anything();

    render(<PokemonForm onSubmit={onSubmit} />);

    const nameInput = screen.getByTestId(/name-input/i);

    fireEvent.focus(nameInput);

    userEvent.type(nameInput, "Mary Sue");

    fireEvent.change(screen.getByTestId(/element-selector/i), {
      target: { value: "fire" },
    });
    fireEvent.change(screen.getByTestId(/color-selector/i), {
      target: { value: "red" },
    });

    await act(async () => {
      userEvent.click(screen.getByTestId(/primary-button/i));
    });

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        {
          name: "Mary Sue",
          element: "fire",
          color: "red",
        },
        formikBag
      )
    );
  });
});

describe("validates fields correctly", () => {
  test("shows error if user focuses on the name field and blurs without a name", async () => {
    render(<PokemonForm />);
    const nameInput = screen.getByTestId(/name-input/i);

    await act(async () => {
      fireEvent.focus(nameInput);
      fireEvent.blur(nameInput);
    });

    const nameError = screen.getByTestId(/name-error/i);
    await waitFor(() => expect(nameError).toBeInTheDocument());
  });

  test("shows name error if the user fills in numbers", async () => {
    render(<PokemonForm onSubmit={() => {}} />);
    const nameInput = screen.getByTestId(/name-input/i);
    userEvent.type(nameInput, "1");
    await waitFor(() =>
      expect(screen.getByTestId(/name-input/i)).toHaveValue("1")
    );
    nameInput.blur();
    const nameError = screen.getByTestId(/name-error/i);
    await waitFor(() => expect(nameError).toBeInTheDocument());
  });

  test("shows name error if the user fills in special characters", async () => {
    render(<PokemonForm onSubmit={() => {}} />);
    const nameInput = screen.getByTestId(/name-input/i);
    userEvent.type(nameInput, "~>@($");
    await waitFor(() =>
      expect(screen.getByTestId(/name-input/i)).toHaveValue("~>@($")
    );
    nameInput.blur();
    const nameError = screen.getByTestId(/name-error/i);
    await waitFor(() => expect(nameError).toBeInTheDocument());
  });

  test("shows error if the user fills in a name that is too short", async () => {
    render(<PokemonForm onSubmit={() => {}} />);
    const nameInput = screen.getByTestId(/name-input/i);
    userEvent.type(nameInput, "a");
    await waitFor(() =>
      expect(screen.getByTestId(/name-input/i)).toHaveValue("a")
    );
    nameInput.blur();
    const nameError = screen.getByTestId(/name-error/i);
    await waitFor(() => expect(nameError).toBeInTheDocument());
  });

  test("shows error if the user fills in a name that is too long", async () => {
    render(<PokemonForm onSubmit={() => {}} />);
    const longName = "a".repeat(31);
    const nameInput = screen.getByTestId(/name-input/i);
    userEvent.type(nameInput, longName);
    await waitFor(() =>
      expect(screen.getByTestId(/name-input/i)).toHaveValue(longName)
    );
    nameInput.blur();
    const nameError = screen.getByTestId(/name-error/i);
    await waitFor(() => expect(nameError).toBeInTheDocument());
  });

  test("doesn't shows error if the user fills in a name that's the right lenght", async () => {
    render(<PokemonForm onSubmit={() => {}} />);
    const nameInput = screen.getByTestId(/name-input/i);
    userEvent.type(nameInput, "Mary Sue");
    const nameError = screen.queryByTestId(/name-error/i);
    await waitFor(() => expect(nameError).toBeNull());
  });

  test("shows errors if user hasn't filled in any fields", async () => {
    render(<PokemonForm onSubmit={() => {}} />);
    const submitButton = screen.getByTestId(/primary-button/i);
    await act(async () => {
      userEvent.click(submitButton);
    });

    const nameError = screen.getByTestId(/name-error/i);
    await waitFor(() => expect(nameError).toBeInTheDocument());

    const elementError = screen.getByTestId(/element-error/i);
    await waitFor(() => expect(elementError).toBeInTheDocument());

    const colorError = screen.getByTestId(/color-error/i);
    await waitFor(() => expect(colorError).toBeInTheDocument());
  });
});
