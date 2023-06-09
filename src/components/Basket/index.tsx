import React, { useRef, FC } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { BasketItem } from "../BasketItem";

import "./index.scss";

type basketProps = {
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
export const Basket: FC<basketProps> = ({ basket, setBasket }) => {
  const { removeAll } = useLocalStorage();
  const thanks = useRef(null);
  const basketNull = useRef(null);

  let set = new Set();

  let res = basket.reduce((a, c) => {
    let str = JSON.stringify(c);
    if (!set.has(str)) {
      set.add(str);
      return a.concat(c);
    }
    return a;
  }, []);

  function deleteAll() {
    removeAll("basket");
    setBasket(JSON.parse(localStorage.getItem("basket")) || []);
    setTimeout(() => {
      basketNull.current.style.display = "none";
    });
    setTimeout(() => {
      thanks.current.style.display = "block";
      setTimeout(() => {
        thanks.current.style.display = "none";
        setTimeout(() => {
          basketNull.current.style.display = "block";
        });
      }, 2000);
    });
  }

  return (
    <div className="basket" id="basket" data-testid="basket">
      <h1 className="basket__title">Корзина</h1>
      <hr className="basket__line" />
      <div className="basket__container">
        {basket.length > 0 ? (
          <>
            {res.map((item) => (
              <BasketItem
                key={item.barcode}
                item={item}
                basket={basket}
                setBasket={setBasket}
              />
            ))}
            <div className="basket__purchase">
              <button
                className="basket__buy"
                id="btnBuy"
                onClick={() => {
                  deleteAll();
                }}
              >
                Оформить заказ
              </button>
              <span className="basket__fullPrice">
                {Math.floor(
                  basket.reduce((acc, cur) => acc + parseFloat(cur.price), 0) *
                    100
                ) / 100}{" "}
                ₸
              </span>
            </div>
          </>
        ) : (
          <h2 className="basket__title2" ref={basketNull} id="basketNull">
            Ваша корзина пуста 😔
          </h2>
        )}
        <h2 className="basket__title2" ref={thanks} id="thanks">
          Спасибо за заказ 😊
        </h2>
      </div>
    </div>
  );
};
