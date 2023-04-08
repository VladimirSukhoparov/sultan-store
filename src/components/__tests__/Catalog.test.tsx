import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import { Catalog } from "../Catalog";

afterEach(() => {
  cleanup();
});

test("should render catalog component", () => {
  render(
    <BrowserRouter>
      <Catalog />
    </BrowserRouter>
  );
  const catalogElement = screen.getByTestId("catalog");
  expect(catalogElement).toBeInTheDocument();
  const fugureElement = screen.getByTestId("fugure");
  expect(fugureElement).toContainHTML(
    "<img src='cosmetics.png' alt='cosmetics'/><figcaption class='catalog__title'>Косметика и гигиена</figcaption>"
  );
});

test("matches snapshot", () => {
  const catalog = renderer
    .create(
      <BrowserRouter>
        <Catalog />
      </BrowserRouter>
    )
    .toJSON();
  expect(catalog).toMatchSnapshot();
});
