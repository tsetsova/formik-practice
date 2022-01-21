/* eslint-disable testing-library/no-unnecessary-act */

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

    const elementinput = screen.getByTestId(/element-input/i);
    expect(elementinput).toBeInTheDocument();
    const elementError = screen.queryByTestId(/element-error/i);
    expect(elementError).toBeNull();

    const colorinput = screen.getByTestId(/color-input/i);
    expect(colorinput).toBeInTheDocument();
    const colorError = screen.queryByTestId(/color-error/i);
    expect(colorError).toBeNull();

    const submitButton = screen.getByTestId(/primary-button/i);
    expect(submitButton).toBeInTheDocument();
  });
});
