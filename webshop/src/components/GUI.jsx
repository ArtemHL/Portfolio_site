import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import { useSelector, useDispatch } from 'react-redux';

const GUI = () => {
    const isLogged = useSelector((state) => state.isLogged);
    const dispatch = useDispatch();

    return (
        <header className='GUI'>
            <div className='GUI-left-box'>
                <Link to='/' className='GUI-logo'>TEST LOGO</Link>
                <div className="GUI-InputContainer">
                    <input type="text" name="text" className="GUI-input" id="input" placeholder="Search"/>
                    <div class="border"></div>
                    <label for="input" className="GUI-labelforsearch">
                       <button className="GUI-searchButton">
                       <svg viewBox="0 0 512 512" className="GUI-searchIcon"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                       </button>
                    </label>
                </div>
            </div>
            <div className='GUI-buttons'>
                <Link to = '/'><button className='GUI-link up'>HOME</button></Link>
                <Link to = '/shop'><button className='GUI-link up'>SHOP</button></Link>
                <button className='none'><Dropdown isLogged={isLogged}/></button>
            </div>
        </header>
    );
};

export default GUI;
