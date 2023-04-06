/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, FC } from "react";
import { NavLink } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import "./index.scss";

type headerProps = {
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
  products: {
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
  data: {
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
  setProducts: (product) => void;
};

export const Header:FC<headerProps> = ({ basket, products, data, setProducts }) => {
  const [searchText, setSearchText] = useState("");
  const { readLS, writeLS } = useLocalStorage();

  const localWrite = () => {
    if (!readLS("data")) {
      writeLS("data", data);
    }
  };

  useEffect(() => {
    searchText.length > 0
      ? setProducts(
          products.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      : setProducts(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__link">
          <div className="header__box">
            <img
              src={require("../images/geo.png").default}
              alt="geo"
              className="header__geo"
            />
            <div>
              <p className="up__adress">г. Кокчетав, ул. Ж. Ташенова 129Б</p>
              <p className="sub__adress">(Рынок Восточный)</p>
            </div>
          </div>
          <div className="header__box">
            <img
              src={require("../images/mail.png").default}
              alt="geo"
              className="header__mail"
            />
            <div>
              <p className="up__adress">opt.sultan@mail.ru</p>
              <p className="sub__adress">На связи в любое время</p>
            </div>
          </div>

          <ul className="header__list">
            <li className="header__item">
              <a>О компании</a>
            </li>
            <li className="header__item">
              <a>Доставка и оплата</a>
            </li>
            <li className="header__item">
              <a>Возврат</a>
            </li>
            <li className="header__item">
              <a>Контакты</a>
            </li>
          </ul>
        </div>

        <hr id="one__line" />
        <div className="header__contact">
          {/* <div className="header__content"> */}
          <NavLink to="/">
            <img
              src={require("../images/logo.png").default}
              alt="logo"
              className="header__logo"
            />
          </NavLink>
          <NavLink
            to="catalog"
            className="header__catalog"
            onClick={localWrite}
          >
            Каталог
            <img src={require("../images/catalog.png").default} alt="catalog" />
          </NavLink>
          <div className="header__search">
            <input
              type="search"
              className="header__input"
              placeholder="Поиск..."
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button className="header__searchBtn">
              <img src={require("../images/search.png").default} alt="search" />
            </button>
          </div>

          {/*  </div>
          <div className="header__content"> */}
          <div className="header__tel">
            <div className="header__call">
              <p className="up__call">+7 (777) 490-00-91</p>
              <p className="sub__call">время работы: 9:00-20:00</p>
              <a>Заказать звонок</a>
            </div>
            <img
              src={require("../images/call.png").default}
              alt="caller"
              className="header__caller"
            />
          </div>
          <a className="header__price">
            Прайс-лист
            <img
              src={require("../images/download.png").default}
              alt="download"
            />
          </a>
          <NavLink to="basket" className="header__basket">
            <img
              src={require("../images/basket.png").default}
              alt="basket"
              className="basket__img"
            />
            <p className="basket__num">{basket.length}</p>
            <div className="basket__box">
              <p className="basket__name">Корзина</p>
              <p className="basket__price">
                {Math.floor(
                  basket.reduce((acc, cur) => acc + parseFloat(cur.price), 0) *
                    100
                ) / 100}{" "}
                ₸
              </p>
            </div>
          </NavLink>
          {/* </div> */}
        </div>
        <hr id="two__line" />
      </div>
    </div>
  );
};
