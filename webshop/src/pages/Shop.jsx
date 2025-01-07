import React from 'react'
import GUI from '../components/GUI'
import Leftbox from '../components/Leftbox'
import Item from './../components/Item';
import '../css/Catalog.css';

const Shop = () => {
  return (
    <div>
        <GUI/>
        <div className='main-container'>
          <div className="leftbox-outline">
          <Leftbox/>
          </div>
          <div className='catalog-outline'>
          <div className="catalog">
              <Item/>
              <Item/>
              <Item/>
              <Item/>
              <Item/>
              <Item/>
              <Item/>
              <Item/>
              <Item/>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Shop