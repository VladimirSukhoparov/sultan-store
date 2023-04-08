import { BrowserRouter } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { App } from "../../App";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("should render app", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const textElement = screen.getByText(/Упс! Что-то пошло не так.../i);
  expect(textElement).toBeInTheDocument();
});

test("matches snapshot", () => {
  const app = renderer
    .create(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    .toJSON();
  expect(app).toMatchSnapshot();
});
