import React, { useState, FC } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import "./index.scss";

type basketItemProps = {
  item: {
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
  basket: {
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
  }[];
  setBasket: (basket) => void;
};

export const BasketItem: FC<basketItemProps> = ({
  item,
  basket,
  setBasket,
}) => {
  const { writeLS, removeLS, removeOne } = useLocalStorage();
  const [count, setCount] = useState(countFilter());

  function removeItem(arg) {
    removeLS("basket", arg.barcode);
    setBasket((prevState) =>
      prevState.filter((item) => arg.barcode !== item.barcode)
    );
  }

  function addItem(arg) {
    writeLS("basket", arg);
    setBasket((prevState) => [...prevState, arg]);
  }

  function countFilter() {
    let count = 0;
    basket.filter((el) => {
      el.barcode === item.barcode && count++;
    });
    return count;
  }

  function deleteOne() {
    removeOne("basket", item.barcode);
    setBasket(JSON.parse(localStorage.getItem("basket")) || []);
  }

  return (
    <div className="basketItem">
      <div className="basketItem__item">
        <div className="basketItem__image">
          <img
            src={require(`/src/components${item.image}`).default}
            alt="image"
          />
        </div>
        <div className="basketItem__description">
          {item.type === "volume" ? (
            <img
              src={require("../images/vector1.png").default}
              alt=""
              className="basketItem__vector"
            />
          ) : (
            <img
              src={require("../images/vector2.png").default}
              alt=""
              className="basketItem__vector"
            />
          )}
          <span className="basketItem__size">{item.size}</span>
          <p className="basketItem__name">
            {item.brand}&nbsp;{item.name}
          </p>
          <p className="basketItem__text">{item.description}</p>
        </div>
        <div className="basketItem__price">
          <hr className="basketItem__hr" />
          <a
            onClick={() => {
              if (count > 1) {
                setCount(count - 1);
                deleteOne();
              }
            }}
            className="basketItem__count"
          >
            -
          </a>
          <span className="basketItem__counter">{count}</span>
          <a
            onClick={() => {
              if (count < 100) {
                setCount(count + 1);
                addItem(item);
              }
            }}
            className="basketItem__count"
          >
            +
          </a>
          <hr className="basketItem__hr" />
          <p className="basketItem__priceNumber">
            {Math.floor(parseFloat(item.price) * count * 100) / 100} ₸
          </p>
          <hr className="basketItem__hr" />
          <a
            className="basketItem__remove"
            onClick={() => {
              removeItem(item);
            }}
          >
            <img
              src={require("../images/remove.png").default}
              alt="inbasketItem"
            />
          </a>
        </div>
      </div>
      <hr className="basketItem__line" />
    </div>
  );
};
