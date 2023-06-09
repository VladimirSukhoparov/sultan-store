import React, { useRef, useState, useEffect, FC } from "react";
import ReactPaginate from "react-paginate";

import { Card } from "../Card";
import close from "../../images/close.png";
import all from "../../images/all.png";
import search from "../../images/search.png";

import "./index.scss";

type cosmeticsProps = {
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
  setBasket: (basket) => void;
  manufacturer: any[];
};
export const Cosmetics: FC<cosmeticsProps> = ({
  data,
  setBasket,
  manufacturer,
}) => {
  const [datas, setDatas] = useState(data);
  const list = useRef(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [itemsPerPage] = useState(15);
  const [manufacturerList, setManufacturerList] = useState(manufacturer);
  const [searchText, setSearchText] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  let [manufacturerFilter, setManufacturerFilters] = useState(new Set());
  const [sortType, setSortType] = useState("name");
  const [typeCare, setTypeCare] = useState("");
  const typeOfBody = useRef(null);
  const typeOfHand = useRef(null);

  useEffect(() => {
    setDatas(data);
  }, [data]);

  const sortOfType = (value) => {
    if (typeCare.length === 0) {
      setTypeCare(value);
      switch (value) {
        case typeOfBody.current.name:
          typeOfBody.current.checked = true;
          break;
        case typeOfHand.current.name:
          typeOfHand.current.checked = true;
          break;
        default:
      }
    } else {
      setTypeCare("");
      switch (value) {
        case typeOfBody.current.name:
          typeOfBody.current.checked = false;
          break;
        case typeOfHand.current.name:
          typeOfHand.current.checked = false;
          break;
        default:
      }
    }
  };

  useEffect(() => {
    typeCare.length > 0
      ? setDatas(data.filter((item) => item.typeOfCare.includes(typeCare)))
      : setDatas(data);
  }, [data, typeCare]);

  function updateFilters(checked, manufacturerFilter) {
    if (checked)
      setManufacturerFilters((prev) => new Set(prev).add(manufacturerFilter));
    if (!checked)
      setManufacturerFilters((prev) => {
        const next = new Set(prev);
        next.delete(manufacturerFilter);
        return next;
      });
  }

  useEffect(() => {
    manufacturerFilter.size === 0
      ? setDatas(data)
      : setDatas(
          datas.filter((item) => manufacturerFilter.has(item.manufacturer))
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manufacturerFilter]);

  /* useEffect(()=>{
    setManufacturerList(manufacturer.filter((item) => item.manufacturer.toLowerCase().includes(searchText.toLowerCase())));
  },[searchText]) */

  useEffect(() => {
    setDatas(
      data.filter(
        (item) =>
          parseFloat(item.price) >= minPrice &&
          parseFloat(item.price) <= maxPrice
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPrice, maxPrice]);

  function filterManufactureList() {
    setManufacturerList(
      manufacturer.filter((item) =>
        item.manufacturer.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = datas.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(datas.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % datas.length;
    setItemOffset(newOffset);
  };

  function showAllFilter() {
    list.current.classList.add("open");
    setShowAll(true);
  }

  function hideAllFilter() {
    list.current.classList.remove("open");
    setShowAll(false);
  }

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        name: "name",
        price: "price",
        nameDown: "nameDown",
        priceDown: "priceDown",
      };

      const sortProperty = types[type];

      const sorted = [...datas].sort((a, b) => {
        if (sortProperty === "name") {
          return a[sortProperty].toUpperCase() > b[sortProperty].toUpperCase()
            ? 1
            : -1;
        } else if (sortProperty === "nameDown") {
          return b["name"].toUpperCase() > a["name"].toUpperCase() ? 1 : -1;
        } else if (sortProperty === "price") {
          return parseFloat(a[sortProperty]) - parseFloat(b[sortProperty]);
        } else if (sortProperty === "priceDown") {
          return parseFloat(b["price"]) - parseFloat(a["price"]);
        } else {
          return null;
        }
      });

      setDatas(sorted);
    };

    sortArray(sortType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  return (
    <div className="cosmetics" data-testid="cosmetics">
      <div className="cosmetics__header">
        <h1 className="cosmetics__title">Косметика и гигиена</h1>
        <div className="cosmetics__sort">
          <p className="cosmetics__sorted">Сортировка:</p>
          <select
            name="sort"
            id="sort"
            defaultValue={"name"}
            onChange={(event) => setSortType(event.target.value)}
          >
            <option value="name">Название (по возрастанию)</option>
            <option value="nameDown">Название (по убыванию)</option>
            <option value="price">По возрастанию цены</option>
            <option value="priceDown">По убыванию цены</option>
          </select>
        </div>
      </div>
      <div className="cosmetics__type">
        <ul className="cosmetics__list">
          <li className="cosmetics__item">
            <button
              onClick={() => {
                sortOfType("body care");
              }}
            >
              Уход
              <br />
              за телом
            </button>
          </li>
          <li className="cosmetics__item">
            <button
              onClick={() => {
                sortOfType("hand care");
              }}
            >
              Уход
              <br />
              за руками
            </button>
          </li>
          <li className="cosmetics__item">
            <button>
              Уход
              <br />
              за ногами
            </button>
          </li>
          <li className="cosmetics__item">
            <button>
              Уход
              <br />
              за лицом
            </button>
          </li>
          <li className="cosmetics__item">
            <button>
              Уход
              <br />
              за волосами
            </button>
          </li>
          <li className="cosmetics__item">
            <button>
              Средства
              <br />
              для загара
            </button>
          </li>
          <li className="cosmetics__item">
            <button>
              Средства
              <br />
              для бритья
            </button>
          </li>
          <li className="cosmetics__item">
            <button>Подарочные наборы</button>
          </li>
          <li className="cosmetics__item">
            <button>Гигиеническая продукция</button>
          </li>
          <li className="cosmetics__item">
            <button>Гигиена полости рта</button>
          </li>
          <li className="cosmetics__item">
            <button>Бумажная продукция</button>
          </li>
        </ul>
      </div>
      <div className="cosmetics__container">
        <div className="cosmetics__bar">
          <h2 className="cosmetics__parameter">ПОДБОР ПО ПАРАМЕТРАМ</h2>
          <span className="cosmetics__price">Цена</span>
          <span className="cosmetics__priceT">₸</span>
          <br />
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            placeholder={`${minPrice}`}
            className="cosmetics__priceInput"
            onChange={(event) =>
              !!event.target.value
                ? setMinPrice(+event.target.value)
                : setMinPrice(0)
            }
          />
          <span className="cosmetics__defis">-</span>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            placeholder={`${maxPrice}`}
            className="cosmetics__priceInput"
            onChange={(event) =>
              !!event.target.value
                ? setMaxPrice(+event.target.value)
                : setMaxPrice(10000)
            }
          />
          <h2 className="cosmetics__parameter">Производитель</h2>
          <div className="cosmetics__checkboxBox">
            <div className="cosmetics__search">
              <input
                type="search"
                className="cosmetics__input"
                placeholder="Поиск..."
                onChange={(event) => setSearchText(event.target.value)}
              />
              <button
                className="cosmetics__searchBtn"
                onClick={filterManufactureList}
              >
                <img src={search} alt="search" />
              </button>
            </div>
            <ul className="cosmetics__listFilter" ref={list}>
              {manufacturerList.map((item) => (
                <li key={item.manufacturer}>
                  <label
                    htmlFor="manufacturer"
                    className="cosmetics__checkboxLabel"
                  >
                    <input
                      type="checkbox"
                      name={item.manufacturer}
                      id="manufacturer"
                      className="cosmetics__checkbox"
                      onChange={(e) =>
                        updateFilters(e.target.checked, item.manufacturer)
                      }
                    />
                    {item.manufacturer}
                  </label>
                  <span className="cosmetics__checkboxCount">
                    ({item.count})
                  </span>
                </li>
              ))}
            </ul>
            {!showAll ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                onClick={() => {
                  showAllFilter();
                }}
                className="cosmetics__showAll"
              >
                Показать все
                <img src={all} alt="all" />
              </a>
            ) : (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                onClick={() => {
                  hideAllFilter();
                }}
                className="cosmetics__showAll"
              >
                Скрыть
                <img src={close} alt="close" />
              </a>
            )}
          </div>
          <hr />
          <ul className="cosmetics__listBar">
            <li>
              <label htmlFor="body" className="cosmetics__checker">
                <input
                  type="checkbox"
                  id="body"
                  data-testid="body-checkbox"
                  name="body care"
                  className="cosmetics__filterTypeCare"
                  onClick={() => {
                    sortOfType("body care");
                  }}
                  ref={typeOfBody}
                />
                Уход за телом
              </label>
            </li>
            <li>
              <label htmlFor="hands" className="cosmetics__checker">
                <input
                  type="checkbox"
                  id="hand"
                  data-testid="hand-checkbox"
                  name="hand care"
                  className="cosmetics__filterTypeCare"
                  onClick={() => {
                    sortOfType("hand care");
                  }}
                  ref={typeOfHand}
                />
                Уход за руками
              </label>
            </li>
            <li>
              <label htmlFor="legs" className="cosmetics__checker">
                <input
                  type="checkbox"
                  id="legs"
                  className="cosmetics__filterTypeCare"
                />
                Уход за ногами
              </label>
            </li>
            <li>
              <label htmlFor="face" className="cosmetics__checker">
                <input
                  type="checkbox"
                  id="face"
                  className="cosmetics__filterTypeCare"
                />
                Уход за лицом
              </label>
            </li>
            <li>
              <label htmlFor="hair" className="cosmetics__checker">
                <input
                  type="checkbox"
                  id="hair"
                  className="cosmetics__filterTypeCare"
                />
                Уход за волосами
              </label>
            </li>
            <li>
              <label htmlFor="tan" className="cosmetics__checker">
                <input
                  type="checkbox"
                  id="tan"
                  className="cosmetics__filterTypeCare"
                />
                Средства для загара
              </label>
            </li>
            <li>
              <label htmlFor="shaving" className="cosmetics__checker">
                <input
                  type="checkbox"
                  id="shaving"
                  className="cosmetics__filterTypeCare"
                />
                Средства для бритья
              </label>
            </li>
            <li>
              <label htmlFor="gift" className="cosmetics__checker">
                <input
                  type="checkbox"
                  id="gift"
                  className="cosmetics__filterTypeCare"
                />
                Подарочные наборы
              </label>
            </li>
            <li>
              <label htmlFor="hygiene" className="cosmetics__checker">
                <input
                  type="checkbox"
                  id="hygiene"
                  className="cosmetics__filterTypeCare"
                />
                Гигиеническая продукция
              </label>
            </li>
            <li>
              <label htmlFor="mouth" className="cosmetics__checker">
                <input
                  type="checkbox"
                  id="mouth"
                  className="cosmetics__filterTypeCare"
                />
                Гигиена полости рта
              </label>
            </li>
            <li>
              <label htmlFor="paper" className="cosmetics__checker">
                <input
                  type="checkbox"
                  id="paper"
                  className="cosmetics__filterTypeCare"
                />
                Бумажная продукция
              </label>
            </li>
            <hr />
          </ul>
        </div>
        <div className="cosmetics__content">
          <div className="cosmetics__listCard">
            {currentItems &&
              currentItems.map((item: any) => (
                <Card
                  key={item.barcode}
                  itemProd={item}
                  setBasket={setBasket}
                />
              ))}
          </div>
        </div>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="cosmetics__pagination"
      />
    </div>
  );
};
