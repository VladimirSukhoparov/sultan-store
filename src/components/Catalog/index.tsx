import React from "react";
import { NavLink } from "react-router-dom";
import cosmetics from "../../images/cosmetics.png";

import "./index.scss";

export const Catalog = () => {
  return (
    <div className="catalog" data-testid="catalog">
      <NavLink to="cosmetics" className="catalog__link">
        <figure data-testid="fugure">
          <img src={cosmetics} alt="cosmetics" />
          <figcaption className="catalog__title">
            Косметика и гигиена
          </figcaption>
        </figure>
      </NavLink>
    </div>
  );
};
