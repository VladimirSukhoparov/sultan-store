import React from "react";
import { screen, render, cleanup, getByTestId } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Cosmetics } from "../Cosmetics";

afterEach(() => {
  cleanup();
});

test("should render cosmetics component", () => {
  render(
    <BrowserRouter>
      <Cosmetics
        data={[]}
        setBasket={function (basket: any): void {}}
        manufacturer={[]}
      />
    </BrowserRouter>
  );
  const cosmeticsElement = screen.getByTestId("cosmetics");
  expect(cosmeticsElement).toBeInTheDocument();
  const bodyCheckbox = screen.getByTestId("body-checkbox");
  expect(bodyCheckbox).not.toBeChecked();
});

test("should to checked input type checkbox", () => {
  render(
    <BrowserRouter>
      <Cosmetics
        data={[]}
        setBasket={function (basket: any): void {}}
        manufacturer={[]}
      />
    </BrowserRouter>
  );
  const bodyCheckbox = screen.getByTestId("body-checkbox");
  expect(bodyCheckbox).not.toBeChecked();
  const handCheckbox = screen.getByTestId("hand-checkbox");
  expect(handCheckbox).not.toBeChecked();
  expect(handCheckbox).toHaveAttribute("type");
});

test("should inpun to have attribute type", () => {
  render(
    <BrowserRouter>
      <Cosmetics
        data={[]}
        setBasket={function (basket: any): void {}}
        manufacturer={[]}
      />
    </BrowserRouter>
  );

  const handCheckbox = screen.getByTestId("hand-checkbox");
  expect(handCheckbox).toHaveAttribute("type");
});
