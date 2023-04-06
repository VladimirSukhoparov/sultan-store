import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import data from "./data.json";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Breadcrumb } from "./components/Breadcrumb";
import { Home } from "./components/Home";
import { Product } from "./components/Product";
import { Catalog } from "./components/Catalog";
import { Cosmetics } from "./components/Cosmetics";
import { Basket } from "./components/Basket";
import { Admin } from "./components/Admin";

import "./App.scss";

export const App = () => {
  const [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem("basket")) || []
  );
  const [products, setProducts] = useState(data);

  const manufacturer = Object.values(
    data.reduce((arr, e) => {
      let manufacturer = e.manufacturer;
      if (!arr[manufacturer]) arr[manufacturer] = { manufacturer, count: 1 };
      else arr[manufacturer].count++;
      return arr;
    }, {})
  );

  return (
    <div className="app">
      <Header
        basket={basket}
        products={products}
        data={data}
        setProducts={setProducts}
      />
      <div className="content">
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route
            path="catalog/cosmetics"
            element={
              <Cosmetics
                data={products}
                setBasket={setBasket}
                manufacturer={manufacturer}
              />
            }
          />
          <Route
            path="catalog/cosmetics/:itemID"
            element={<Product setBasket={setBasket} />}
          />
          <Route
            path="basket"
            element={<Basket basket={basket} setBasket={setBasket} />}
          />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
