import React from 'react';
import claases from './Logo.module.css';
import burgerlogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <div className={claases.Logo}>
        <img src={burgerlogo} alt="My Burger"/>
    </div>
);

export default logo;