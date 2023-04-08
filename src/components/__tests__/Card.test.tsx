import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import { Card } from "../Card";

afterEach(() => {
  cleanup();
});

test("should render card component", () => {
  render(
    <BrowserRouter>
      <Card
        itemProd={{
          image: "/images/aos.png",
          name: "Гель для душа",
          type: "volume",
          size: "450 мл",
          barcode: 4604049097540,
          manufacturer: "AOS",
          brand: "AOS",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.",
          price: "38.76 ₸",
          typeOfCare: ["body care", "hand care"],
        }}
        setBasket={function (basket: any): void {}}
      />
    </BrowserRouter>
  );
  const cardElement = screen.getByTestId("card");
  expect(cardElement).toBeInTheDocument();
});

test("matches snapshot", () => {
  const card = renderer
    .create(
      <BrowserRouter>
        <Card
          itemProd={{
            image: "/images/aos.png",
            name: "Гель для душа",
            type: "volume",
            size: "450 мл",
            barcode: 4604049097540,
            manufacturer: "AOS",
            brand: "AOS",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.",
            price: "38.76 ₸",
            typeOfCare: ["body care", "hand care"],
          }}
          setBasket={function (basket: any): void {}}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(card).toMatchSnapshot();
});
