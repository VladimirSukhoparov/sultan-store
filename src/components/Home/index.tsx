import React from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'


export const Home = () => {
  return (
    <div className='home'>
      <h1 className='home__title'>
        Упс! Что-то пошло не так...)))
        </h1>
        <NavLink to='/admin' className='home__admin' >Администрирование</NavLink>  
    </div>
  )
}
