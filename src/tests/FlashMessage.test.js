import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import FlashMessage from "../components/FlashMessage";

describe("renders correctly", () => {
  test("renders flash message correctly and then hides it", () => {
    jest.useFakeTimers();
    render(<FlashMessage duration="3000" />);
    const flashMessage = screen.getByTestId(/flash-message/i);
    expect(flashMessage).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(3000));
  });

  test("hides flash message after duration is done", () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    render(<FlashMessage duration="3000" />);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    act(() => jest.advanceTimersByTime(3000));
    const flashMessage = screen.queryByTestId(/flash-message/i);
    expect(flashMessage).toBeNull();
  });

  test("shows info flash message for info severity", () => {
    render(<FlashMessage duration="3000" severity="info" />);
    const flashMessage = screen.getByTestId(/flash-message/i);
    expect(flashMessage).toHaveClass("flash-info");
  });

  test("shows error flash message for error severity", () => {
    render(<FlashMessage duration="3000" severity="error" />);
    const flashMessage = screen.getByTestId(/flash-message/i);
    expect(flashMessage).toHaveClass("flash-error");
  });
});
