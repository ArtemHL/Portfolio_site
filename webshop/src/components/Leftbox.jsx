import React from 'react';


const Leftbox = () => {
    return (
        <div className="leftbox">
            <h2>Filters</h2>
            <div className="filter-section">
                <h3>Categories</h3>
                <ul>
                    <li><input type="checkbox" /> Electronics</li>
                    <li><input type="checkbox" /> Clothing</li>
                    <li><input type="checkbox" /> Home & Kitchen</li>
                    <li><input type="checkbox" /> Books</li>
                </ul>
            </div>
            <div className="filter-section">
                <h3>Price Range</h3>
                <input type="range" min="0" max="1000" />
            </div>
            <div className="filter-section">
                <h3>Brand</h3>
                <ul>
                    <li><input type="checkbox" /> Brand A</li>
                    <li><input type="checkbox" /> Brand B</li>
                    <li><input type="checkbox" /> Brand C</li>
                </ul>
            </div>
        </div>
    );
};

export default Leftbox;