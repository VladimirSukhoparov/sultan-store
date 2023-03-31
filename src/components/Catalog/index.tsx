import React from 'react'
import { NavLink } from 'react-router-dom'

import './index.scss'

export const Catalog = () => {
    return (
        <div className='catalog'>
            <NavLink to='cosmetics' className="catalog__link" >
                <figure>
                    <img src={require('../images/cosmetics.png').default} alt="cosmetics" />
                    <figcaption className='catalog__title'>Косметика и гигиена</figcaption>
                </figure>
            </NavLink>
        </div>
    )
}
