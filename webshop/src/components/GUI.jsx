import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

const GUI = () => {
    return (
        <header className='GUI'>
            <Link to='/' className='GUI-logo'>TEST LOGO</Link>
            <div className='GUI-buttons'>
                <button className='GUI-link'>HOME</button>
                <button className='GUI-link'>SHOP</button>
                <button className='none'><Dropdown/></button>
            </div>
        </header>
    );
};

export default GUI;
