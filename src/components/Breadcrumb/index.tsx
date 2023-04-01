import React from 'react'
import { NavLink } from 'react-router-dom';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs'

import './index.scss'


const routes = [
  { path: "/", breadcrumb: "Главная" },
  { path: "catalog", breadcrumb: "Каталог" },
  { path: "catalog/cosmetics", breadcrumb: "Косметика и гигиена" },
  { path: "basket", breadcrumb: "Корзина" },
  { path: "admin", breadcrumb: "Администрирование" },

];



export const Breadcrumb = () => {
  const breadcrumbs = useReactRouterBreadcrumbs(routes);

  return (
    <div className='breadcrumb'>
      {breadcrumbs.length > 1 && (
        breadcrumbs.map(({ breadcrumb, match }) =>

          <NavLink to={match.pathname} key={match.pathname} className='breadcrumb__link'>
            {breadcrumb}
          </NavLink>
        ))}

    </div>
  )
}
