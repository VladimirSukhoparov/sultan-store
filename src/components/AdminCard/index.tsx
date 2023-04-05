import React, { FC } from "react";

import "./index.scss";

type adminCardProps = {
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
  setIsOpen:(modalIsOpen)=>void;
  setItem:(itemProd)=>void
};
export const AdminCard:FC<adminCardProps> = ({ itemProd, setIsOpen, setItem }) => {
  const openEdit = () => {
    setIsOpen(true);
    setItem(itemProd);
  };
  return (
    <div className="adminCard">
      <img
        src={require(`/src/components${itemProd.image}`).default}
        alt="image"
        className="adminCard__image"
      />
      <div className="adminCard__body">
        <p className="adminCard__subText">
          <span>Название:</span>
        </p>
        <span className="adminCard__upText">{itemProd.name}</span>
        <p className="adminCard__subText">
          <span>Тип размера:</span>
        </p>
        <span className="adminCard__upText">{itemProd.type}</span>
        <p className="adminCard__subText">
          <span>Размер:</span>
        </p>
        <span className="adminCard__upText">{itemProd.size}</span>
        <p className="adminCard__subText">
          <span>Штрихкод:</span>
        </p>
        <span className="adminCard__upText">{itemProd.barcode}</span>
        <p className="adminCard__subText">
          <span>Производитель:</span>
        </p>
        <span className="adminCard__upText">{itemProd.manufacturer}</span>
        <p className="adminCard__subText">
          <span>Брэнд:</span>
        </p>
        <span className="adminCard__upText">{itemProd.brand}</span>
        <p className="adminCard__subText">
          <span>Описание:</span>
        </p>
        <span className="adminCard__upText">{itemProd.description}</span>
        <p className="adminCard__subText">
          <span>Цена:</span>
        </p>
        <span className="adminCard__upText">{itemProd.price}</span>
        <p className="adminCard__subText">
          <span>Тип ухода:</span>
        </p>
        <span className="adminCard__upText">
          {itemProd.typeOfCare.join(", ")}
        </span>
      </div>
      <a className="adminCard__btn" onClick={openEdit}>
        Редактировать
      </a>
    </div>
  );
};
