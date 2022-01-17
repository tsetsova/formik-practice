import { render, screen } from "@testing-library/react";
import App from "../App";

describe("renders correctly", () => {
  test("renders form correctly", () => {
    render(<App />);
    const heading = screen.getByTestId(/heading/i);
    expect(heading).toBeInTheDocument();

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
