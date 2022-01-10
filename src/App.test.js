/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("renders correctly", () => {
  test("renders form correctly", () => {
    render(<App />);
    const nameInput = screen.getByTestId(/name-input/i);
    expect(nameInput).toBeInTheDocument();
    const nameError = screen.queryByTestId(/name-error/i);
    expect(nameError).toBeNull();

    const elementSelector = screen.getByTestId(/element-selector/i);
    expect(elementSelector).toBeInTheDocument();
    const elementError = screen.queryByTestId(/element-error/i);
    expect(elementError).toBeNull();

    const colorSelector = screen.getByTestId(/color-selector/i);
    expect(colorSelector).toBeInTheDocument();
    const colorError = screen.queryByTestId(/color-error/i);
    expect(colorError).toBeNull();

    const submitButton = screen.getByTestId(/primary-button/i);
    expect(submitButton).toBeInTheDocument();
  });
});

describe("validates fields correctly", () => {
  test("returns error if user focuses on the name field and blurs without a name", async () => {
    render(<App />);
    const nameInput = screen.getByTestId(/name-input/i);

    await act(async () => {
      fireEvent.focus(nameInput);
      fireEvent.blur(nameInput);
    });

    const nameError = screen.getByTestId(/name-error/i);
    await waitFor(() => expect(nameError).toBeInTheDocument());
  });

  test("returns name error if the user fills in numbers", async () => {
    render(<App />);
    const nameInput = screen.getByTestId(/name-input/i);
    userEvent.type(nameInput, "1");
    await waitFor(() =>
      expect(screen.getByTestId(/name-input/i)).toHaveValue("1")
    );
    nameInput.blur();
    const nameError = screen.getByTestId(/name-error/i);
    await waitFor(() => expect(nameError).toBeInTheDocument());
  });

  test("returns name error if the user fills in special characters", async () => {
    render(<App />);
    const nameInput = screen.getByTestId(/name-input/i);
    userEvent.type(nameInput, "~>@($");
    await waitFor(() =>
      expect(screen.getByTestId(/name-input/i)).toHaveValue("~>@($")
    );
    nameInput.blur();
    const nameError = screen.getByTestId(/name-error/i);
    await waitFor(() => expect(nameError).toBeInTheDocument());
  });

  test("returns error if the user fills in a name that is too short", async () => {
    render(<App />);
    const nameInput = screen.getByTestId(/name-input/i);
    userEvent.type(nameInput, "a");
    await waitFor(() =>
      expect(screen.getByTestId(/name-input/i)).toHaveValue("a")
    );
    nameInput.blur();
    const nameError = screen.getByTestId(/name-error/i);
    await waitFor(() => expect(nameError).toBeInTheDocument());
  });

  test("returns error if the user fills in a name that is too long", async () => {
    render(<App />);
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

  test("doesn't return error if the user fills in a name that's the right lenght", async () => {
    render(<App />);
    const nameInput = screen.getByTestId(/name-input/i);
    userEvent.type(nameInput, "Mary Sue");
    const nameError = screen.queryByTestId(/name-error/i);
    await waitFor(() => expect(nameError).toBeNull());
  });

  test("returns errors if user hasn't filled in any fields", async () => {
    render(<App />);
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
