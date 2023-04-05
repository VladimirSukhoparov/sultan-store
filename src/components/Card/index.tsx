import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FC } from "react";

import { useLocalStorage } from "../../hooks/useLocalStorage";

import "./index.scss";

type cardProps = {
  itemProd: {
    image: string;
    name: string;
    type: string;
    size: string;
    barcode: number;
    manufacturer: string;
    brand: string;
    description: string;
    price: string;
    typeOfCare: string[];
  };
  setBasket: (basket) => void;
};

export const Card: FC<cardProps> = ({ itemProd, setBasket }) => {
  const { writeLS } = useLocalStorage();
  const [product] = useState(itemProd);

  const addBasket = (item) => {
    writeLS("basket", item);
    setBasket((prevState) => [...prevState, item]);
  };

  return (
    <div className="card">
      <img
        src={require(`/src/components${product.image}`).default}
        alt="image"
        className="card__image"
      />
      <div className="card__body">
        <div>
          {product.type === "volume" ? (
            <img
              src={require("../images/vector1.png").default}
              alt=""
              className="card__vector"
            />
          ) : (
            <img
              src={require("../images/vector2.png").default}
              alt=""
              className="card__vector"
            />
          )}
          <span className="card__size">{product.size}</span>
          <NavLink
            to={`${product.barcode}`}
            className="card__brand"
            state={product}
          >
            {product.brand}
            <span className="card__name">{product.name}</span>
          </NavLink>
        </div>
        <div>
          <p className="card__subText">
            <span>Штрихкод:</span>
            <span className="card__upText">{product.barcode}</span>
          </p>
          <p className="card__subText">
            <span>Производитель:</span>
            <span className="card__upText">{product.manufacturer}</span>
          </p>
          <p className="card__subText">
            <span>Брэнд:</span>
            <span className="card__upText">{product.brand}</span>
          </p>
        </div>
        <div className="card__priceBtn">
          <p className="card__price">{product.price}</p>
          <a
            onClick={() => {
              addBasket(product);
            }}
            className="card__btn"
          >
            В корзину
            <img
              src={require("../images/basket2.png").default}
              alt="inBasket"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
