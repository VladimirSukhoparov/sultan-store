import React, { useEffect,useState } from 'react'; 
import { Route, Routes } from "react-router-dom";

import data from './data.json';

import { Header } from './Header';
import { Footer } from './Footer';
import { Breadcrumb } from './Breadcrumb';
import { Home } from './Home';
import { Product } from './Product';
import { Catalog } from './Catalog';
import { Cosmetics } from './Cosmetics';
import { Basket } from './Basket';
import { Admin } from './Admin';

import "./index.scss"

export const App = () => {

  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) || []);
  const [products, setProducts] = useState(data);
  
  const manufacturer = Object.values(data.reduce((arr, e) => {
    let manufacturer = e.manufacturer;
    if(!arr[manufacturer]) arr[manufacturer] = {manufacturer, count: 1}
      else arr[manufacturer].count ++;
    return arr;
  }, {}))


  

  return (
    <div className='app'>
      <Header basket={basket} products={products} data={data} setProducts={setProducts}/>
        <div className='content'>
          <Breadcrumb />
            <Routes className='container'>
              <Route path='/' exact element={<Home/>} />
              <Route path='/catalog'  element={<Catalog />} />
              <Route path='/catalog/cosmetics' element={<Cosmetics data={products} setBasket={setBasket} manufacturer={manufacturer} />} />
              <Route path='/catalog/cosmetics/:itemID' element={<Product setBasket={setBasket} />} />
              <Route path='/basket' element={<Basket basket={basket} setBasket={setBasket}/>}/>
              <Route path='/admin'  element={<Admin />} />
            </Routes>
        </div>
      <Footer/>
    </div>
  )
}
