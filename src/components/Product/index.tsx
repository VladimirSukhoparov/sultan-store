import React, { useState, FC } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import close from "../../images/close.png";
import all from "../../images/all.png";
import download from "../../images/download2.png";
import share from "../../images/share.png";
import basket from "../../images/basket2.png";
import vector2 from "../../images/vector2.png";
import vector1 from "../../images/vector1.png";
import leftArrow from "../../images/leftArrow.png";

import "./index.scss";

type productProps = {
  setBasket: (basket) => void;
};

export const Product: FC<productProps> = ({ setBasket }) => {
  const { itemID } = useParams();
  const location = useLocation();
  const { state } = location;
  const { writeLS } = useLocalStorage();
  const [count, setCount] = useState(1);
  const [showProperty, setShowProperty] = useState(true);
  const [showDescription, setShowDescription] = useState(true);

  const addBasket = (item) => {
    for (let i = 1; i <= count; i++) {
      writeLS("basket", item);
      setBasket((prevState) => [...prevState, item]);
    }
  };

  function showAllProperty() {
    showProperty ? setShowProperty(false) : setShowProperty(true);
  }

  function showAllDescription() {
    showDescription ? setShowDescription(false) : setShowDescription(true);
  }

  return (
    <div className="product" data-testid="product">
      <NavLink to="/catalog/cosmetics" className="product__back">
        <img src={leftArrow} alt="catalog" />
        Назад
      </NavLink>
      <div className="product__container">
        <div className="product__image">
          <img
            src={
              //`../../images${state.image}`
                require(`/src/images/${state.image}`)
            }
            alt="image"
            className="card__img"
          />
        </div>
        <div className="product__description">
          <span className="product__available">В наличии</span>
          <p className="product__price">
            {state.brand}
            <span className="product__name">{state.name}</span>
          </p>
          {state.type === "volume" ? (
            <span className="product__size">
              <img src={vector1} alt="" className="product__vector" />
              {state.size}
            </span>
          ) : (
            <span className="product__size">
              <img src={vector2} alt="" className="product__vector" />
              {state.size}
            </span>
          )}
          <div className="product__box1">
            <p className="product__price">{state.price}</p>
            <a
              onClick={() => {
                count > 1 && setCount(count - 1);
              }}
              className="product__count"
            >
              -
            </a>
            <span className="product__counter">{count}</span>
            <a
              onClick={() => {
                count < 100 && setCount(count + 1);
              }}
              className="product__count"
            >
              +
            </a>
            <a
              className="product__inBasket"
              onClick={() => {
                addBasket(state);
              }}
            >
              В корзину
              <img src={basket} alt="inBasket" />
            </a>
          </div>

          <div className="product__box2">
            <a className="product__share">
              <img src={share} alt="share" />
            </a>
            <p className="product__text">
              При покупке от&nbsp;<span>10 000 ₸</span>&nbsp;бесплатная
              <br />
              доставка по Кокчетаву и области
            </p>
            <a className="product__priceList" download>
              Прайс-лист
              <img src={download} alt="download" />
            </a>
          </div>
          <div>
            <p className="product__subText">
              Производитель:
              <span className="product__upText">{state.manufacturer}</span>
            </p>
            <p className="product__subText">
              Брэнд:<span className="product__upText">{state.brand}</span>
            </p>
            <p className="product__subText">
              Артикул:
              <span className="product__upText">
                {+state.barcode.toString().slice(0, 6)}
              </span>
            </p>
            <p className="product__subText">
              Штрихкод:<span className="product__upText">{state.barcode}</span>
            </p>
          </div>
          <div>
            <a
              onClick={() => {
                showAllDescription();
              }}
              className="product__btn"
            >
              Описание
              <img src={showDescription ? close : all} alt="all" />
            </a>
            {showDescription && (
              <p className="product__descriptionText">{state.description}</p>
            )}
          </div>
          <div>
            <a
              onClick={() => {
                showAllProperty();
              }}
              className="product__btn"
            >
              Характеристики
              <img src={showProperty ? close : all} alt="all" />
            </a>
            {showProperty && (
              <div>
                <p className="product__subText">
                  Назначение:
                  <span className="product__upText">{state.manufacturer}</span>
                </p>
                <p className="product__subText">
                  Тип:<span className="product__upText">{state.brand}</span>
                </p>
                <p className="product__subText">
                  Производитель:
                  <span className="product__upText">{state.manufacturer}</span>
                </p>
                <p className="product__subText">
                  Брэнд:<span className="product__upText">{state.brand}</span>
                </p>
                <p className="product__subText">
                  Артикул:
                  <span className="product__upText">
                    {+state.barcode.toString().slice(0, 6)}
                  </span>
                </p>
                <p className="product__subText">
                  Штрихкод:
                  <span className="product__upText">{state.barcode}</span>
                </p>
                <p className="product__subText">
                  Вес:<span className="product__upText">{state.size}</span>
                </p>
                <p className="product__subText">
                  Объем:<span className="product__upText">{state.size}</span>
                </p>
                <p className="product__subText">
                  Кол-во в коробке:
                  <span className="product__upText">{state.size}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
