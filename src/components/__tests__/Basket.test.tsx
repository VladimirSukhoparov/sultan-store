import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import { Basket } from "../Basket";

afterEach(() => {
  cleanup();
});

test("should render basket component", () => {
  render(
    <BrowserRouter>
      <Basket basket={[]} setBasket={function (basket: any): void {}} />
    </BrowserRouter>
  );
  const basketElement = screen.getByTestId("basket");
  expect(basketElement).toBeInTheDocument();
  expect(basketElement).toHaveTextContent("Ваша корзина пуста 😔");
});

test("matches snapshot", () => {
  const basket = renderer
    .create(
      <BrowserRouter>
        <Basket basket={[]} setBasket={function (basket: any): void {}} />
      </BrowserRouter>
    )
    .toJSON();
  expect(basket).toMatchSnapshot();
});
