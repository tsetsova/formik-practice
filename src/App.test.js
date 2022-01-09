import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders form correctly", () => {
  render(<App />);
  const nameInput = screen.getByTestId(/name-input/i);
  expect(nameInput).toBeInTheDocument();

  const elementSelector = screen.getByTestId(/element-selector/i);
  expect(elementSelector).toBeInTheDocument();

  const colorSelector = screen.getByTestId(/color-selector/i);
  expect(colorSelector).toBeInTheDocument();

  const submitButton = screen.getByTestId(/primary-button/i);
  expect(submitButton).toBeInTheDocument();
});
