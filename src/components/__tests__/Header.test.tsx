import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { Header } from "../Header";

afterEach(() => {
  cleanup();
});

test("should render header component", () => {
  render(
    <BrowserRouter>
      <Header
        basket={[]}
        products={[]}
        data={[]}
        setProducts={function (product: any): void {}}
      />
    </BrowserRouter>
  );
  const headerElement = screen.getByTestId("header");
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toHaveTextContent("Корзина");
});

test("matches snapshot", () => {
  const header = renderer
    .create(
      <BrowserRouter>
        <Header
          basket={[]}
          products={[]}
          data={[]}
          setProducts={function (product: any): void {}}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(header).toMatchSnapshot();
});
