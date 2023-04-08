import React from "react";
import "./index.scss";

import logo2 from "../../images/logo2.png";
import arrow from "../../images/arrow.png";
import download from "../../images/download.png";
import whatsapp from "../../images/whatsapp.png";
import telegram from "../../images/telegram.png";
import visa from "../../images/visa.png";
import master from "../../images/master.png";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__mail">
          <img src={logo2} alt="logo2" className="footer__logo" />
          <p className="footer__text">
            Компания «Султан» — снабжаем розничные магазины товарами
            <br />
            "под ключ" в Кокчетаве и Акмолинской области
          </p>
          <p className="footer__signature">Подпишись на скидки и акции</p>
          <div className="footer__subscribe">
            <input
              type="email"
              className="footer__input"
              placeholder="Введите ваш E-mail"
              required
            />
            <a className="footer__subscribeBtn">
              <img src={arrow} alt="arrowButton" />
            </a>
          </div>
        </div>
        <div className="footer__menu">
          <h2 className="footer__title">Меню сайта:</h2>
          <ul className="footer__list">
            <li>
              <a className="footer__item">О компании</a>
            </li>
            <li>
              <a className="footer__item">Доставка и оплата</a>
            </li>
            <li>
              <a className="footer__item">Возврат</a>
            </li>
            <li>
              <a className="footer__item">Контакты</a>
            </li>
          </ul>
        </div>
        <div className="footer__category">
          <h2 className="footer__title">Категории:</h2>
          <ul className="footer__list">
            <li>
              <a className="footer__item">Бытовая химия</a>
            </li>
            <li>
              <a className="footer__item">Косметика и гигиена</a>
            </li>
            <li>
              <a className="footer__item">Товары для дома</a>
            </li>
            <li>
              <a className="footer__item">Товары для детей и мам</a>
            </li>
            <li>
              <a className="footer__item">Посуда</a>
            </li>
          </ul>
        </div>
        <div className="footer__price">
          <h2 className="footer__title">Скачать прайс-лист:</h2>
          <a className="footer__download">
            Прайс-лист
            <img src={download} alt="download" />
          </a>
          <p className="footer__social">Связь в мессенджерах:</p>
          <a>
            <img src={whatsapp} alt="whatsapp" className="footer__whatsapp" />
          </a>
          <a>
            <img src={telegram} alt="telegram" className="footer__telegram" />
          </a>
        </div>
        <div className="footer__contacts">
          <h2 className="footer__title">Контакты:</h2>
          <div className="footer__call">
            <p className="up__call">+7 (777) 490-00-91</p>
            <p className="sub__call">время работы: 9:00-20:00</p>
            <a>Заказать звонок</a>
          </div>
          <div className="footer__box">
            <p className="up__adress">opt.sultan@mail.ru</p>
            <p className="sub__adress">На связи в любое время</p>
          </div>
          <img src={visa} alt="visa" className="footer__visa" />
          <img src={master} alt="master" className="footer__master" />
        </div>
      </div>
    </div>
  );
};
