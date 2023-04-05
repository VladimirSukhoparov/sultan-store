import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { AdminCard } from "../AdminCard";
import Modal from "react-modal";

import "./index.scss";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "10%",
    left: "10%",
    right: "10%",
    bottom: "10%",
  },
};

export const Admin = () => {
  const { writeLS, removeAll, clearLS } = useLocalStorage();
  const [[data]] = useState(JSON.parse(localStorage.getItem("data")) || []);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [datas, setDatas] = useState(data);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setItem((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  function dataUpdate() {
    const arr = datas.filter((elem) => {
      if (elem.barcode === item.barcode) {
        JSON.stringify(elem) === JSON.stringify(item);
      } else {
        return true;
      }
    });
    arr.push(item);
    setDatas(arr);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    dataUpdate();
    closeModal();
  };

  const updateLocalStorage = () => {
    removeAll("data");
    writeLS("data", datas);
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setItem(null);
  }, [datas]);

  return (
    <div className="admin">
      <div className="admin__box">
        <a className="admin__btn blue" onClick={updateLocalStorage}>
          Сохранить изменения
        </a>
        <a
          className="admin__btn green"
          onClick={() => {
            setDatas(data);
          }}
        >
          Отменить изменения
        </a>
        <a
          className="admin__btn red"
          onClick={() => {
            clearLS();
            setDatas([]);
          }}
        >
          Удалить все
        </a>
      </div>
      {(datas || data) && (
        <div className="admin__container">
          {data
            .sort((a, b) =>
              a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
            )
            .map((itemProd, i) => (
              <AdminCard
                key={i}
                itemProd={item?.barcode === itemProd.barcode ? item : itemProd}
                setIsOpen={setIsOpen}
                setItem={setItem}
              />
            ))}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {item && (
              <form
                name="formSubmit"
                className="admin__form"
                onSubmit={handleSubmit}
              >
                <p className="admin__subText">
                  <span>Изображение:</span>
                </p>
                <textarea
                  required
                  className="admin__upText textarea"
                  defaultValue={item.image.toString()}
                  name="image"
                  onChange={handleInputChange}
                />

                <p className="admin__subText">
                  <span>Название:</span>
                </p>
                <textarea
                  required
                  className="admin__upText textarea"
                  defaultValue={item.name}
                  name="name"
                  onChange={handleInputChange}
                />

                <p className="admin__subText">
                  <span>Тип размера:</span>
                </p>
                <textarea
                  required
                  className="admin__upText textarea"
                  defaultValue={item.type}
                  name="type"
                  onChange={handleInputChange}
                />

                <p className="admin__subText">
                  <span>Размер:</span>
                </p>
                <textarea
                  required
                  className="admin__upText textarea"
                  defaultValue={item.size}
                  name="size"
                  onChange={handleInputChange}
                />

                <p className="admin__subText">
                  <span>Штрихкод:</span>
                </p>
                <textarea
                  required
                  className="admin__upText textarea"
                  defaultValue={item.barcode}
                  name="barcode"
                  onChange={handleInputChange}
                />

                <p className="admin__subText">
                  <span>Производитель:</span>
                </p>
                <textarea
                  required
                  className="admin__upText textarea"
                  defaultValue={item.manufacturer}
                  name="manufacturer"
                  onChange={handleInputChange}
                />

                <p className="admin__subText">
                  <span>Брэнд:</span>
                </p>
                <textarea
                  required
                  className="admin__upText textarea"
                  defaultValue={item.brand}
                  name="brand"
                  onChange={handleInputChange}
                />

                <p className="admin__subText">
                  <span>Описание:</span>
                </p>
                <textarea
                  required
                  className="admin__upText description"
                  defaultValue={item.description}
                  name="description"
                  onChange={handleInputChange}
                />

                <p className="admin__subText">
                  <span>Цена:</span>
                </p>
                <textarea
                  required
                  className="admin__upText textarea"
                  defaultValue={item.price}
                  name="price"
                  onChange={handleInputChange}
                />

                <p className="admin__subText">
                  <span>Тип ухода:</span>
                </p>
                <div>
                  {item.typeOfCare.map((item, i) => (
                    <textarea
                      key={i}
                      required
                      className="admin__upText textarea"
                      defaultValue={item}
                      name="typeOfCare"
                      onChange={handleInputChange}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="admin__btn red"
                >
                  Отмена
                </button>
                <button type="submit" className="admin__btn blue">
                  Сохранить
                </button>
              </form>
            )}
          </Modal>
        </div>
      )}
    </div>
  );
};
