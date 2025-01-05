import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import { useSelector, useDispatch } from 'react-redux';

const GUI = () => {
    const isLogged = useSelector((state) => state.isLogged);
    const dispatch = useDispatch();

    return (
        <header className='GUI'>
            <Link to='/' className='GUI-logo'>TEST LOGO</Link>
            <div className='GUI-buttons'>
                <button className='GUI-link'>HOME</button>
                <button className='GUI-link'>SHOP</button>
                <button className='none'><Dropdown isLogged={isLogged}/></button>
            </div>
        </header>
    );
};

export default GUI;
