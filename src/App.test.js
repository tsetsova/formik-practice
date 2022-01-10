import { render, screen } from "@testing-library/react";
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

describe("validates name field correctly", () => {
  test("returns error if user leaves the field and doesn't fill in a name", () => {
    render(<App />);
    const nameInput = screen.getByTestId(/name-input/i);
    nameInput.focus();
    nameInput.blur();
    const nameError = screen.getByTestId(/name-error/i);
    expect(nameError).toBeInTheDocument();
  });

  test("returns error if the user fills in a name that is too short", () => {
    render(<App />);
    const nameInput = screen.getByTestId(/name-input/i);
    userEvent.type(nameInput, "a");
    expect(screen.getByTestId(/name-input/i)).toHaveValue("a");
    nameInput.blur();
    const nameError = screen.getByTestId(/name-error/i);
    expect(nameError).toBeInTheDocument();
  });

  test("returns error if the user fills in a name that is too long", () => {
    render(<App />);
    const longName = "a".repeat(31);
    const nameInput = screen.getByTestId(/name-input/i);
    userEvent.type(nameInput, longName);
    expect(screen.getByTestId(/name-input/i)).toHaveValue(longName);
    nameInput.blur();
    const nameError = screen.getByTestId(/name-error/i);
    expect(nameError).toBeInTheDocument();
  });

  test("doesn't return error if the user fills in a name that's the right lenght", () => {
    render(<App />);
    const nameInput = screen.getByTestId(/name-input/i);
    userEvent.type(nameInput, "Mary Sue");
    const nameError = screen.queryByTestId(/name-error/i);
    expect(nameError).toBeNull();
  });

  test("returns errors if user hasn't filled in any fields", () => {
    render(<App />);
    const submitButton = screen.getByTestId(/primary-button/i);
    submitButton.click();

    //all validation errors
    const nameError = screen.getByTestId(/name-error/i);
    expect(nameError).toBeInTheDocument();
    const elementError = screen.getByTestId(/element-error/i);
    expect(elementError).toBeInTheDocument();
    const colorError = screen.getByTestId(/color-error/i);
    expect(colorError).toBeInTheDocument();
  });
});
